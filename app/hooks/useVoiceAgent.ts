"use client";
import { useState, useCallback, useRef } from "react";

export interface VoiceAgentState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  error: string | null;
  retryCount: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 600;
const SILENCE_TIMEOUT_MS = 8000; // if no result after 8s, retry

export function useVoiceAgent() {
  const [state, setState] = useState<VoiceAgentState>({
    isListening: false,
    isSpeaking: false,
    transcript: "",
    error: null,
    retryCount: 0,
  });

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);
  const onTranscriptRef = useRef<((t: string) => void) | undefined>(undefined);
  const lastPromptTextRef = useRef<string>("");

  // ── Clear silence watchdog ──────────────────────────────────────────────
  function clearSilenceTimer() {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }

  // ── Core: start listening (internal, with retry support) ────────────────
  const startListeningInternal = useCallback(
    (onTranscript?: (t: string) => void, isRetry = false) => {
      if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
      ) {
        setState((prev) => ({
          ...prev,
          error: "Speech recognition not supported in this browser.",
        }));
        return;
      }

      if (!isRetry) {
        retryCountRef.current = 0;
        onTranscriptRef.current = onTranscript;
      }

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.maxAlternatives = 1;

      recognitionRef.current = recognition;
      let gotResult = false;

      recognition.onstart = () => {
        setState((prev) => ({
          ...prev,
          isListening: true,
          error: null,
          retryCount: retryCountRef.current,
        }));

        // Start silence watchdog — if nothing heard in SILENCE_TIMEOUT_MS, retry
        clearSilenceTimer();
        silenceTimerRef.current = setTimeout(() => {
          if (!gotResult) {
            recognition.stop();
            // Will trigger onend which handles retry
          }
        }, SILENCE_TIMEOUT_MS);
      };

      recognition.onresult = (event: any) => {
        gotResult = true;
        clearSilenceTimer();
        const transcript = event.results[0][0].transcript.trim();
        retryCountRef.current = 0;
        setState((prev) => ({
          ...prev,
          transcript,
          isListening: false,
          retryCount: 0,
          error: null,
        }));
        onTranscriptRef.current?.(transcript);
      };

      recognition.onerror = (event: any) => {
        clearSilenceTimer();
        // "no-speech" and "network" errors are retryable
        const retryable = ["no-speech", "network", "audio-capture"].includes(
          event.error
        );
        if (retryable && retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1;
          setState((prev) => ({
            ...prev,
            isListening: false,
            error: `No speech detected — retrying (${retryCountRef.current}/${MAX_RETRIES})…`,
            retryCount: retryCountRef.current,
          }));
          setTimeout(
            () => startListeningInternal(onTranscriptRef.current, true),
            RETRY_DELAY_MS
          );
        } else {
          setState((prev) => ({
            ...prev,
            isListening: false,
            error:
              retryCountRef.current >= MAX_RETRIES
                ? `Could not hear you after ${MAX_RETRIES} attempts. Please type your answer or tap the mic to try again.`
                : `Speech error: ${event.error}`,
          }));
        }
      };

      recognition.onend = () => {
        clearSilenceTimer();
        setState((prev) => ({ ...prev, isListening: false }));

        // If ended without a result and no error triggered, treat as silence → retry
        if (!gotResult) {
          if (retryCountRef.current < MAX_RETRIES) {
            retryCountRef.current += 1;
            setState((prev) => ({
              ...prev,
              error: `Nothing heard — retrying (${retryCountRef.current}/${MAX_RETRIES})…`,
              retryCount: retryCountRef.current,
            }));
            setTimeout(
              () => startListeningInternal(onTranscriptRef.current, true),
              RETRY_DELAY_MS
            );
          } else {
            setState((prev) => ({
              ...prev,
              error: `Could not hear you after ${MAX_RETRIES} attempts. Please type your answer or tap the mic to try again.`,
            }));
          }
        }
      };

      try {
        recognition.start();
      } catch (e) {
        // Already started — abort and retry
        setTimeout(
          () => startListeningInternal(onTranscriptRef.current, true),
          400
        );
      }
    },
    []
  );

  // ── Public: manual trigger (resets retry counter, re-uses last callback) ─
  const startListening = useCallback(
    (onTranscript?: (t: string) => void) => {
      retryCountRef.current = 0;
      if (onTranscript) onTranscriptRef.current = onTranscript;
      startListeningInternal(onTranscriptRef.current, false);
    },
    [startListeningInternal]
  );

  // ── speak() — TTS then auto-listen ────────────────────────────────────
  const speak = useCallback(
    async (text: string, onTranscript?: (t: string) => void) => {
      lastPromptTextRef.current = text;
      if (onTranscript) onTranscriptRef.current = onTranscript;

      setState((prev) => ({ ...prev, isSpeaking: true, error: null }));

      try {
        const res = await fetch("/api/voice-agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!res.ok) throw new Error("Failed to synthesize speech");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          setState((prev) => ({ ...prev, isSpeaking: false }));
          URL.revokeObjectURL(url);
          if (onTranscriptRef.current !== undefined) {
            retryCountRef.current = 0;
            setTimeout(
              () => startListeningInternal(onTranscriptRef.current, false),
              300
            );
          }
        };

        await audio.play();
      } catch (err: any) {
        console.error("Speech synthesis error:", err);
        setState((prev) => ({
          ...prev,
          isSpeaking: false,
          error: err.message || "Failed to speak",
        }));
        // Even if TTS fails, still try to listen
        if (onTranscriptRef.current) {
          setTimeout(
            () => startListeningInternal(onTranscriptRef.current, false),
            500
          );
        }
      }
    },
    [startListeningInternal]
  );

  const stopListening = useCallback(() => {
    clearSilenceTimer();
    retryCountRef.current = MAX_RETRIES; // prevent auto-retry after manual stop
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setState((prev) => ({ ...prev, isListening: false, error: null }));
  }, []);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setState((prev) => ({ ...prev, isSpeaking: false }));
    }
  }, []);

  const reset = useCallback(() => {
    clearSilenceTimer();
    retryCountRef.current = 0;
    onTranscriptRef.current = undefined;
    stopListening();
    stopSpeaking();
    setState({
      isListening: false,
      isSpeaking: false,
      transcript: "",
      error: null,
      retryCount: 0,
    });
  }, [stopListening, stopSpeaking]);

  // ── Manual retry: re-speak prompt then listen again ───────────────────
  const retryListening = useCallback(() => {
    retryCountRef.current = 0;
    setState((prev) => ({ ...prev, error: null, retryCount: 0 }));
    startListeningInternal(onTranscriptRef.current, false);
  }, [startListeningInternal]);

  return {
    ...state,
    speak,
    startListening,
    stopListening,
    stopSpeaking,
    retryListening,
    reset,
  };
}