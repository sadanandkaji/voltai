// lib/limit.ts
// Minimal concurrency limiter + retry-with-backoff — no extra deps needed.

export function pLimit(concurrency: number) {
  let active = 0;
  const queue: (() => void)[] = [];

  const next = () => {
    active--;
    if (queue.length > 0) {
      const fn = queue.shift()!;
      fn();
    }
  };

  return function limit<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const run = () => {
        active++;
        fn()
          .then((val) => {
            resolve(val);
            next();
          })
          .catch((err) => {
            reject(err);
            next();
          });
      };

      if (active < concurrency) {
        run();
      } else {
        queue.push(run);
      }
    });
  };
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  opts: { retries?: number; baseDelayMs?: number; isRetryable?: (err: any) => boolean } = {}
): Promise<T> {
  const { retries = 3, baseDelayMs = 1200, isRetryable } = opts;

  let lastErr: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastErr = err;
      const status = err?.status || err?.response?.status;
      const retryable = isRetryable
        ? isRetryable(err)
        : status === 429 || status === 503 || /timeout|ECONNRESET|ETIMEDOUT/i.test(err?.message || "");

      if (!retryable || attempt === retries) break;

      const jitter = Math.random() * 300;
      const delay = baseDelayMs * Math.pow(2, attempt) + jitter;
      console.warn(`Retryable error (attempt ${attempt + 1}/${retries}), waiting ${Math.round(delay)}ms:`, err?.message || status);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}