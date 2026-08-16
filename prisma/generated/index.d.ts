
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model SavedRoute
 * 
 */
export type SavedRoute = $Result.DefaultSelection<Prisma.$SavedRoutePayload>
/**
 * Model ChargingStopSnapshot
 * 
 */
export type ChargingStopSnapshot = $Result.DefaultSelection<Prisma.$ChargingStopSnapshotPayload>
/**
 * Model CreditLog
 * 
 */
export type CreditLog = $Result.DefaultSelection<Prisma.$CreditLogPayload>
/**
 * Model GeocodeCache
 * 
 */
export type GeocodeCache = $Result.DefaultSelection<Prisma.$GeocodeCachePayload>
/**
 * Model StationSearchCache
 * 
 */
export type StationSearchCache = $Result.DefaultSelection<Prisma.$StationSearchCachePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs>;

  /**
   * `prisma.savedRoute`: Exposes CRUD operations for the **SavedRoute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedRoutes
    * const savedRoutes = await prisma.savedRoute.findMany()
    * ```
    */
  get savedRoute(): Prisma.SavedRouteDelegate<ExtArgs>;

  /**
   * `prisma.chargingStopSnapshot`: Exposes CRUD operations for the **ChargingStopSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChargingStopSnapshots
    * const chargingStopSnapshots = await prisma.chargingStopSnapshot.findMany()
    * ```
    */
  get chargingStopSnapshot(): Prisma.ChargingStopSnapshotDelegate<ExtArgs>;

  /**
   * `prisma.creditLog`: Exposes CRUD operations for the **CreditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditLogs
    * const creditLogs = await prisma.creditLog.findMany()
    * ```
    */
  get creditLog(): Prisma.CreditLogDelegate<ExtArgs>;

  /**
   * `prisma.geocodeCache`: Exposes CRUD operations for the **GeocodeCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeocodeCaches
    * const geocodeCaches = await prisma.geocodeCache.findMany()
    * ```
    */
  get geocodeCache(): Prisma.GeocodeCacheDelegate<ExtArgs>;

  /**
   * `prisma.stationSearchCache`: Exposes CRUD operations for the **StationSearchCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StationSearchCaches
    * const stationSearchCaches = await prisma.stationSearchCache.findMany()
    * ```
    */
  get stationSearchCache(): Prisma.StationSearchCacheDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Vehicle: 'Vehicle',
    SavedRoute: 'SavedRoute',
    ChargingStopSnapshot: 'ChargingStopSnapshot',
    CreditLog: 'CreditLog',
    GeocodeCache: 'GeocodeCache',
    StationSearchCache: 'StationSearchCache'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "vehicle" | "savedRoute" | "chargingStopSnapshot" | "creditLog" | "geocodeCache" | "stationSearchCache"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      SavedRoute: {
        payload: Prisma.$SavedRoutePayload<ExtArgs>
        fields: Prisma.SavedRouteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedRouteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedRouteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload>
          }
          findFirst: {
            args: Prisma.SavedRouteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedRouteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload>
          }
          findMany: {
            args: Prisma.SavedRouteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload>[]
          }
          create: {
            args: Prisma.SavedRouteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload>
          }
          createMany: {
            args: Prisma.SavedRouteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedRouteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload>[]
          }
          delete: {
            args: Prisma.SavedRouteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload>
          }
          update: {
            args: Prisma.SavedRouteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload>
          }
          deleteMany: {
            args: Prisma.SavedRouteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedRouteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SavedRouteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedRoutePayload>
          }
          aggregate: {
            args: Prisma.SavedRouteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedRoute>
          }
          groupBy: {
            args: Prisma.SavedRouteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedRouteGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedRouteCountArgs<ExtArgs>
            result: $Utils.Optional<SavedRouteCountAggregateOutputType> | number
          }
        }
      }
      ChargingStopSnapshot: {
        payload: Prisma.$ChargingStopSnapshotPayload<ExtArgs>
        fields: Prisma.ChargingStopSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChargingStopSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChargingStopSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload>
          }
          findFirst: {
            args: Prisma.ChargingStopSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChargingStopSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload>
          }
          findMany: {
            args: Prisma.ChargingStopSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload>[]
          }
          create: {
            args: Prisma.ChargingStopSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload>
          }
          createMany: {
            args: Prisma.ChargingStopSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChargingStopSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload>[]
          }
          delete: {
            args: Prisma.ChargingStopSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload>
          }
          update: {
            args: Prisma.ChargingStopSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.ChargingStopSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChargingStopSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChargingStopSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChargingStopSnapshotPayload>
          }
          aggregate: {
            args: Prisma.ChargingStopSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChargingStopSnapshot>
          }
          groupBy: {
            args: Prisma.ChargingStopSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChargingStopSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChargingStopSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<ChargingStopSnapshotCountAggregateOutputType> | number
          }
        }
      }
      CreditLog: {
        payload: Prisma.$CreditLogPayload<ExtArgs>
        fields: Prisma.CreditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          findFirst: {
            args: Prisma.CreditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          findMany: {
            args: Prisma.CreditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>[]
          }
          create: {
            args: Prisma.CreditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          createMany: {
            args: Prisma.CreditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>[]
          }
          delete: {
            args: Prisma.CreditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          update: {
            args: Prisma.CreditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          deleteMany: {
            args: Prisma.CreditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CreditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          aggregate: {
            args: Prisma.CreditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditLog>
          }
          groupBy: {
            args: Prisma.CreditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditLogCountArgs<ExtArgs>
            result: $Utils.Optional<CreditLogCountAggregateOutputType> | number
          }
        }
      }
      GeocodeCache: {
        payload: Prisma.$GeocodeCachePayload<ExtArgs>
        fields: Prisma.GeocodeCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeocodeCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeocodeCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload>
          }
          findFirst: {
            args: Prisma.GeocodeCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeocodeCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload>
          }
          findMany: {
            args: Prisma.GeocodeCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload>[]
          }
          create: {
            args: Prisma.GeocodeCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload>
          }
          createMany: {
            args: Prisma.GeocodeCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeocodeCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload>[]
          }
          delete: {
            args: Prisma.GeocodeCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload>
          }
          update: {
            args: Prisma.GeocodeCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload>
          }
          deleteMany: {
            args: Prisma.GeocodeCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeocodeCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GeocodeCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeocodeCachePayload>
          }
          aggregate: {
            args: Prisma.GeocodeCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeocodeCache>
          }
          groupBy: {
            args: Prisma.GeocodeCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeocodeCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeocodeCacheCountArgs<ExtArgs>
            result: $Utils.Optional<GeocodeCacheCountAggregateOutputType> | number
          }
        }
      }
      StationSearchCache: {
        payload: Prisma.$StationSearchCachePayload<ExtArgs>
        fields: Prisma.StationSearchCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StationSearchCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StationSearchCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload>
          }
          findFirst: {
            args: Prisma.StationSearchCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StationSearchCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload>
          }
          findMany: {
            args: Prisma.StationSearchCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload>[]
          }
          create: {
            args: Prisma.StationSearchCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload>
          }
          createMany: {
            args: Prisma.StationSearchCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StationSearchCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload>[]
          }
          delete: {
            args: Prisma.StationSearchCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload>
          }
          update: {
            args: Prisma.StationSearchCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload>
          }
          deleteMany: {
            args: Prisma.StationSearchCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StationSearchCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StationSearchCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StationSearchCachePayload>
          }
          aggregate: {
            args: Prisma.StationSearchCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStationSearchCache>
          }
          groupBy: {
            args: Prisma.StationSearchCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<StationSearchCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.StationSearchCacheCountArgs<ExtArgs>
            result: $Utils.Optional<StationSearchCacheCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    vehicles: number
    savedRoutes: number
    creditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    vehicles?: boolean | UserCountOutputTypeCountVehiclesArgs
    savedRoutes?: boolean | UserCountOutputTypeCountSavedRoutesArgs
    creditLogs?: boolean | UserCountOutputTypeCountCreditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedRoutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedRouteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditLogWhereInput
  }


  /**
   * Count Type SavedRouteCountOutputType
   */

  export type SavedRouteCountOutputType = {
    chargingStations: number
  }

  export type SavedRouteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chargingStations?: boolean | SavedRouteCountOutputTypeCountChargingStationsArgs
  }

  // Custom InputTypes
  /**
   * SavedRouteCountOutputType without action
   */
  export type SavedRouteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRouteCountOutputType
     */
    select?: SavedRouteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SavedRouteCountOutputType without action
   */
  export type SavedRouteCountOutputTypeCountChargingStationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChargingStopSnapshotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    credits: number | null
  }

  export type UserSumAggregateOutputType = {
    credits: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    credits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    credits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    credits: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    credits?: true
  }

  export type UserSumAggregateInputType = {
    credits?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    emailVerified: Date | null
    image: string | null
    credits: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    vehicles?: boolean | User$vehiclesArgs<ExtArgs>
    savedRoutes?: boolean | User$savedRoutesArgs<ExtArgs>
    creditLogs?: boolean | User$creditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    vehicles?: boolean | User$vehiclesArgs<ExtArgs>
    savedRoutes?: boolean | User$savedRoutesArgs<ExtArgs>
    creditLogs?: boolean | User$creditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      vehicles: Prisma.$VehiclePayload<ExtArgs>[]
      savedRoutes: Prisma.$SavedRoutePayload<ExtArgs>[]
      creditLogs: Prisma.$CreditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      emailVerified: Date | null
      image: string | null
      credits: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    vehicles<T extends User$vehiclesArgs<ExtArgs> = {}>(args?: Subset<T, User$vehiclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany"> | Null>
    savedRoutes<T extends User$savedRoutesArgs<ExtArgs> = {}>(args?: Subset<T, User$savedRoutesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "findMany"> | Null>
    creditLogs<T extends User$creditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$creditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly credits: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.vehicles
   */
  export type User$vehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    cursor?: VehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * User.savedRoutes
   */
  export type User$savedRoutesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    where?: SavedRouteWhereInput
    orderBy?: SavedRouteOrderByWithRelationInput | SavedRouteOrderByWithRelationInput[]
    cursor?: SavedRouteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedRouteScalarFieldEnum | SavedRouteScalarFieldEnum[]
  }

  /**
   * User.creditLogs
   */
  export type User$creditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    where?: CreditLogWhereInput
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    cursor?: CreditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditLogScalarFieldEnum | CreditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }


  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({ 
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */ 
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    rangeKm: number | null
  }

  export type VehicleSumAggregateOutputType = {
    rangeKm: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    userId: string | null
    label: string | null
    rangeKm: number | null
    isPreset: boolean | null
    isDefault: boolean | null
    createdAt: Date | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    label: string | null
    rangeKm: number | null
    isPreset: boolean | null
    isDefault: boolean | null
    createdAt: Date | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    userId: number
    label: number
    rangeKm: number
    isPreset: number
    isDefault: number
    createdAt: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    rangeKm?: true
  }

  export type VehicleSumAggregateInputType = {
    rangeKm?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    rangeKm?: true
    isPreset?: true
    isDefault?: true
    createdAt?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    rangeKm?: true
    isPreset?: true
    isDefault?: true
    createdAt?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    userId?: true
    label?: true
    rangeKm?: true
    isPreset?: true
    isDefault?: true
    createdAt?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    userId: string
    label: string
    rangeKm: number
    isPreset: boolean
    isDefault: boolean
    createdAt: Date
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    label?: boolean
    rangeKm?: boolean
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    label?: boolean
    rangeKm?: boolean
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    userId?: boolean
    label?: boolean
    rangeKm?: boolean
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: boolean
  }

  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      label: string
      rangeKm: number
      isPreset: boolean
      isDefault: boolean
      createdAt: Date
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */ 
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly userId: FieldRef<"Vehicle", 'String'>
    readonly label: FieldRef<"Vehicle", 'String'>
    readonly rangeKm: FieldRef<"Vehicle", 'Int'>
    readonly isPreset: FieldRef<"Vehicle", 'Boolean'>
    readonly isDefault: FieldRef<"Vehicle", 'Boolean'>
    readonly createdAt: FieldRef<"Vehicle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model SavedRoute
   */

  export type AggregateSavedRoute = {
    _count: SavedRouteCountAggregateOutputType | null
    _avg: SavedRouteAvgAggregateOutputType | null
    _sum: SavedRouteSumAggregateOutputType | null
    _min: SavedRouteMinAggregateOutputType | null
    _max: SavedRouteMaxAggregateOutputType | null
  }

  export type SavedRouteAvgAggregateOutputType = {
    originLat: number | null
    originLon: number | null
    destLat: number | null
    destLon: number | null
    batteryPercent: number | null
    vehicleRangeKm: number | null
    distanceKm: number | null
    durationMin: number | null
    elevationGainM: number | null
    weatherTemp: number | null
    weatherWind: number | null
    weatherRain: number | null
    weatherFactor: number | null
    totalBatteryUsed: number | null
    remainingBattery: number | null
    effectiveRange: number | null
    safetyBuffer: number | null
    aiOptimalSpeed: number | null
  }

  export type SavedRouteSumAggregateOutputType = {
    originLat: number | null
    originLon: number | null
    destLat: number | null
    destLon: number | null
    batteryPercent: number | null
    vehicleRangeKm: number | null
    distanceKm: number | null
    durationMin: number | null
    elevationGainM: number | null
    weatherTemp: number | null
    weatherWind: number | null
    weatherRain: number | null
    weatherFactor: number | null
    totalBatteryUsed: number | null
    remainingBattery: number | null
    effectiveRange: number | null
    safetyBuffer: number | null
    aiOptimalSpeed: number | null
  }

  export type SavedRouteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    originName: string | null
    originLat: number | null
    originLon: number | null
    destName: string | null
    destLat: number | null
    destLon: number | null
    batteryPercent: number | null
    vehicleRangeKm: number | null
    distanceKm: number | null
    durationMin: number | null
    elevationGainM: number | null
    weatherTemp: number | null
    weatherWind: number | null
    weatherRain: number | null
    weatherFactor: number | null
    weatherLabel: string | null
    totalBatteryUsed: number | null
    remainingBattery: number | null
    effectiveRange: number | null
    willReachDestination: boolean | null
    safetyBuffer: number | null
    aiSummary: string | null
    aiVerdict: string | null
    aiChargingAdvice: string | null
    aiOptimalSpeed: number | null
    aiRiskLevel: string | null
    createdAt: Date | null
  }

  export type SavedRouteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    originName: string | null
    originLat: number | null
    originLon: number | null
    destName: string | null
    destLat: number | null
    destLon: number | null
    batteryPercent: number | null
    vehicleRangeKm: number | null
    distanceKm: number | null
    durationMin: number | null
    elevationGainM: number | null
    weatherTemp: number | null
    weatherWind: number | null
    weatherRain: number | null
    weatherFactor: number | null
    weatherLabel: string | null
    totalBatteryUsed: number | null
    remainingBattery: number | null
    effectiveRange: number | null
    willReachDestination: boolean | null
    safetyBuffer: number | null
    aiSummary: string | null
    aiVerdict: string | null
    aiChargingAdvice: string | null
    aiOptimalSpeed: number | null
    aiRiskLevel: string | null
    createdAt: Date | null
  }

  export type SavedRouteCountAggregateOutputType = {
    id: number
    userId: number
    originName: number
    originLat: number
    originLon: number
    destName: number
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp: number
    weatherWind: number
    weatherRain: number
    weatherFactor: number
    weatherLabel: number
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: number
    safetyBuffer: number
    aiSummary: number
    aiVerdict: number
    aiChargingAdvice: number
    aiOptimalSpeed: number
    aiRiskLevel: number
    createdAt: number
    _all: number
  }


  export type SavedRouteAvgAggregateInputType = {
    originLat?: true
    originLon?: true
    destLat?: true
    destLon?: true
    batteryPercent?: true
    vehicleRangeKm?: true
    distanceKm?: true
    durationMin?: true
    elevationGainM?: true
    weatherTemp?: true
    weatherWind?: true
    weatherRain?: true
    weatherFactor?: true
    totalBatteryUsed?: true
    remainingBattery?: true
    effectiveRange?: true
    safetyBuffer?: true
    aiOptimalSpeed?: true
  }

  export type SavedRouteSumAggregateInputType = {
    originLat?: true
    originLon?: true
    destLat?: true
    destLon?: true
    batteryPercent?: true
    vehicleRangeKm?: true
    distanceKm?: true
    durationMin?: true
    elevationGainM?: true
    weatherTemp?: true
    weatherWind?: true
    weatherRain?: true
    weatherFactor?: true
    totalBatteryUsed?: true
    remainingBattery?: true
    effectiveRange?: true
    safetyBuffer?: true
    aiOptimalSpeed?: true
  }

  export type SavedRouteMinAggregateInputType = {
    id?: true
    userId?: true
    originName?: true
    originLat?: true
    originLon?: true
    destName?: true
    destLat?: true
    destLon?: true
    batteryPercent?: true
    vehicleRangeKm?: true
    distanceKm?: true
    durationMin?: true
    elevationGainM?: true
    weatherTemp?: true
    weatherWind?: true
    weatherRain?: true
    weatherFactor?: true
    weatherLabel?: true
    totalBatteryUsed?: true
    remainingBattery?: true
    effectiveRange?: true
    willReachDestination?: true
    safetyBuffer?: true
    aiSummary?: true
    aiVerdict?: true
    aiChargingAdvice?: true
    aiOptimalSpeed?: true
    aiRiskLevel?: true
    createdAt?: true
  }

  export type SavedRouteMaxAggregateInputType = {
    id?: true
    userId?: true
    originName?: true
    originLat?: true
    originLon?: true
    destName?: true
    destLat?: true
    destLon?: true
    batteryPercent?: true
    vehicleRangeKm?: true
    distanceKm?: true
    durationMin?: true
    elevationGainM?: true
    weatherTemp?: true
    weatherWind?: true
    weatherRain?: true
    weatherFactor?: true
    weatherLabel?: true
    totalBatteryUsed?: true
    remainingBattery?: true
    effectiveRange?: true
    willReachDestination?: true
    safetyBuffer?: true
    aiSummary?: true
    aiVerdict?: true
    aiChargingAdvice?: true
    aiOptimalSpeed?: true
    aiRiskLevel?: true
    createdAt?: true
  }

  export type SavedRouteCountAggregateInputType = {
    id?: true
    userId?: true
    originName?: true
    originLat?: true
    originLon?: true
    destName?: true
    destLat?: true
    destLon?: true
    batteryPercent?: true
    vehicleRangeKm?: true
    distanceKm?: true
    durationMin?: true
    elevationGainM?: true
    weatherTemp?: true
    weatherWind?: true
    weatherRain?: true
    weatherFactor?: true
    weatherLabel?: true
    totalBatteryUsed?: true
    remainingBattery?: true
    effectiveRange?: true
    willReachDestination?: true
    safetyBuffer?: true
    aiSummary?: true
    aiVerdict?: true
    aiChargingAdvice?: true
    aiOptimalSpeed?: true
    aiRiskLevel?: true
    createdAt?: true
    _all?: true
  }

  export type SavedRouteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedRoute to aggregate.
     */
    where?: SavedRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedRoutes to fetch.
     */
    orderBy?: SavedRouteOrderByWithRelationInput | SavedRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedRoutes
    **/
    _count?: true | SavedRouteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SavedRouteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SavedRouteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedRouteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedRouteMaxAggregateInputType
  }

  export type GetSavedRouteAggregateType<T extends SavedRouteAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedRoute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedRoute[P]>
      : GetScalarType<T[P], AggregateSavedRoute[P]>
  }




  export type SavedRouteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedRouteWhereInput
    orderBy?: SavedRouteOrderByWithAggregationInput | SavedRouteOrderByWithAggregationInput[]
    by: SavedRouteScalarFieldEnum[] | SavedRouteScalarFieldEnum
    having?: SavedRouteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedRouteCountAggregateInputType | true
    _avg?: SavedRouteAvgAggregateInputType
    _sum?: SavedRouteSumAggregateInputType
    _min?: SavedRouteMinAggregateInputType
    _max?: SavedRouteMaxAggregateInputType
  }

  export type SavedRouteGroupByOutputType = {
    id: string
    userId: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp: number | null
    weatherWind: number | null
    weatherRain: number | null
    weatherFactor: number | null
    weatherLabel: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary: string | null
    aiVerdict: string | null
    aiChargingAdvice: string | null
    aiOptimalSpeed: number | null
    aiRiskLevel: string | null
    createdAt: Date
    _count: SavedRouteCountAggregateOutputType | null
    _avg: SavedRouteAvgAggregateOutputType | null
    _sum: SavedRouteSumAggregateOutputType | null
    _min: SavedRouteMinAggregateOutputType | null
    _max: SavedRouteMaxAggregateOutputType | null
  }

  type GetSavedRouteGroupByPayload<T extends SavedRouteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedRouteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedRouteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedRouteGroupByOutputType[P]>
            : GetScalarType<T[P], SavedRouteGroupByOutputType[P]>
        }
      >
    >


  export type SavedRouteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originName?: boolean
    originLat?: boolean
    originLon?: boolean
    destName?: boolean
    destLat?: boolean
    destLon?: boolean
    batteryPercent?: boolean
    vehicleRangeKm?: boolean
    distanceKm?: boolean
    durationMin?: boolean
    elevationGainM?: boolean
    weatherTemp?: boolean
    weatherWind?: boolean
    weatherRain?: boolean
    weatherFactor?: boolean
    weatherLabel?: boolean
    totalBatteryUsed?: boolean
    remainingBattery?: boolean
    effectiveRange?: boolean
    willReachDestination?: boolean
    safetyBuffer?: boolean
    aiSummary?: boolean
    aiVerdict?: boolean
    aiChargingAdvice?: boolean
    aiOptimalSpeed?: boolean
    aiRiskLevel?: boolean
    createdAt?: boolean
    chargingStations?: boolean | SavedRoute$chargingStationsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | SavedRouteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedRoute"]>

  export type SavedRouteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originName?: boolean
    originLat?: boolean
    originLon?: boolean
    destName?: boolean
    destLat?: boolean
    destLon?: boolean
    batteryPercent?: boolean
    vehicleRangeKm?: boolean
    distanceKm?: boolean
    durationMin?: boolean
    elevationGainM?: boolean
    weatherTemp?: boolean
    weatherWind?: boolean
    weatherRain?: boolean
    weatherFactor?: boolean
    weatherLabel?: boolean
    totalBatteryUsed?: boolean
    remainingBattery?: boolean
    effectiveRange?: boolean
    willReachDestination?: boolean
    safetyBuffer?: boolean
    aiSummary?: boolean
    aiVerdict?: boolean
    aiChargingAdvice?: boolean
    aiOptimalSpeed?: boolean
    aiRiskLevel?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedRoute"]>

  export type SavedRouteSelectScalar = {
    id?: boolean
    userId?: boolean
    originName?: boolean
    originLat?: boolean
    originLon?: boolean
    destName?: boolean
    destLat?: boolean
    destLon?: boolean
    batteryPercent?: boolean
    vehicleRangeKm?: boolean
    distanceKm?: boolean
    durationMin?: boolean
    elevationGainM?: boolean
    weatherTemp?: boolean
    weatherWind?: boolean
    weatherRain?: boolean
    weatherFactor?: boolean
    weatherLabel?: boolean
    totalBatteryUsed?: boolean
    remainingBattery?: boolean
    effectiveRange?: boolean
    willReachDestination?: boolean
    safetyBuffer?: boolean
    aiSummary?: boolean
    aiVerdict?: boolean
    aiChargingAdvice?: boolean
    aiOptimalSpeed?: boolean
    aiRiskLevel?: boolean
    createdAt?: boolean
  }

  export type SavedRouteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chargingStations?: boolean | SavedRoute$chargingStationsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | SavedRouteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SavedRouteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SavedRoutePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedRoute"
    objects: {
      chargingStations: Prisma.$ChargingStopSnapshotPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      originName: string
      originLat: number
      originLon: number
      destName: string
      destLat: number
      destLon: number
      batteryPercent: number
      vehicleRangeKm: number
      distanceKm: number
      durationMin: number
      elevationGainM: number
      weatherTemp: number | null
      weatherWind: number | null
      weatherRain: number | null
      weatherFactor: number | null
      weatherLabel: string | null
      totalBatteryUsed: number
      remainingBattery: number
      effectiveRange: number
      willReachDestination: boolean
      safetyBuffer: number
      aiSummary: string | null
      aiVerdict: string | null
      aiChargingAdvice: string | null
      aiOptimalSpeed: number | null
      aiRiskLevel: string | null
      createdAt: Date
    }, ExtArgs["result"]["savedRoute"]>
    composites: {}
  }

  type SavedRouteGetPayload<S extends boolean | null | undefined | SavedRouteDefaultArgs> = $Result.GetResult<Prisma.$SavedRoutePayload, S>

  type SavedRouteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SavedRouteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SavedRouteCountAggregateInputType | true
    }

  export interface SavedRouteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedRoute'], meta: { name: 'SavedRoute' } }
    /**
     * Find zero or one SavedRoute that matches the filter.
     * @param {SavedRouteFindUniqueArgs} args - Arguments to find a SavedRoute
     * @example
     * // Get one SavedRoute
     * const savedRoute = await prisma.savedRoute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedRouteFindUniqueArgs>(args: SelectSubset<T, SavedRouteFindUniqueArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SavedRoute that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SavedRouteFindUniqueOrThrowArgs} args - Arguments to find a SavedRoute
     * @example
     * // Get one SavedRoute
     * const savedRoute = await prisma.savedRoute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedRouteFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedRouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SavedRoute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRouteFindFirstArgs} args - Arguments to find a SavedRoute
     * @example
     * // Get one SavedRoute
     * const savedRoute = await prisma.savedRoute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedRouteFindFirstArgs>(args?: SelectSubset<T, SavedRouteFindFirstArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SavedRoute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRouteFindFirstOrThrowArgs} args - Arguments to find a SavedRoute
     * @example
     * // Get one SavedRoute
     * const savedRoute = await prisma.savedRoute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedRouteFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedRouteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SavedRoutes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedRoutes
     * const savedRoutes = await prisma.savedRoute.findMany()
     * 
     * // Get first 10 SavedRoutes
     * const savedRoutes = await prisma.savedRoute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedRouteWithIdOnly = await prisma.savedRoute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedRouteFindManyArgs>(args?: SelectSubset<T, SavedRouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SavedRoute.
     * @param {SavedRouteCreateArgs} args - Arguments to create a SavedRoute.
     * @example
     * // Create one SavedRoute
     * const SavedRoute = await prisma.savedRoute.create({
     *   data: {
     *     // ... data to create a SavedRoute
     *   }
     * })
     * 
     */
    create<T extends SavedRouteCreateArgs>(args: SelectSubset<T, SavedRouteCreateArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SavedRoutes.
     * @param {SavedRouteCreateManyArgs} args - Arguments to create many SavedRoutes.
     * @example
     * // Create many SavedRoutes
     * const savedRoute = await prisma.savedRoute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedRouteCreateManyArgs>(args?: SelectSubset<T, SavedRouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedRoutes and returns the data saved in the database.
     * @param {SavedRouteCreateManyAndReturnArgs} args - Arguments to create many SavedRoutes.
     * @example
     * // Create many SavedRoutes
     * const savedRoute = await prisma.savedRoute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedRoutes and only return the `id`
     * const savedRouteWithIdOnly = await prisma.savedRoute.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedRouteCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedRouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SavedRoute.
     * @param {SavedRouteDeleteArgs} args - Arguments to delete one SavedRoute.
     * @example
     * // Delete one SavedRoute
     * const SavedRoute = await prisma.savedRoute.delete({
     *   where: {
     *     // ... filter to delete one SavedRoute
     *   }
     * })
     * 
     */
    delete<T extends SavedRouteDeleteArgs>(args: SelectSubset<T, SavedRouteDeleteArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SavedRoute.
     * @param {SavedRouteUpdateArgs} args - Arguments to update one SavedRoute.
     * @example
     * // Update one SavedRoute
     * const savedRoute = await prisma.savedRoute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedRouteUpdateArgs>(args: SelectSubset<T, SavedRouteUpdateArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SavedRoutes.
     * @param {SavedRouteDeleteManyArgs} args - Arguments to filter SavedRoutes to delete.
     * @example
     * // Delete a few SavedRoutes
     * const { count } = await prisma.savedRoute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedRouteDeleteManyArgs>(args?: SelectSubset<T, SavedRouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedRoutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedRoutes
     * const savedRoute = await prisma.savedRoute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedRouteUpdateManyArgs>(args: SelectSubset<T, SavedRouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SavedRoute.
     * @param {SavedRouteUpsertArgs} args - Arguments to update or create a SavedRoute.
     * @example
     * // Update or create a SavedRoute
     * const savedRoute = await prisma.savedRoute.upsert({
     *   create: {
     *     // ... data to create a SavedRoute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedRoute we want to update
     *   }
     * })
     */
    upsert<T extends SavedRouteUpsertArgs>(args: SelectSubset<T, SavedRouteUpsertArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SavedRoutes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRouteCountArgs} args - Arguments to filter SavedRoutes to count.
     * @example
     * // Count the number of SavedRoutes
     * const count = await prisma.savedRoute.count({
     *   where: {
     *     // ... the filter for the SavedRoutes we want to count
     *   }
     * })
    **/
    count<T extends SavedRouteCountArgs>(
      args?: Subset<T, SavedRouteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedRouteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedRoute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedRouteAggregateArgs>(args: Subset<T, SavedRouteAggregateArgs>): Prisma.PrismaPromise<GetSavedRouteAggregateType<T>>

    /**
     * Group by SavedRoute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRouteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedRouteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedRouteGroupByArgs['orderBy'] }
        : { orderBy?: SavedRouteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedRouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedRoute model
   */
  readonly fields: SavedRouteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedRoute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedRouteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chargingStations<T extends SavedRoute$chargingStationsArgs<ExtArgs> = {}>(args?: Subset<T, SavedRoute$chargingStationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "findMany"> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedRoute model
   */ 
  interface SavedRouteFieldRefs {
    readonly id: FieldRef<"SavedRoute", 'String'>
    readonly userId: FieldRef<"SavedRoute", 'String'>
    readonly originName: FieldRef<"SavedRoute", 'String'>
    readonly originLat: FieldRef<"SavedRoute", 'Float'>
    readonly originLon: FieldRef<"SavedRoute", 'Float'>
    readonly destName: FieldRef<"SavedRoute", 'String'>
    readonly destLat: FieldRef<"SavedRoute", 'Float'>
    readonly destLon: FieldRef<"SavedRoute", 'Float'>
    readonly batteryPercent: FieldRef<"SavedRoute", 'Int'>
    readonly vehicleRangeKm: FieldRef<"SavedRoute", 'Int'>
    readonly distanceKm: FieldRef<"SavedRoute", 'Float'>
    readonly durationMin: FieldRef<"SavedRoute", 'Float'>
    readonly elevationGainM: FieldRef<"SavedRoute", 'Float'>
    readonly weatherTemp: FieldRef<"SavedRoute", 'Float'>
    readonly weatherWind: FieldRef<"SavedRoute", 'Float'>
    readonly weatherRain: FieldRef<"SavedRoute", 'Float'>
    readonly weatherFactor: FieldRef<"SavedRoute", 'Float'>
    readonly weatherLabel: FieldRef<"SavedRoute", 'String'>
    readonly totalBatteryUsed: FieldRef<"SavedRoute", 'Float'>
    readonly remainingBattery: FieldRef<"SavedRoute", 'Float'>
    readonly effectiveRange: FieldRef<"SavedRoute", 'Int'>
    readonly willReachDestination: FieldRef<"SavedRoute", 'Boolean'>
    readonly safetyBuffer: FieldRef<"SavedRoute", 'Int'>
    readonly aiSummary: FieldRef<"SavedRoute", 'String'>
    readonly aiVerdict: FieldRef<"SavedRoute", 'String'>
    readonly aiChargingAdvice: FieldRef<"SavedRoute", 'String'>
    readonly aiOptimalSpeed: FieldRef<"SavedRoute", 'Int'>
    readonly aiRiskLevel: FieldRef<"SavedRoute", 'String'>
    readonly createdAt: FieldRef<"SavedRoute", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedRoute findUnique
   */
  export type SavedRouteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * Filter, which SavedRoute to fetch.
     */
    where: SavedRouteWhereUniqueInput
  }

  /**
   * SavedRoute findUniqueOrThrow
   */
  export type SavedRouteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * Filter, which SavedRoute to fetch.
     */
    where: SavedRouteWhereUniqueInput
  }

  /**
   * SavedRoute findFirst
   */
  export type SavedRouteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * Filter, which SavedRoute to fetch.
     */
    where?: SavedRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedRoutes to fetch.
     */
    orderBy?: SavedRouteOrderByWithRelationInput | SavedRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedRoutes.
     */
    cursor?: SavedRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedRoutes.
     */
    distinct?: SavedRouteScalarFieldEnum | SavedRouteScalarFieldEnum[]
  }

  /**
   * SavedRoute findFirstOrThrow
   */
  export type SavedRouteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * Filter, which SavedRoute to fetch.
     */
    where?: SavedRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedRoutes to fetch.
     */
    orderBy?: SavedRouteOrderByWithRelationInput | SavedRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedRoutes.
     */
    cursor?: SavedRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedRoutes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedRoutes.
     */
    distinct?: SavedRouteScalarFieldEnum | SavedRouteScalarFieldEnum[]
  }

  /**
   * SavedRoute findMany
   */
  export type SavedRouteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * Filter, which SavedRoutes to fetch.
     */
    where?: SavedRouteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedRoutes to fetch.
     */
    orderBy?: SavedRouteOrderByWithRelationInput | SavedRouteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedRoutes.
     */
    cursor?: SavedRouteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedRoutes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedRoutes.
     */
    skip?: number
    distinct?: SavedRouteScalarFieldEnum | SavedRouteScalarFieldEnum[]
  }

  /**
   * SavedRoute create
   */
  export type SavedRouteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedRoute.
     */
    data: XOR<SavedRouteCreateInput, SavedRouteUncheckedCreateInput>
  }

  /**
   * SavedRoute createMany
   */
  export type SavedRouteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedRoutes.
     */
    data: SavedRouteCreateManyInput | SavedRouteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedRoute createManyAndReturn
   */
  export type SavedRouteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SavedRoutes.
     */
    data: SavedRouteCreateManyInput | SavedRouteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedRoute update
   */
  export type SavedRouteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedRoute.
     */
    data: XOR<SavedRouteUpdateInput, SavedRouteUncheckedUpdateInput>
    /**
     * Choose, which SavedRoute to update.
     */
    where: SavedRouteWhereUniqueInput
  }

  /**
   * SavedRoute updateMany
   */
  export type SavedRouteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedRoutes.
     */
    data: XOR<SavedRouteUpdateManyMutationInput, SavedRouteUncheckedUpdateManyInput>
    /**
     * Filter which SavedRoutes to update
     */
    where?: SavedRouteWhereInput
  }

  /**
   * SavedRoute upsert
   */
  export type SavedRouteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedRoute to update in case it exists.
     */
    where: SavedRouteWhereUniqueInput
    /**
     * In case the SavedRoute found by the `where` argument doesn't exist, create a new SavedRoute with this data.
     */
    create: XOR<SavedRouteCreateInput, SavedRouteUncheckedCreateInput>
    /**
     * In case the SavedRoute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedRouteUpdateInput, SavedRouteUncheckedUpdateInput>
  }

  /**
   * SavedRoute delete
   */
  export type SavedRouteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
    /**
     * Filter which SavedRoute to delete.
     */
    where: SavedRouteWhereUniqueInput
  }

  /**
   * SavedRoute deleteMany
   */
  export type SavedRouteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedRoutes to delete
     */
    where?: SavedRouteWhereInput
  }

  /**
   * SavedRoute.chargingStations
   */
  export type SavedRoute$chargingStationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    where?: ChargingStopSnapshotWhereInput
    orderBy?: ChargingStopSnapshotOrderByWithRelationInput | ChargingStopSnapshotOrderByWithRelationInput[]
    cursor?: ChargingStopSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChargingStopSnapshotScalarFieldEnum | ChargingStopSnapshotScalarFieldEnum[]
  }

  /**
   * SavedRoute without action
   */
  export type SavedRouteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRoute
     */
    select?: SavedRouteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedRouteInclude<ExtArgs> | null
  }


  /**
   * Model ChargingStopSnapshot
   */

  export type AggregateChargingStopSnapshot = {
    _count: ChargingStopSnapshotCountAggregateOutputType | null
    _avg: ChargingStopSnapshotAvgAggregateOutputType | null
    _sum: ChargingStopSnapshotSumAggregateOutputType | null
    _min: ChargingStopSnapshotMinAggregateOutputType | null
    _max: ChargingStopSnapshotMaxAggregateOutputType | null
  }

  export type ChargingStopSnapshotAvgAggregateOutputType = {
    lat: number | null
    lon: number | null
    connectors: number | null
    powerKw: number | null
    batteryAtPoint: number | null
    routeFraction: number | null
  }

  export type ChargingStopSnapshotSumAggregateOutputType = {
    lat: number | null
    lon: number | null
    connectors: number | null
    powerKw: number | null
    batteryAtPoint: number | null
    routeFraction: number | null
  }

  export type ChargingStopSnapshotMinAggregateOutputType = {
    id: string | null
    savedRouteId: string | null
    externalId: string | null
    name: string | null
    address: string | null
    lat: number | null
    lon: number | null
    connectors: number | null
    fastCharge: boolean | null
    powerKw: number | null
    network: string | null
    source: string | null
    batteryAtPoint: number | null
    isNeeded: boolean | null
    isCritical: boolean | null
    routeFraction: number | null
  }

  export type ChargingStopSnapshotMaxAggregateOutputType = {
    id: string | null
    savedRouteId: string | null
    externalId: string | null
    name: string | null
    address: string | null
    lat: number | null
    lon: number | null
    connectors: number | null
    fastCharge: boolean | null
    powerKw: number | null
    network: string | null
    source: string | null
    batteryAtPoint: number | null
    isNeeded: boolean | null
    isCritical: boolean | null
    routeFraction: number | null
  }

  export type ChargingStopSnapshotCountAggregateOutputType = {
    id: number
    savedRouteId: number
    externalId: number
    name: number
    address: number
    lat: number
    lon: number
    connectors: number
    fastCharge: number
    powerKw: number
    network: number
    source: number
    batteryAtPoint: number
    isNeeded: number
    isCritical: number
    routeFraction: number
    _all: number
  }


  export type ChargingStopSnapshotAvgAggregateInputType = {
    lat?: true
    lon?: true
    connectors?: true
    powerKw?: true
    batteryAtPoint?: true
    routeFraction?: true
  }

  export type ChargingStopSnapshotSumAggregateInputType = {
    lat?: true
    lon?: true
    connectors?: true
    powerKw?: true
    batteryAtPoint?: true
    routeFraction?: true
  }

  export type ChargingStopSnapshotMinAggregateInputType = {
    id?: true
    savedRouteId?: true
    externalId?: true
    name?: true
    address?: true
    lat?: true
    lon?: true
    connectors?: true
    fastCharge?: true
    powerKw?: true
    network?: true
    source?: true
    batteryAtPoint?: true
    isNeeded?: true
    isCritical?: true
    routeFraction?: true
  }

  export type ChargingStopSnapshotMaxAggregateInputType = {
    id?: true
    savedRouteId?: true
    externalId?: true
    name?: true
    address?: true
    lat?: true
    lon?: true
    connectors?: true
    fastCharge?: true
    powerKw?: true
    network?: true
    source?: true
    batteryAtPoint?: true
    isNeeded?: true
    isCritical?: true
    routeFraction?: true
  }

  export type ChargingStopSnapshotCountAggregateInputType = {
    id?: true
    savedRouteId?: true
    externalId?: true
    name?: true
    address?: true
    lat?: true
    lon?: true
    connectors?: true
    fastCharge?: true
    powerKw?: true
    network?: true
    source?: true
    batteryAtPoint?: true
    isNeeded?: true
    isCritical?: true
    routeFraction?: true
    _all?: true
  }

  export type ChargingStopSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChargingStopSnapshot to aggregate.
     */
    where?: ChargingStopSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChargingStopSnapshots to fetch.
     */
    orderBy?: ChargingStopSnapshotOrderByWithRelationInput | ChargingStopSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChargingStopSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChargingStopSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChargingStopSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChargingStopSnapshots
    **/
    _count?: true | ChargingStopSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChargingStopSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChargingStopSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChargingStopSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChargingStopSnapshotMaxAggregateInputType
  }

  export type GetChargingStopSnapshotAggregateType<T extends ChargingStopSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateChargingStopSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChargingStopSnapshot[P]>
      : GetScalarType<T[P], AggregateChargingStopSnapshot[P]>
  }




  export type ChargingStopSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChargingStopSnapshotWhereInput
    orderBy?: ChargingStopSnapshotOrderByWithAggregationInput | ChargingStopSnapshotOrderByWithAggregationInput[]
    by: ChargingStopSnapshotScalarFieldEnum[] | ChargingStopSnapshotScalarFieldEnum
    having?: ChargingStopSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChargingStopSnapshotCountAggregateInputType | true
    _avg?: ChargingStopSnapshotAvgAggregateInputType
    _sum?: ChargingStopSnapshotSumAggregateInputType
    _min?: ChargingStopSnapshotMinAggregateInputType
    _max?: ChargingStopSnapshotMaxAggregateInputType
  }

  export type ChargingStopSnapshotGroupByOutputType = {
    id: string
    savedRouteId: string
    externalId: string | null
    name: string
    address: string | null
    lat: number
    lon: number
    connectors: number
    fastCharge: boolean
    powerKw: number | null
    network: string | null
    source: string | null
    batteryAtPoint: number | null
    isNeeded: boolean
    isCritical: boolean
    routeFraction: number | null
    _count: ChargingStopSnapshotCountAggregateOutputType | null
    _avg: ChargingStopSnapshotAvgAggregateOutputType | null
    _sum: ChargingStopSnapshotSumAggregateOutputType | null
    _min: ChargingStopSnapshotMinAggregateOutputType | null
    _max: ChargingStopSnapshotMaxAggregateOutputType | null
  }

  type GetChargingStopSnapshotGroupByPayload<T extends ChargingStopSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChargingStopSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChargingStopSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChargingStopSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], ChargingStopSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type ChargingStopSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    savedRouteId?: boolean
    externalId?: boolean
    name?: boolean
    address?: boolean
    lat?: boolean
    lon?: boolean
    connectors?: boolean
    fastCharge?: boolean
    powerKw?: boolean
    network?: boolean
    source?: boolean
    batteryAtPoint?: boolean
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: boolean
    savedRoute?: boolean | SavedRouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chargingStopSnapshot"]>

  export type ChargingStopSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    savedRouteId?: boolean
    externalId?: boolean
    name?: boolean
    address?: boolean
    lat?: boolean
    lon?: boolean
    connectors?: boolean
    fastCharge?: boolean
    powerKw?: boolean
    network?: boolean
    source?: boolean
    batteryAtPoint?: boolean
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: boolean
    savedRoute?: boolean | SavedRouteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chargingStopSnapshot"]>

  export type ChargingStopSnapshotSelectScalar = {
    id?: boolean
    savedRouteId?: boolean
    externalId?: boolean
    name?: boolean
    address?: boolean
    lat?: boolean
    lon?: boolean
    connectors?: boolean
    fastCharge?: boolean
    powerKw?: boolean
    network?: boolean
    source?: boolean
    batteryAtPoint?: boolean
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: boolean
  }

  export type ChargingStopSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    savedRoute?: boolean | SavedRouteDefaultArgs<ExtArgs>
  }
  export type ChargingStopSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    savedRoute?: boolean | SavedRouteDefaultArgs<ExtArgs>
  }

  export type $ChargingStopSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChargingStopSnapshot"
    objects: {
      savedRoute: Prisma.$SavedRoutePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      savedRouteId: string
      externalId: string | null
      name: string
      address: string | null
      lat: number
      lon: number
      connectors: number
      fastCharge: boolean
      powerKw: number | null
      network: string | null
      source: string | null
      batteryAtPoint: number | null
      isNeeded: boolean
      isCritical: boolean
      routeFraction: number | null
    }, ExtArgs["result"]["chargingStopSnapshot"]>
    composites: {}
  }

  type ChargingStopSnapshotGetPayload<S extends boolean | null | undefined | ChargingStopSnapshotDefaultArgs> = $Result.GetResult<Prisma.$ChargingStopSnapshotPayload, S>

  type ChargingStopSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChargingStopSnapshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChargingStopSnapshotCountAggregateInputType | true
    }

  export interface ChargingStopSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChargingStopSnapshot'], meta: { name: 'ChargingStopSnapshot' } }
    /**
     * Find zero or one ChargingStopSnapshot that matches the filter.
     * @param {ChargingStopSnapshotFindUniqueArgs} args - Arguments to find a ChargingStopSnapshot
     * @example
     * // Get one ChargingStopSnapshot
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChargingStopSnapshotFindUniqueArgs>(args: SelectSubset<T, ChargingStopSnapshotFindUniqueArgs<ExtArgs>>): Prisma__ChargingStopSnapshotClient<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ChargingStopSnapshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ChargingStopSnapshotFindUniqueOrThrowArgs} args - Arguments to find a ChargingStopSnapshot
     * @example
     * // Get one ChargingStopSnapshot
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChargingStopSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, ChargingStopSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChargingStopSnapshotClient<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ChargingStopSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChargingStopSnapshotFindFirstArgs} args - Arguments to find a ChargingStopSnapshot
     * @example
     * // Get one ChargingStopSnapshot
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChargingStopSnapshotFindFirstArgs>(args?: SelectSubset<T, ChargingStopSnapshotFindFirstArgs<ExtArgs>>): Prisma__ChargingStopSnapshotClient<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ChargingStopSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChargingStopSnapshotFindFirstOrThrowArgs} args - Arguments to find a ChargingStopSnapshot
     * @example
     * // Get one ChargingStopSnapshot
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChargingStopSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, ChargingStopSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChargingStopSnapshotClient<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ChargingStopSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChargingStopSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChargingStopSnapshots
     * const chargingStopSnapshots = await prisma.chargingStopSnapshot.findMany()
     * 
     * // Get first 10 ChargingStopSnapshots
     * const chargingStopSnapshots = await prisma.chargingStopSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chargingStopSnapshotWithIdOnly = await prisma.chargingStopSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChargingStopSnapshotFindManyArgs>(args?: SelectSubset<T, ChargingStopSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ChargingStopSnapshot.
     * @param {ChargingStopSnapshotCreateArgs} args - Arguments to create a ChargingStopSnapshot.
     * @example
     * // Create one ChargingStopSnapshot
     * const ChargingStopSnapshot = await prisma.chargingStopSnapshot.create({
     *   data: {
     *     // ... data to create a ChargingStopSnapshot
     *   }
     * })
     * 
     */
    create<T extends ChargingStopSnapshotCreateArgs>(args: SelectSubset<T, ChargingStopSnapshotCreateArgs<ExtArgs>>): Prisma__ChargingStopSnapshotClient<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ChargingStopSnapshots.
     * @param {ChargingStopSnapshotCreateManyArgs} args - Arguments to create many ChargingStopSnapshots.
     * @example
     * // Create many ChargingStopSnapshots
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChargingStopSnapshotCreateManyArgs>(args?: SelectSubset<T, ChargingStopSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChargingStopSnapshots and returns the data saved in the database.
     * @param {ChargingStopSnapshotCreateManyAndReturnArgs} args - Arguments to create many ChargingStopSnapshots.
     * @example
     * // Create many ChargingStopSnapshots
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChargingStopSnapshots and only return the `id`
     * const chargingStopSnapshotWithIdOnly = await prisma.chargingStopSnapshot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChargingStopSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, ChargingStopSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ChargingStopSnapshot.
     * @param {ChargingStopSnapshotDeleteArgs} args - Arguments to delete one ChargingStopSnapshot.
     * @example
     * // Delete one ChargingStopSnapshot
     * const ChargingStopSnapshot = await prisma.chargingStopSnapshot.delete({
     *   where: {
     *     // ... filter to delete one ChargingStopSnapshot
     *   }
     * })
     * 
     */
    delete<T extends ChargingStopSnapshotDeleteArgs>(args: SelectSubset<T, ChargingStopSnapshotDeleteArgs<ExtArgs>>): Prisma__ChargingStopSnapshotClient<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ChargingStopSnapshot.
     * @param {ChargingStopSnapshotUpdateArgs} args - Arguments to update one ChargingStopSnapshot.
     * @example
     * // Update one ChargingStopSnapshot
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChargingStopSnapshotUpdateArgs>(args: SelectSubset<T, ChargingStopSnapshotUpdateArgs<ExtArgs>>): Prisma__ChargingStopSnapshotClient<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ChargingStopSnapshots.
     * @param {ChargingStopSnapshotDeleteManyArgs} args - Arguments to filter ChargingStopSnapshots to delete.
     * @example
     * // Delete a few ChargingStopSnapshots
     * const { count } = await prisma.chargingStopSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChargingStopSnapshotDeleteManyArgs>(args?: SelectSubset<T, ChargingStopSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChargingStopSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChargingStopSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChargingStopSnapshots
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChargingStopSnapshotUpdateManyArgs>(args: SelectSubset<T, ChargingStopSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChargingStopSnapshot.
     * @param {ChargingStopSnapshotUpsertArgs} args - Arguments to update or create a ChargingStopSnapshot.
     * @example
     * // Update or create a ChargingStopSnapshot
     * const chargingStopSnapshot = await prisma.chargingStopSnapshot.upsert({
     *   create: {
     *     // ... data to create a ChargingStopSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChargingStopSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends ChargingStopSnapshotUpsertArgs>(args: SelectSubset<T, ChargingStopSnapshotUpsertArgs<ExtArgs>>): Prisma__ChargingStopSnapshotClient<$Result.GetResult<Prisma.$ChargingStopSnapshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ChargingStopSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChargingStopSnapshotCountArgs} args - Arguments to filter ChargingStopSnapshots to count.
     * @example
     * // Count the number of ChargingStopSnapshots
     * const count = await prisma.chargingStopSnapshot.count({
     *   where: {
     *     // ... the filter for the ChargingStopSnapshots we want to count
     *   }
     * })
    **/
    count<T extends ChargingStopSnapshotCountArgs>(
      args?: Subset<T, ChargingStopSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChargingStopSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChargingStopSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChargingStopSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChargingStopSnapshotAggregateArgs>(args: Subset<T, ChargingStopSnapshotAggregateArgs>): Prisma.PrismaPromise<GetChargingStopSnapshotAggregateType<T>>

    /**
     * Group by ChargingStopSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChargingStopSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChargingStopSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChargingStopSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: ChargingStopSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChargingStopSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChargingStopSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChargingStopSnapshot model
   */
  readonly fields: ChargingStopSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChargingStopSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChargingStopSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    savedRoute<T extends SavedRouteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SavedRouteDefaultArgs<ExtArgs>>): Prisma__SavedRouteClient<$Result.GetResult<Prisma.$SavedRoutePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChargingStopSnapshot model
   */ 
  interface ChargingStopSnapshotFieldRefs {
    readonly id: FieldRef<"ChargingStopSnapshot", 'String'>
    readonly savedRouteId: FieldRef<"ChargingStopSnapshot", 'String'>
    readonly externalId: FieldRef<"ChargingStopSnapshot", 'String'>
    readonly name: FieldRef<"ChargingStopSnapshot", 'String'>
    readonly address: FieldRef<"ChargingStopSnapshot", 'String'>
    readonly lat: FieldRef<"ChargingStopSnapshot", 'Float'>
    readonly lon: FieldRef<"ChargingStopSnapshot", 'Float'>
    readonly connectors: FieldRef<"ChargingStopSnapshot", 'Int'>
    readonly fastCharge: FieldRef<"ChargingStopSnapshot", 'Boolean'>
    readonly powerKw: FieldRef<"ChargingStopSnapshot", 'Float'>
    readonly network: FieldRef<"ChargingStopSnapshot", 'String'>
    readonly source: FieldRef<"ChargingStopSnapshot", 'String'>
    readonly batteryAtPoint: FieldRef<"ChargingStopSnapshot", 'Float'>
    readonly isNeeded: FieldRef<"ChargingStopSnapshot", 'Boolean'>
    readonly isCritical: FieldRef<"ChargingStopSnapshot", 'Boolean'>
    readonly routeFraction: FieldRef<"ChargingStopSnapshot", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * ChargingStopSnapshot findUnique
   */
  export type ChargingStopSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ChargingStopSnapshot to fetch.
     */
    where: ChargingStopSnapshotWhereUniqueInput
  }

  /**
   * ChargingStopSnapshot findUniqueOrThrow
   */
  export type ChargingStopSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ChargingStopSnapshot to fetch.
     */
    where: ChargingStopSnapshotWhereUniqueInput
  }

  /**
   * ChargingStopSnapshot findFirst
   */
  export type ChargingStopSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ChargingStopSnapshot to fetch.
     */
    where?: ChargingStopSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChargingStopSnapshots to fetch.
     */
    orderBy?: ChargingStopSnapshotOrderByWithRelationInput | ChargingStopSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChargingStopSnapshots.
     */
    cursor?: ChargingStopSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChargingStopSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChargingStopSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChargingStopSnapshots.
     */
    distinct?: ChargingStopSnapshotScalarFieldEnum | ChargingStopSnapshotScalarFieldEnum[]
  }

  /**
   * ChargingStopSnapshot findFirstOrThrow
   */
  export type ChargingStopSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ChargingStopSnapshot to fetch.
     */
    where?: ChargingStopSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChargingStopSnapshots to fetch.
     */
    orderBy?: ChargingStopSnapshotOrderByWithRelationInput | ChargingStopSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChargingStopSnapshots.
     */
    cursor?: ChargingStopSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChargingStopSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChargingStopSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChargingStopSnapshots.
     */
    distinct?: ChargingStopSnapshotScalarFieldEnum | ChargingStopSnapshotScalarFieldEnum[]
  }

  /**
   * ChargingStopSnapshot findMany
   */
  export type ChargingStopSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which ChargingStopSnapshots to fetch.
     */
    where?: ChargingStopSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChargingStopSnapshots to fetch.
     */
    orderBy?: ChargingStopSnapshotOrderByWithRelationInput | ChargingStopSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChargingStopSnapshots.
     */
    cursor?: ChargingStopSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChargingStopSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChargingStopSnapshots.
     */
    skip?: number
    distinct?: ChargingStopSnapshotScalarFieldEnum | ChargingStopSnapshotScalarFieldEnum[]
  }

  /**
   * ChargingStopSnapshot create
   */
  export type ChargingStopSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a ChargingStopSnapshot.
     */
    data: XOR<ChargingStopSnapshotCreateInput, ChargingStopSnapshotUncheckedCreateInput>
  }

  /**
   * ChargingStopSnapshot createMany
   */
  export type ChargingStopSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChargingStopSnapshots.
     */
    data: ChargingStopSnapshotCreateManyInput | ChargingStopSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChargingStopSnapshot createManyAndReturn
   */
  export type ChargingStopSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ChargingStopSnapshots.
     */
    data: ChargingStopSnapshotCreateManyInput | ChargingStopSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChargingStopSnapshot update
   */
  export type ChargingStopSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a ChargingStopSnapshot.
     */
    data: XOR<ChargingStopSnapshotUpdateInput, ChargingStopSnapshotUncheckedUpdateInput>
    /**
     * Choose, which ChargingStopSnapshot to update.
     */
    where: ChargingStopSnapshotWhereUniqueInput
  }

  /**
   * ChargingStopSnapshot updateMany
   */
  export type ChargingStopSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChargingStopSnapshots.
     */
    data: XOR<ChargingStopSnapshotUpdateManyMutationInput, ChargingStopSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which ChargingStopSnapshots to update
     */
    where?: ChargingStopSnapshotWhereInput
  }

  /**
   * ChargingStopSnapshot upsert
   */
  export type ChargingStopSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the ChargingStopSnapshot to update in case it exists.
     */
    where: ChargingStopSnapshotWhereUniqueInput
    /**
     * In case the ChargingStopSnapshot found by the `where` argument doesn't exist, create a new ChargingStopSnapshot with this data.
     */
    create: XOR<ChargingStopSnapshotCreateInput, ChargingStopSnapshotUncheckedCreateInput>
    /**
     * In case the ChargingStopSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChargingStopSnapshotUpdateInput, ChargingStopSnapshotUncheckedUpdateInput>
  }

  /**
   * ChargingStopSnapshot delete
   */
  export type ChargingStopSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
    /**
     * Filter which ChargingStopSnapshot to delete.
     */
    where: ChargingStopSnapshotWhereUniqueInput
  }

  /**
   * ChargingStopSnapshot deleteMany
   */
  export type ChargingStopSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChargingStopSnapshots to delete
     */
    where?: ChargingStopSnapshotWhereInput
  }

  /**
   * ChargingStopSnapshot without action
   */
  export type ChargingStopSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChargingStopSnapshot
     */
    select?: ChargingStopSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChargingStopSnapshotInclude<ExtArgs> | null
  }


  /**
   * Model CreditLog
   */

  export type AggregateCreditLog = {
    _count: CreditLogCountAggregateOutputType | null
    _avg: CreditLogAvgAggregateOutputType | null
    _sum: CreditLogSumAggregateOutputType | null
    _min: CreditLogMinAggregateOutputType | null
    _max: CreditLogMaxAggregateOutputType | null
  }

  export type CreditLogAvgAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type CreditLogSumAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type CreditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    reason: string | null
    balanceAfter: number | null
    createdAt: Date | null
  }

  export type CreditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    reason: string | null
    balanceAfter: number | null
    createdAt: Date | null
  }

  export type CreditLogCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    reason: number
    balanceAfter: number
    createdAt: number
    _all: number
  }


  export type CreditLogAvgAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type CreditLogSumAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type CreditLogMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    reason?: true
    balanceAfter?: true
    createdAt?: true
  }

  export type CreditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    reason?: true
    balanceAfter?: true
    createdAt?: true
  }

  export type CreditLogCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    reason?: true
    balanceAfter?: true
    createdAt?: true
    _all?: true
  }

  export type CreditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditLog to aggregate.
     */
    where?: CreditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditLogs to fetch.
     */
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditLogs
    **/
    _count?: true | CreditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditLogMaxAggregateInputType
  }

  export type GetCreditLogAggregateType<T extends CreditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditLog[P]>
      : GetScalarType<T[P], AggregateCreditLog[P]>
  }




  export type CreditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditLogWhereInput
    orderBy?: CreditLogOrderByWithAggregationInput | CreditLogOrderByWithAggregationInput[]
    by: CreditLogScalarFieldEnum[] | CreditLogScalarFieldEnum
    having?: CreditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditLogCountAggregateInputType | true
    _avg?: CreditLogAvgAggregateInputType
    _sum?: CreditLogSumAggregateInputType
    _min?: CreditLogMinAggregateInputType
    _max?: CreditLogMaxAggregateInputType
  }

  export type CreditLogGroupByOutputType = {
    id: string
    userId: string
    amount: number
    reason: string
    balanceAfter: number
    createdAt: Date
    _count: CreditLogCountAggregateOutputType | null
    _avg: CreditLogAvgAggregateOutputType | null
    _sum: CreditLogSumAggregateOutputType | null
    _min: CreditLogMinAggregateOutputType | null
    _max: CreditLogMaxAggregateOutputType | null
  }

  type GetCreditLogGroupByPayload<T extends CreditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditLogGroupByOutputType[P]>
            : GetScalarType<T[P], CreditLogGroupByOutputType[P]>
        }
      >
    >


  export type CreditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    reason?: boolean
    balanceAfter?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditLog"]>

  export type CreditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    reason?: boolean
    balanceAfter?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditLog"]>

  export type CreditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    reason?: boolean
    balanceAfter?: boolean
    createdAt?: boolean
  }

  export type CreditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CreditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CreditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      reason: string
      balanceAfter: number
      createdAt: Date
    }, ExtArgs["result"]["creditLog"]>
    composites: {}
  }

  type CreditLogGetPayload<S extends boolean | null | undefined | CreditLogDefaultArgs> = $Result.GetResult<Prisma.$CreditLogPayload, S>

  type CreditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CreditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CreditLogCountAggregateInputType | true
    }

  export interface CreditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditLog'], meta: { name: 'CreditLog' } }
    /**
     * Find zero or one CreditLog that matches the filter.
     * @param {CreditLogFindUniqueArgs} args - Arguments to find a CreditLog
     * @example
     * // Get one CreditLog
     * const creditLog = await prisma.creditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditLogFindUniqueArgs>(args: SelectSubset<T, CreditLogFindUniqueArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CreditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CreditLogFindUniqueOrThrowArgs} args - Arguments to find a CreditLog
     * @example
     * // Get one CreditLog
     * const creditLog = await prisma.creditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CreditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogFindFirstArgs} args - Arguments to find a CreditLog
     * @example
     * // Get one CreditLog
     * const creditLog = await prisma.creditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditLogFindFirstArgs>(args?: SelectSubset<T, CreditLogFindFirstArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CreditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogFindFirstOrThrowArgs} args - Arguments to find a CreditLog
     * @example
     * // Get one CreditLog
     * const creditLog = await prisma.creditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CreditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditLogs
     * const creditLogs = await prisma.creditLog.findMany()
     * 
     * // Get first 10 CreditLogs
     * const creditLogs = await prisma.creditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditLogWithIdOnly = await prisma.creditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditLogFindManyArgs>(args?: SelectSubset<T, CreditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CreditLog.
     * @param {CreditLogCreateArgs} args - Arguments to create a CreditLog.
     * @example
     * // Create one CreditLog
     * const CreditLog = await prisma.creditLog.create({
     *   data: {
     *     // ... data to create a CreditLog
     *   }
     * })
     * 
     */
    create<T extends CreditLogCreateArgs>(args: SelectSubset<T, CreditLogCreateArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CreditLogs.
     * @param {CreditLogCreateManyArgs} args - Arguments to create many CreditLogs.
     * @example
     * // Create many CreditLogs
     * const creditLog = await prisma.creditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditLogCreateManyArgs>(args?: SelectSubset<T, CreditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditLogs and returns the data saved in the database.
     * @param {CreditLogCreateManyAndReturnArgs} args - Arguments to create many CreditLogs.
     * @example
     * // Create many CreditLogs
     * const creditLog = await prisma.creditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditLogs and only return the `id`
     * const creditLogWithIdOnly = await prisma.creditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CreditLog.
     * @param {CreditLogDeleteArgs} args - Arguments to delete one CreditLog.
     * @example
     * // Delete one CreditLog
     * const CreditLog = await prisma.creditLog.delete({
     *   where: {
     *     // ... filter to delete one CreditLog
     *   }
     * })
     * 
     */
    delete<T extends CreditLogDeleteArgs>(args: SelectSubset<T, CreditLogDeleteArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CreditLog.
     * @param {CreditLogUpdateArgs} args - Arguments to update one CreditLog.
     * @example
     * // Update one CreditLog
     * const creditLog = await prisma.creditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditLogUpdateArgs>(args: SelectSubset<T, CreditLogUpdateArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CreditLogs.
     * @param {CreditLogDeleteManyArgs} args - Arguments to filter CreditLogs to delete.
     * @example
     * // Delete a few CreditLogs
     * const { count } = await prisma.creditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditLogDeleteManyArgs>(args?: SelectSubset<T, CreditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditLogs
     * const creditLog = await prisma.creditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditLogUpdateManyArgs>(args: SelectSubset<T, CreditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CreditLog.
     * @param {CreditLogUpsertArgs} args - Arguments to update or create a CreditLog.
     * @example
     * // Update or create a CreditLog
     * const creditLog = await prisma.creditLog.upsert({
     *   create: {
     *     // ... data to create a CreditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditLog we want to update
     *   }
     * })
     */
    upsert<T extends CreditLogUpsertArgs>(args: SelectSubset<T, CreditLogUpsertArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CreditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogCountArgs} args - Arguments to filter CreditLogs to count.
     * @example
     * // Count the number of CreditLogs
     * const count = await prisma.creditLog.count({
     *   where: {
     *     // ... the filter for the CreditLogs we want to count
     *   }
     * })
    **/
    count<T extends CreditLogCountArgs>(
      args?: Subset<T, CreditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreditLogAggregateArgs>(args: Subset<T, CreditLogAggregateArgs>): Prisma.PrismaPromise<GetCreditLogAggregateType<T>>

    /**
     * Group by CreditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditLogGroupByArgs['orderBy'] }
        : { orderBy?: CreditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditLog model
   */
  readonly fields: CreditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreditLog model
   */ 
  interface CreditLogFieldRefs {
    readonly id: FieldRef<"CreditLog", 'String'>
    readonly userId: FieldRef<"CreditLog", 'String'>
    readonly amount: FieldRef<"CreditLog", 'Int'>
    readonly reason: FieldRef<"CreditLog", 'String'>
    readonly balanceAfter: FieldRef<"CreditLog", 'Int'>
    readonly createdAt: FieldRef<"CreditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditLog findUnique
   */
  export type CreditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLog to fetch.
     */
    where: CreditLogWhereUniqueInput
  }

  /**
   * CreditLog findUniqueOrThrow
   */
  export type CreditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLog to fetch.
     */
    where: CreditLogWhereUniqueInput
  }

  /**
   * CreditLog findFirst
   */
  export type CreditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLog to fetch.
     */
    where?: CreditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditLogs to fetch.
     */
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditLogs.
     */
    cursor?: CreditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditLogs.
     */
    distinct?: CreditLogScalarFieldEnum | CreditLogScalarFieldEnum[]
  }

  /**
   * CreditLog findFirstOrThrow
   */
  export type CreditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLog to fetch.
     */
    where?: CreditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditLogs to fetch.
     */
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditLogs.
     */
    cursor?: CreditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditLogs.
     */
    distinct?: CreditLogScalarFieldEnum | CreditLogScalarFieldEnum[]
  }

  /**
   * CreditLog findMany
   */
  export type CreditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLogs to fetch.
     */
    where?: CreditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditLogs to fetch.
     */
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditLogs.
     */
    cursor?: CreditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditLogs.
     */
    skip?: number
    distinct?: CreditLogScalarFieldEnum | CreditLogScalarFieldEnum[]
  }

  /**
   * CreditLog create
   */
  export type CreditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditLog.
     */
    data: XOR<CreditLogCreateInput, CreditLogUncheckedCreateInput>
  }

  /**
   * CreditLog createMany
   */
  export type CreditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditLogs.
     */
    data: CreditLogCreateManyInput | CreditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditLog createManyAndReturn
   */
  export type CreditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CreditLogs.
     */
    data: CreditLogCreateManyInput | CreditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditLog update
   */
  export type CreditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditLog.
     */
    data: XOR<CreditLogUpdateInput, CreditLogUncheckedUpdateInput>
    /**
     * Choose, which CreditLog to update.
     */
    where: CreditLogWhereUniqueInput
  }

  /**
   * CreditLog updateMany
   */
  export type CreditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditLogs.
     */
    data: XOR<CreditLogUpdateManyMutationInput, CreditLogUncheckedUpdateManyInput>
    /**
     * Filter which CreditLogs to update
     */
    where?: CreditLogWhereInput
  }

  /**
   * CreditLog upsert
   */
  export type CreditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditLog to update in case it exists.
     */
    where: CreditLogWhereUniqueInput
    /**
     * In case the CreditLog found by the `where` argument doesn't exist, create a new CreditLog with this data.
     */
    create: XOR<CreditLogCreateInput, CreditLogUncheckedCreateInput>
    /**
     * In case the CreditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditLogUpdateInput, CreditLogUncheckedUpdateInput>
  }

  /**
   * CreditLog delete
   */
  export type CreditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter which CreditLog to delete.
     */
    where: CreditLogWhereUniqueInput
  }

  /**
   * CreditLog deleteMany
   */
  export type CreditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditLogs to delete
     */
    where?: CreditLogWhereInput
  }

  /**
   * CreditLog without action
   */
  export type CreditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
  }


  /**
   * Model GeocodeCache
   */

  export type AggregateGeocodeCache = {
    _count: GeocodeCacheCountAggregateOutputType | null
    _avg: GeocodeCacheAvgAggregateOutputType | null
    _sum: GeocodeCacheSumAggregateOutputType | null
    _min: GeocodeCacheMinAggregateOutputType | null
    _max: GeocodeCacheMaxAggregateOutputType | null
  }

  export type GeocodeCacheAvgAggregateOutputType = {
    lat: number | null
    lon: number | null
  }

  export type GeocodeCacheSumAggregateOutputType = {
    lat: number | null
    lon: number | null
  }

  export type GeocodeCacheMinAggregateOutputType = {
    id: string | null
    query: string | null
    lat: number | null
    lon: number | null
    displayName: string | null
    source: string | null
    createdAt: Date | null
  }

  export type GeocodeCacheMaxAggregateOutputType = {
    id: string | null
    query: string | null
    lat: number | null
    lon: number | null
    displayName: string | null
    source: string | null
    createdAt: Date | null
  }

  export type GeocodeCacheCountAggregateOutputType = {
    id: number
    query: number
    lat: number
    lon: number
    displayName: number
    source: number
    createdAt: number
    _all: number
  }


  export type GeocodeCacheAvgAggregateInputType = {
    lat?: true
    lon?: true
  }

  export type GeocodeCacheSumAggregateInputType = {
    lat?: true
    lon?: true
  }

  export type GeocodeCacheMinAggregateInputType = {
    id?: true
    query?: true
    lat?: true
    lon?: true
    displayName?: true
    source?: true
    createdAt?: true
  }

  export type GeocodeCacheMaxAggregateInputType = {
    id?: true
    query?: true
    lat?: true
    lon?: true
    displayName?: true
    source?: true
    createdAt?: true
  }

  export type GeocodeCacheCountAggregateInputType = {
    id?: true
    query?: true
    lat?: true
    lon?: true
    displayName?: true
    source?: true
    createdAt?: true
    _all?: true
  }

  export type GeocodeCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeocodeCache to aggregate.
     */
    where?: GeocodeCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeocodeCaches to fetch.
     */
    orderBy?: GeocodeCacheOrderByWithRelationInput | GeocodeCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeocodeCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeocodeCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeocodeCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeocodeCaches
    **/
    _count?: true | GeocodeCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GeocodeCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GeocodeCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeocodeCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeocodeCacheMaxAggregateInputType
  }

  export type GetGeocodeCacheAggregateType<T extends GeocodeCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateGeocodeCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeocodeCache[P]>
      : GetScalarType<T[P], AggregateGeocodeCache[P]>
  }




  export type GeocodeCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeocodeCacheWhereInput
    orderBy?: GeocodeCacheOrderByWithAggregationInput | GeocodeCacheOrderByWithAggregationInput[]
    by: GeocodeCacheScalarFieldEnum[] | GeocodeCacheScalarFieldEnum
    having?: GeocodeCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeocodeCacheCountAggregateInputType | true
    _avg?: GeocodeCacheAvgAggregateInputType
    _sum?: GeocodeCacheSumAggregateInputType
    _min?: GeocodeCacheMinAggregateInputType
    _max?: GeocodeCacheMaxAggregateInputType
  }

  export type GeocodeCacheGroupByOutputType = {
    id: string
    query: string
    lat: number
    lon: number
    displayName: string
    source: string
    createdAt: Date
    _count: GeocodeCacheCountAggregateOutputType | null
    _avg: GeocodeCacheAvgAggregateOutputType | null
    _sum: GeocodeCacheSumAggregateOutputType | null
    _min: GeocodeCacheMinAggregateOutputType | null
    _max: GeocodeCacheMaxAggregateOutputType | null
  }

  type GetGeocodeCacheGroupByPayload<T extends GeocodeCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeocodeCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeocodeCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeocodeCacheGroupByOutputType[P]>
            : GetScalarType<T[P], GeocodeCacheGroupByOutputType[P]>
        }
      >
    >


  export type GeocodeCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    lat?: boolean
    lon?: boolean
    displayName?: boolean
    source?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["geocodeCache"]>

  export type GeocodeCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    lat?: boolean
    lon?: boolean
    displayName?: boolean
    source?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["geocodeCache"]>

  export type GeocodeCacheSelectScalar = {
    id?: boolean
    query?: boolean
    lat?: boolean
    lon?: boolean
    displayName?: boolean
    source?: boolean
    createdAt?: boolean
  }


  export type $GeocodeCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeocodeCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      query: string
      lat: number
      lon: number
      displayName: string
      source: string
      createdAt: Date
    }, ExtArgs["result"]["geocodeCache"]>
    composites: {}
  }

  type GeocodeCacheGetPayload<S extends boolean | null | undefined | GeocodeCacheDefaultArgs> = $Result.GetResult<Prisma.$GeocodeCachePayload, S>

  type GeocodeCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GeocodeCacheFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GeocodeCacheCountAggregateInputType | true
    }

  export interface GeocodeCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeocodeCache'], meta: { name: 'GeocodeCache' } }
    /**
     * Find zero or one GeocodeCache that matches the filter.
     * @param {GeocodeCacheFindUniqueArgs} args - Arguments to find a GeocodeCache
     * @example
     * // Get one GeocodeCache
     * const geocodeCache = await prisma.geocodeCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeocodeCacheFindUniqueArgs>(args: SelectSubset<T, GeocodeCacheFindUniqueArgs<ExtArgs>>): Prisma__GeocodeCacheClient<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GeocodeCache that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GeocodeCacheFindUniqueOrThrowArgs} args - Arguments to find a GeocodeCache
     * @example
     * // Get one GeocodeCache
     * const geocodeCache = await prisma.geocodeCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeocodeCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, GeocodeCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeocodeCacheClient<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GeocodeCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeocodeCacheFindFirstArgs} args - Arguments to find a GeocodeCache
     * @example
     * // Get one GeocodeCache
     * const geocodeCache = await prisma.geocodeCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeocodeCacheFindFirstArgs>(args?: SelectSubset<T, GeocodeCacheFindFirstArgs<ExtArgs>>): Prisma__GeocodeCacheClient<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GeocodeCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeocodeCacheFindFirstOrThrowArgs} args - Arguments to find a GeocodeCache
     * @example
     * // Get one GeocodeCache
     * const geocodeCache = await prisma.geocodeCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeocodeCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, GeocodeCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeocodeCacheClient<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GeocodeCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeocodeCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeocodeCaches
     * const geocodeCaches = await prisma.geocodeCache.findMany()
     * 
     * // Get first 10 GeocodeCaches
     * const geocodeCaches = await prisma.geocodeCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const geocodeCacheWithIdOnly = await prisma.geocodeCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeocodeCacheFindManyArgs>(args?: SelectSubset<T, GeocodeCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GeocodeCache.
     * @param {GeocodeCacheCreateArgs} args - Arguments to create a GeocodeCache.
     * @example
     * // Create one GeocodeCache
     * const GeocodeCache = await prisma.geocodeCache.create({
     *   data: {
     *     // ... data to create a GeocodeCache
     *   }
     * })
     * 
     */
    create<T extends GeocodeCacheCreateArgs>(args: SelectSubset<T, GeocodeCacheCreateArgs<ExtArgs>>): Prisma__GeocodeCacheClient<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GeocodeCaches.
     * @param {GeocodeCacheCreateManyArgs} args - Arguments to create many GeocodeCaches.
     * @example
     * // Create many GeocodeCaches
     * const geocodeCache = await prisma.geocodeCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeocodeCacheCreateManyArgs>(args?: SelectSubset<T, GeocodeCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeocodeCaches and returns the data saved in the database.
     * @param {GeocodeCacheCreateManyAndReturnArgs} args - Arguments to create many GeocodeCaches.
     * @example
     * // Create many GeocodeCaches
     * const geocodeCache = await prisma.geocodeCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeocodeCaches and only return the `id`
     * const geocodeCacheWithIdOnly = await prisma.geocodeCache.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeocodeCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, GeocodeCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GeocodeCache.
     * @param {GeocodeCacheDeleteArgs} args - Arguments to delete one GeocodeCache.
     * @example
     * // Delete one GeocodeCache
     * const GeocodeCache = await prisma.geocodeCache.delete({
     *   where: {
     *     // ... filter to delete one GeocodeCache
     *   }
     * })
     * 
     */
    delete<T extends GeocodeCacheDeleteArgs>(args: SelectSubset<T, GeocodeCacheDeleteArgs<ExtArgs>>): Prisma__GeocodeCacheClient<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GeocodeCache.
     * @param {GeocodeCacheUpdateArgs} args - Arguments to update one GeocodeCache.
     * @example
     * // Update one GeocodeCache
     * const geocodeCache = await prisma.geocodeCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeocodeCacheUpdateArgs>(args: SelectSubset<T, GeocodeCacheUpdateArgs<ExtArgs>>): Prisma__GeocodeCacheClient<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GeocodeCaches.
     * @param {GeocodeCacheDeleteManyArgs} args - Arguments to filter GeocodeCaches to delete.
     * @example
     * // Delete a few GeocodeCaches
     * const { count } = await prisma.geocodeCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeocodeCacheDeleteManyArgs>(args?: SelectSubset<T, GeocodeCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeocodeCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeocodeCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeocodeCaches
     * const geocodeCache = await prisma.geocodeCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeocodeCacheUpdateManyArgs>(args: SelectSubset<T, GeocodeCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GeocodeCache.
     * @param {GeocodeCacheUpsertArgs} args - Arguments to update or create a GeocodeCache.
     * @example
     * // Update or create a GeocodeCache
     * const geocodeCache = await prisma.geocodeCache.upsert({
     *   create: {
     *     // ... data to create a GeocodeCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeocodeCache we want to update
     *   }
     * })
     */
    upsert<T extends GeocodeCacheUpsertArgs>(args: SelectSubset<T, GeocodeCacheUpsertArgs<ExtArgs>>): Prisma__GeocodeCacheClient<$Result.GetResult<Prisma.$GeocodeCachePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GeocodeCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeocodeCacheCountArgs} args - Arguments to filter GeocodeCaches to count.
     * @example
     * // Count the number of GeocodeCaches
     * const count = await prisma.geocodeCache.count({
     *   where: {
     *     // ... the filter for the GeocodeCaches we want to count
     *   }
     * })
    **/
    count<T extends GeocodeCacheCountArgs>(
      args?: Subset<T, GeocodeCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeocodeCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeocodeCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeocodeCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeocodeCacheAggregateArgs>(args: Subset<T, GeocodeCacheAggregateArgs>): Prisma.PrismaPromise<GetGeocodeCacheAggregateType<T>>

    /**
     * Group by GeocodeCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeocodeCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GeocodeCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeocodeCacheGroupByArgs['orderBy'] }
        : { orderBy?: GeocodeCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GeocodeCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeocodeCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeocodeCache model
   */
  readonly fields: GeocodeCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeocodeCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeocodeCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeocodeCache model
   */ 
  interface GeocodeCacheFieldRefs {
    readonly id: FieldRef<"GeocodeCache", 'String'>
    readonly query: FieldRef<"GeocodeCache", 'String'>
    readonly lat: FieldRef<"GeocodeCache", 'Float'>
    readonly lon: FieldRef<"GeocodeCache", 'Float'>
    readonly displayName: FieldRef<"GeocodeCache", 'String'>
    readonly source: FieldRef<"GeocodeCache", 'String'>
    readonly createdAt: FieldRef<"GeocodeCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeocodeCache findUnique
   */
  export type GeocodeCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * Filter, which GeocodeCache to fetch.
     */
    where: GeocodeCacheWhereUniqueInput
  }

  /**
   * GeocodeCache findUniqueOrThrow
   */
  export type GeocodeCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * Filter, which GeocodeCache to fetch.
     */
    where: GeocodeCacheWhereUniqueInput
  }

  /**
   * GeocodeCache findFirst
   */
  export type GeocodeCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * Filter, which GeocodeCache to fetch.
     */
    where?: GeocodeCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeocodeCaches to fetch.
     */
    orderBy?: GeocodeCacheOrderByWithRelationInput | GeocodeCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeocodeCaches.
     */
    cursor?: GeocodeCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeocodeCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeocodeCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeocodeCaches.
     */
    distinct?: GeocodeCacheScalarFieldEnum | GeocodeCacheScalarFieldEnum[]
  }

  /**
   * GeocodeCache findFirstOrThrow
   */
  export type GeocodeCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * Filter, which GeocodeCache to fetch.
     */
    where?: GeocodeCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeocodeCaches to fetch.
     */
    orderBy?: GeocodeCacheOrderByWithRelationInput | GeocodeCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeocodeCaches.
     */
    cursor?: GeocodeCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeocodeCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeocodeCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeocodeCaches.
     */
    distinct?: GeocodeCacheScalarFieldEnum | GeocodeCacheScalarFieldEnum[]
  }

  /**
   * GeocodeCache findMany
   */
  export type GeocodeCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * Filter, which GeocodeCaches to fetch.
     */
    where?: GeocodeCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeocodeCaches to fetch.
     */
    orderBy?: GeocodeCacheOrderByWithRelationInput | GeocodeCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeocodeCaches.
     */
    cursor?: GeocodeCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeocodeCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeocodeCaches.
     */
    skip?: number
    distinct?: GeocodeCacheScalarFieldEnum | GeocodeCacheScalarFieldEnum[]
  }

  /**
   * GeocodeCache create
   */
  export type GeocodeCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * The data needed to create a GeocodeCache.
     */
    data: XOR<GeocodeCacheCreateInput, GeocodeCacheUncheckedCreateInput>
  }

  /**
   * GeocodeCache createMany
   */
  export type GeocodeCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeocodeCaches.
     */
    data: GeocodeCacheCreateManyInput | GeocodeCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeocodeCache createManyAndReturn
   */
  export type GeocodeCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GeocodeCaches.
     */
    data: GeocodeCacheCreateManyInput | GeocodeCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeocodeCache update
   */
  export type GeocodeCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * The data needed to update a GeocodeCache.
     */
    data: XOR<GeocodeCacheUpdateInput, GeocodeCacheUncheckedUpdateInput>
    /**
     * Choose, which GeocodeCache to update.
     */
    where: GeocodeCacheWhereUniqueInput
  }

  /**
   * GeocodeCache updateMany
   */
  export type GeocodeCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeocodeCaches.
     */
    data: XOR<GeocodeCacheUpdateManyMutationInput, GeocodeCacheUncheckedUpdateManyInput>
    /**
     * Filter which GeocodeCaches to update
     */
    where?: GeocodeCacheWhereInput
  }

  /**
   * GeocodeCache upsert
   */
  export type GeocodeCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * The filter to search for the GeocodeCache to update in case it exists.
     */
    where: GeocodeCacheWhereUniqueInput
    /**
     * In case the GeocodeCache found by the `where` argument doesn't exist, create a new GeocodeCache with this data.
     */
    create: XOR<GeocodeCacheCreateInput, GeocodeCacheUncheckedCreateInput>
    /**
     * In case the GeocodeCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeocodeCacheUpdateInput, GeocodeCacheUncheckedUpdateInput>
  }

  /**
   * GeocodeCache delete
   */
  export type GeocodeCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
    /**
     * Filter which GeocodeCache to delete.
     */
    where: GeocodeCacheWhereUniqueInput
  }

  /**
   * GeocodeCache deleteMany
   */
  export type GeocodeCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeocodeCaches to delete
     */
    where?: GeocodeCacheWhereInput
  }

  /**
   * GeocodeCache without action
   */
  export type GeocodeCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeocodeCache
     */
    select?: GeocodeCacheSelect<ExtArgs> | null
  }


  /**
   * Model StationSearchCache
   */

  export type AggregateStationSearchCache = {
    _count: StationSearchCacheCountAggregateOutputType | null
    _min: StationSearchCacheMinAggregateOutputType | null
    _max: StationSearchCacheMaxAggregateOutputType | null
  }

  export type StationSearchCacheMinAggregateOutputType = {
    id: string | null
    locality: string | null
    createdAt: Date | null
  }

  export type StationSearchCacheMaxAggregateOutputType = {
    id: string | null
    locality: string | null
    createdAt: Date | null
  }

  export type StationSearchCacheCountAggregateOutputType = {
    id: number
    locality: number
    data: number
    createdAt: number
    _all: number
  }


  export type StationSearchCacheMinAggregateInputType = {
    id?: true
    locality?: true
    createdAt?: true
  }

  export type StationSearchCacheMaxAggregateInputType = {
    id?: true
    locality?: true
    createdAt?: true
  }

  export type StationSearchCacheCountAggregateInputType = {
    id?: true
    locality?: true
    data?: true
    createdAt?: true
    _all?: true
  }

  export type StationSearchCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StationSearchCache to aggregate.
     */
    where?: StationSearchCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StationSearchCaches to fetch.
     */
    orderBy?: StationSearchCacheOrderByWithRelationInput | StationSearchCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StationSearchCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StationSearchCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StationSearchCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StationSearchCaches
    **/
    _count?: true | StationSearchCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StationSearchCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StationSearchCacheMaxAggregateInputType
  }

  export type GetStationSearchCacheAggregateType<T extends StationSearchCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateStationSearchCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStationSearchCache[P]>
      : GetScalarType<T[P], AggregateStationSearchCache[P]>
  }




  export type StationSearchCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StationSearchCacheWhereInput
    orderBy?: StationSearchCacheOrderByWithAggregationInput | StationSearchCacheOrderByWithAggregationInput[]
    by: StationSearchCacheScalarFieldEnum[] | StationSearchCacheScalarFieldEnum
    having?: StationSearchCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StationSearchCacheCountAggregateInputType | true
    _min?: StationSearchCacheMinAggregateInputType
    _max?: StationSearchCacheMaxAggregateInputType
  }

  export type StationSearchCacheGroupByOutputType = {
    id: string
    locality: string
    data: JsonValue
    createdAt: Date
    _count: StationSearchCacheCountAggregateOutputType | null
    _min: StationSearchCacheMinAggregateOutputType | null
    _max: StationSearchCacheMaxAggregateOutputType | null
  }

  type GetStationSearchCacheGroupByPayload<T extends StationSearchCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StationSearchCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StationSearchCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StationSearchCacheGroupByOutputType[P]>
            : GetScalarType<T[P], StationSearchCacheGroupByOutputType[P]>
        }
      >
    >


  export type StationSearchCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locality?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["stationSearchCache"]>

  export type StationSearchCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locality?: boolean
    data?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["stationSearchCache"]>

  export type StationSearchCacheSelectScalar = {
    id?: boolean
    locality?: boolean
    data?: boolean
    createdAt?: boolean
  }


  export type $StationSearchCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StationSearchCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      locality: string
      data: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["stationSearchCache"]>
    composites: {}
  }

  type StationSearchCacheGetPayload<S extends boolean | null | undefined | StationSearchCacheDefaultArgs> = $Result.GetResult<Prisma.$StationSearchCachePayload, S>

  type StationSearchCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StationSearchCacheFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StationSearchCacheCountAggregateInputType | true
    }

  export interface StationSearchCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StationSearchCache'], meta: { name: 'StationSearchCache' } }
    /**
     * Find zero or one StationSearchCache that matches the filter.
     * @param {StationSearchCacheFindUniqueArgs} args - Arguments to find a StationSearchCache
     * @example
     * // Get one StationSearchCache
     * const stationSearchCache = await prisma.stationSearchCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StationSearchCacheFindUniqueArgs>(args: SelectSubset<T, StationSearchCacheFindUniqueArgs<ExtArgs>>): Prisma__StationSearchCacheClient<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StationSearchCache that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StationSearchCacheFindUniqueOrThrowArgs} args - Arguments to find a StationSearchCache
     * @example
     * // Get one StationSearchCache
     * const stationSearchCache = await prisma.stationSearchCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StationSearchCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, StationSearchCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StationSearchCacheClient<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StationSearchCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationSearchCacheFindFirstArgs} args - Arguments to find a StationSearchCache
     * @example
     * // Get one StationSearchCache
     * const stationSearchCache = await prisma.stationSearchCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StationSearchCacheFindFirstArgs>(args?: SelectSubset<T, StationSearchCacheFindFirstArgs<ExtArgs>>): Prisma__StationSearchCacheClient<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StationSearchCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationSearchCacheFindFirstOrThrowArgs} args - Arguments to find a StationSearchCache
     * @example
     * // Get one StationSearchCache
     * const stationSearchCache = await prisma.stationSearchCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StationSearchCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, StationSearchCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__StationSearchCacheClient<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StationSearchCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationSearchCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StationSearchCaches
     * const stationSearchCaches = await prisma.stationSearchCache.findMany()
     * 
     * // Get first 10 StationSearchCaches
     * const stationSearchCaches = await prisma.stationSearchCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stationSearchCacheWithIdOnly = await prisma.stationSearchCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StationSearchCacheFindManyArgs>(args?: SelectSubset<T, StationSearchCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StationSearchCache.
     * @param {StationSearchCacheCreateArgs} args - Arguments to create a StationSearchCache.
     * @example
     * // Create one StationSearchCache
     * const StationSearchCache = await prisma.stationSearchCache.create({
     *   data: {
     *     // ... data to create a StationSearchCache
     *   }
     * })
     * 
     */
    create<T extends StationSearchCacheCreateArgs>(args: SelectSubset<T, StationSearchCacheCreateArgs<ExtArgs>>): Prisma__StationSearchCacheClient<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StationSearchCaches.
     * @param {StationSearchCacheCreateManyArgs} args - Arguments to create many StationSearchCaches.
     * @example
     * // Create many StationSearchCaches
     * const stationSearchCache = await prisma.stationSearchCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StationSearchCacheCreateManyArgs>(args?: SelectSubset<T, StationSearchCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StationSearchCaches and returns the data saved in the database.
     * @param {StationSearchCacheCreateManyAndReturnArgs} args - Arguments to create many StationSearchCaches.
     * @example
     * // Create many StationSearchCaches
     * const stationSearchCache = await prisma.stationSearchCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StationSearchCaches and only return the `id`
     * const stationSearchCacheWithIdOnly = await prisma.stationSearchCache.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StationSearchCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, StationSearchCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StationSearchCache.
     * @param {StationSearchCacheDeleteArgs} args - Arguments to delete one StationSearchCache.
     * @example
     * // Delete one StationSearchCache
     * const StationSearchCache = await prisma.stationSearchCache.delete({
     *   where: {
     *     // ... filter to delete one StationSearchCache
     *   }
     * })
     * 
     */
    delete<T extends StationSearchCacheDeleteArgs>(args: SelectSubset<T, StationSearchCacheDeleteArgs<ExtArgs>>): Prisma__StationSearchCacheClient<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StationSearchCache.
     * @param {StationSearchCacheUpdateArgs} args - Arguments to update one StationSearchCache.
     * @example
     * // Update one StationSearchCache
     * const stationSearchCache = await prisma.stationSearchCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StationSearchCacheUpdateArgs>(args: SelectSubset<T, StationSearchCacheUpdateArgs<ExtArgs>>): Prisma__StationSearchCacheClient<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StationSearchCaches.
     * @param {StationSearchCacheDeleteManyArgs} args - Arguments to filter StationSearchCaches to delete.
     * @example
     * // Delete a few StationSearchCaches
     * const { count } = await prisma.stationSearchCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StationSearchCacheDeleteManyArgs>(args?: SelectSubset<T, StationSearchCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StationSearchCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationSearchCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StationSearchCaches
     * const stationSearchCache = await prisma.stationSearchCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StationSearchCacheUpdateManyArgs>(args: SelectSubset<T, StationSearchCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StationSearchCache.
     * @param {StationSearchCacheUpsertArgs} args - Arguments to update or create a StationSearchCache.
     * @example
     * // Update or create a StationSearchCache
     * const stationSearchCache = await prisma.stationSearchCache.upsert({
     *   create: {
     *     // ... data to create a StationSearchCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StationSearchCache we want to update
     *   }
     * })
     */
    upsert<T extends StationSearchCacheUpsertArgs>(args: SelectSubset<T, StationSearchCacheUpsertArgs<ExtArgs>>): Prisma__StationSearchCacheClient<$Result.GetResult<Prisma.$StationSearchCachePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StationSearchCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationSearchCacheCountArgs} args - Arguments to filter StationSearchCaches to count.
     * @example
     * // Count the number of StationSearchCaches
     * const count = await prisma.stationSearchCache.count({
     *   where: {
     *     // ... the filter for the StationSearchCaches we want to count
     *   }
     * })
    **/
    count<T extends StationSearchCacheCountArgs>(
      args?: Subset<T, StationSearchCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StationSearchCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StationSearchCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationSearchCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StationSearchCacheAggregateArgs>(args: Subset<T, StationSearchCacheAggregateArgs>): Prisma.PrismaPromise<GetStationSearchCacheAggregateType<T>>

    /**
     * Group by StationSearchCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StationSearchCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StationSearchCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StationSearchCacheGroupByArgs['orderBy'] }
        : { orderBy?: StationSearchCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StationSearchCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStationSearchCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StationSearchCache model
   */
  readonly fields: StationSearchCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StationSearchCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StationSearchCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StationSearchCache model
   */ 
  interface StationSearchCacheFieldRefs {
    readonly id: FieldRef<"StationSearchCache", 'String'>
    readonly locality: FieldRef<"StationSearchCache", 'String'>
    readonly data: FieldRef<"StationSearchCache", 'Json'>
    readonly createdAt: FieldRef<"StationSearchCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StationSearchCache findUnique
   */
  export type StationSearchCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * Filter, which StationSearchCache to fetch.
     */
    where: StationSearchCacheWhereUniqueInput
  }

  /**
   * StationSearchCache findUniqueOrThrow
   */
  export type StationSearchCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * Filter, which StationSearchCache to fetch.
     */
    where: StationSearchCacheWhereUniqueInput
  }

  /**
   * StationSearchCache findFirst
   */
  export type StationSearchCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * Filter, which StationSearchCache to fetch.
     */
    where?: StationSearchCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StationSearchCaches to fetch.
     */
    orderBy?: StationSearchCacheOrderByWithRelationInput | StationSearchCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StationSearchCaches.
     */
    cursor?: StationSearchCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StationSearchCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StationSearchCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StationSearchCaches.
     */
    distinct?: StationSearchCacheScalarFieldEnum | StationSearchCacheScalarFieldEnum[]
  }

  /**
   * StationSearchCache findFirstOrThrow
   */
  export type StationSearchCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * Filter, which StationSearchCache to fetch.
     */
    where?: StationSearchCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StationSearchCaches to fetch.
     */
    orderBy?: StationSearchCacheOrderByWithRelationInput | StationSearchCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StationSearchCaches.
     */
    cursor?: StationSearchCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StationSearchCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StationSearchCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StationSearchCaches.
     */
    distinct?: StationSearchCacheScalarFieldEnum | StationSearchCacheScalarFieldEnum[]
  }

  /**
   * StationSearchCache findMany
   */
  export type StationSearchCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * Filter, which StationSearchCaches to fetch.
     */
    where?: StationSearchCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StationSearchCaches to fetch.
     */
    orderBy?: StationSearchCacheOrderByWithRelationInput | StationSearchCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StationSearchCaches.
     */
    cursor?: StationSearchCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StationSearchCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StationSearchCaches.
     */
    skip?: number
    distinct?: StationSearchCacheScalarFieldEnum | StationSearchCacheScalarFieldEnum[]
  }

  /**
   * StationSearchCache create
   */
  export type StationSearchCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * The data needed to create a StationSearchCache.
     */
    data: XOR<StationSearchCacheCreateInput, StationSearchCacheUncheckedCreateInput>
  }

  /**
   * StationSearchCache createMany
   */
  export type StationSearchCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StationSearchCaches.
     */
    data: StationSearchCacheCreateManyInput | StationSearchCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StationSearchCache createManyAndReturn
   */
  export type StationSearchCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StationSearchCaches.
     */
    data: StationSearchCacheCreateManyInput | StationSearchCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StationSearchCache update
   */
  export type StationSearchCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * The data needed to update a StationSearchCache.
     */
    data: XOR<StationSearchCacheUpdateInput, StationSearchCacheUncheckedUpdateInput>
    /**
     * Choose, which StationSearchCache to update.
     */
    where: StationSearchCacheWhereUniqueInput
  }

  /**
   * StationSearchCache updateMany
   */
  export type StationSearchCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StationSearchCaches.
     */
    data: XOR<StationSearchCacheUpdateManyMutationInput, StationSearchCacheUncheckedUpdateManyInput>
    /**
     * Filter which StationSearchCaches to update
     */
    where?: StationSearchCacheWhereInput
  }

  /**
   * StationSearchCache upsert
   */
  export type StationSearchCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * The filter to search for the StationSearchCache to update in case it exists.
     */
    where: StationSearchCacheWhereUniqueInput
    /**
     * In case the StationSearchCache found by the `where` argument doesn't exist, create a new StationSearchCache with this data.
     */
    create: XOR<StationSearchCacheCreateInput, StationSearchCacheUncheckedCreateInput>
    /**
     * In case the StationSearchCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StationSearchCacheUpdateInput, StationSearchCacheUncheckedUpdateInput>
  }

  /**
   * StationSearchCache delete
   */
  export type StationSearchCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
    /**
     * Filter which StationSearchCache to delete.
     */
    where: StationSearchCacheWhereUniqueInput
  }

  /**
   * StationSearchCache deleteMany
   */
  export type StationSearchCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StationSearchCaches to delete
     */
    where?: StationSearchCacheWhereInput
  }

  /**
   * StationSearchCache without action
   */
  export type StationSearchCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StationSearchCache
     */
    select?: StationSearchCacheSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    credits: 'credits',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    label: 'label',
    rangeKm: 'rangeKm',
    isPreset: 'isPreset',
    isDefault: 'isDefault',
    createdAt: 'createdAt'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const SavedRouteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    originName: 'originName',
    originLat: 'originLat',
    originLon: 'originLon',
    destName: 'destName',
    destLat: 'destLat',
    destLon: 'destLon',
    batteryPercent: 'batteryPercent',
    vehicleRangeKm: 'vehicleRangeKm',
    distanceKm: 'distanceKm',
    durationMin: 'durationMin',
    elevationGainM: 'elevationGainM',
    weatherTemp: 'weatherTemp',
    weatherWind: 'weatherWind',
    weatherRain: 'weatherRain',
    weatherFactor: 'weatherFactor',
    weatherLabel: 'weatherLabel',
    totalBatteryUsed: 'totalBatteryUsed',
    remainingBattery: 'remainingBattery',
    effectiveRange: 'effectiveRange',
    willReachDestination: 'willReachDestination',
    safetyBuffer: 'safetyBuffer',
    aiSummary: 'aiSummary',
    aiVerdict: 'aiVerdict',
    aiChargingAdvice: 'aiChargingAdvice',
    aiOptimalSpeed: 'aiOptimalSpeed',
    aiRiskLevel: 'aiRiskLevel',
    createdAt: 'createdAt'
  };

  export type SavedRouteScalarFieldEnum = (typeof SavedRouteScalarFieldEnum)[keyof typeof SavedRouteScalarFieldEnum]


  export const ChargingStopSnapshotScalarFieldEnum: {
    id: 'id',
    savedRouteId: 'savedRouteId',
    externalId: 'externalId',
    name: 'name',
    address: 'address',
    lat: 'lat',
    lon: 'lon',
    connectors: 'connectors',
    fastCharge: 'fastCharge',
    powerKw: 'powerKw',
    network: 'network',
    source: 'source',
    batteryAtPoint: 'batteryAtPoint',
    isNeeded: 'isNeeded',
    isCritical: 'isCritical',
    routeFraction: 'routeFraction'
  };

  export type ChargingStopSnapshotScalarFieldEnum = (typeof ChargingStopSnapshotScalarFieldEnum)[keyof typeof ChargingStopSnapshotScalarFieldEnum]


  export const CreditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    reason: 'reason',
    balanceAfter: 'balanceAfter',
    createdAt: 'createdAt'
  };

  export type CreditLogScalarFieldEnum = (typeof CreditLogScalarFieldEnum)[keyof typeof CreditLogScalarFieldEnum]


  export const GeocodeCacheScalarFieldEnum: {
    id: 'id',
    query: 'query',
    lat: 'lat',
    lon: 'lon',
    displayName: 'displayName',
    source: 'source',
    createdAt: 'createdAt'
  };

  export type GeocodeCacheScalarFieldEnum = (typeof GeocodeCacheScalarFieldEnum)[keyof typeof GeocodeCacheScalarFieldEnum]


  export const StationSearchCacheScalarFieldEnum: {
    id: 'id',
    locality: 'locality',
    data: 'data',
    createdAt: 'createdAt'
  };

  export type StationSearchCacheScalarFieldEnum = (typeof StationSearchCacheScalarFieldEnum)[keyof typeof StationSearchCacheScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    credits?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    vehicles?: VehicleListRelationFilter
    savedRoutes?: SavedRouteListRelationFilter
    creditLogs?: CreditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    vehicles?: VehicleOrderByRelationAggregateInput
    savedRoutes?: SavedRouteOrderByRelationAggregateInput
    creditLogs?: CreditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    credits?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    vehicles?: VehicleListRelationFilter
    savedRoutes?: SavedRouteListRelationFilter
    creditLogs?: CreditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    credits?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    userId?: StringFilter<"Vehicle"> | string
    label?: StringFilter<"Vehicle"> | string
    rangeKm?: IntFilter<"Vehicle"> | number
    isPreset?: BoolFilter<"Vehicle"> | boolean
    isDefault?: BoolFilter<"Vehicle"> | boolean
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    rangeKm?: SortOrder
    isPreset?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    userId?: StringFilter<"Vehicle"> | string
    label?: StringFilter<"Vehicle"> | string
    rangeKm?: IntFilter<"Vehicle"> | number
    isPreset?: BoolFilter<"Vehicle"> | boolean
    isDefault?: BoolFilter<"Vehicle"> | boolean
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    rangeKm?: SortOrder
    isPreset?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    userId?: StringWithAggregatesFilter<"Vehicle"> | string
    label?: StringWithAggregatesFilter<"Vehicle"> | string
    rangeKm?: IntWithAggregatesFilter<"Vehicle"> | number
    isPreset?: BoolWithAggregatesFilter<"Vehicle"> | boolean
    isDefault?: BoolWithAggregatesFilter<"Vehicle"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Vehicle"> | Date | string
  }

  export type SavedRouteWhereInput = {
    AND?: SavedRouteWhereInput | SavedRouteWhereInput[]
    OR?: SavedRouteWhereInput[]
    NOT?: SavedRouteWhereInput | SavedRouteWhereInput[]
    id?: StringFilter<"SavedRoute"> | string
    userId?: StringFilter<"SavedRoute"> | string
    originName?: StringFilter<"SavedRoute"> | string
    originLat?: FloatFilter<"SavedRoute"> | number
    originLon?: FloatFilter<"SavedRoute"> | number
    destName?: StringFilter<"SavedRoute"> | string
    destLat?: FloatFilter<"SavedRoute"> | number
    destLon?: FloatFilter<"SavedRoute"> | number
    batteryPercent?: IntFilter<"SavedRoute"> | number
    vehicleRangeKm?: IntFilter<"SavedRoute"> | number
    distanceKm?: FloatFilter<"SavedRoute"> | number
    durationMin?: FloatFilter<"SavedRoute"> | number
    elevationGainM?: FloatFilter<"SavedRoute"> | number
    weatherTemp?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherWind?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherRain?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherFactor?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherLabel?: StringNullableFilter<"SavedRoute"> | string | null
    totalBatteryUsed?: FloatFilter<"SavedRoute"> | number
    remainingBattery?: FloatFilter<"SavedRoute"> | number
    effectiveRange?: IntFilter<"SavedRoute"> | number
    willReachDestination?: BoolFilter<"SavedRoute"> | boolean
    safetyBuffer?: IntFilter<"SavedRoute"> | number
    aiSummary?: StringNullableFilter<"SavedRoute"> | string | null
    aiVerdict?: StringNullableFilter<"SavedRoute"> | string | null
    aiChargingAdvice?: StringNullableFilter<"SavedRoute"> | string | null
    aiOptimalSpeed?: IntNullableFilter<"SavedRoute"> | number | null
    aiRiskLevel?: StringNullableFilter<"SavedRoute"> | string | null
    createdAt?: DateTimeFilter<"SavedRoute"> | Date | string
    chargingStations?: ChargingStopSnapshotListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SavedRouteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    originName?: SortOrder
    originLat?: SortOrder
    originLon?: SortOrder
    destName?: SortOrder
    destLat?: SortOrder
    destLon?: SortOrder
    batteryPercent?: SortOrder
    vehicleRangeKm?: SortOrder
    distanceKm?: SortOrder
    durationMin?: SortOrder
    elevationGainM?: SortOrder
    weatherTemp?: SortOrderInput | SortOrder
    weatherWind?: SortOrderInput | SortOrder
    weatherRain?: SortOrderInput | SortOrder
    weatherFactor?: SortOrderInput | SortOrder
    weatherLabel?: SortOrderInput | SortOrder
    totalBatteryUsed?: SortOrder
    remainingBattery?: SortOrder
    effectiveRange?: SortOrder
    willReachDestination?: SortOrder
    safetyBuffer?: SortOrder
    aiSummary?: SortOrderInput | SortOrder
    aiVerdict?: SortOrderInput | SortOrder
    aiChargingAdvice?: SortOrderInput | SortOrder
    aiOptimalSpeed?: SortOrderInput | SortOrder
    aiRiskLevel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    chargingStations?: ChargingStopSnapshotOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type SavedRouteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SavedRouteWhereInput | SavedRouteWhereInput[]
    OR?: SavedRouteWhereInput[]
    NOT?: SavedRouteWhereInput | SavedRouteWhereInput[]
    userId?: StringFilter<"SavedRoute"> | string
    originName?: StringFilter<"SavedRoute"> | string
    originLat?: FloatFilter<"SavedRoute"> | number
    originLon?: FloatFilter<"SavedRoute"> | number
    destName?: StringFilter<"SavedRoute"> | string
    destLat?: FloatFilter<"SavedRoute"> | number
    destLon?: FloatFilter<"SavedRoute"> | number
    batteryPercent?: IntFilter<"SavedRoute"> | number
    vehicleRangeKm?: IntFilter<"SavedRoute"> | number
    distanceKm?: FloatFilter<"SavedRoute"> | number
    durationMin?: FloatFilter<"SavedRoute"> | number
    elevationGainM?: FloatFilter<"SavedRoute"> | number
    weatherTemp?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherWind?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherRain?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherFactor?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherLabel?: StringNullableFilter<"SavedRoute"> | string | null
    totalBatteryUsed?: FloatFilter<"SavedRoute"> | number
    remainingBattery?: FloatFilter<"SavedRoute"> | number
    effectiveRange?: IntFilter<"SavedRoute"> | number
    willReachDestination?: BoolFilter<"SavedRoute"> | boolean
    safetyBuffer?: IntFilter<"SavedRoute"> | number
    aiSummary?: StringNullableFilter<"SavedRoute"> | string | null
    aiVerdict?: StringNullableFilter<"SavedRoute"> | string | null
    aiChargingAdvice?: StringNullableFilter<"SavedRoute"> | string | null
    aiOptimalSpeed?: IntNullableFilter<"SavedRoute"> | number | null
    aiRiskLevel?: StringNullableFilter<"SavedRoute"> | string | null
    createdAt?: DateTimeFilter<"SavedRoute"> | Date | string
    chargingStations?: ChargingStopSnapshotListRelationFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type SavedRouteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    originName?: SortOrder
    originLat?: SortOrder
    originLon?: SortOrder
    destName?: SortOrder
    destLat?: SortOrder
    destLon?: SortOrder
    batteryPercent?: SortOrder
    vehicleRangeKm?: SortOrder
    distanceKm?: SortOrder
    durationMin?: SortOrder
    elevationGainM?: SortOrder
    weatherTemp?: SortOrderInput | SortOrder
    weatherWind?: SortOrderInput | SortOrder
    weatherRain?: SortOrderInput | SortOrder
    weatherFactor?: SortOrderInput | SortOrder
    weatherLabel?: SortOrderInput | SortOrder
    totalBatteryUsed?: SortOrder
    remainingBattery?: SortOrder
    effectiveRange?: SortOrder
    willReachDestination?: SortOrder
    safetyBuffer?: SortOrder
    aiSummary?: SortOrderInput | SortOrder
    aiVerdict?: SortOrderInput | SortOrder
    aiChargingAdvice?: SortOrderInput | SortOrder
    aiOptimalSpeed?: SortOrderInput | SortOrder
    aiRiskLevel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SavedRouteCountOrderByAggregateInput
    _avg?: SavedRouteAvgOrderByAggregateInput
    _max?: SavedRouteMaxOrderByAggregateInput
    _min?: SavedRouteMinOrderByAggregateInput
    _sum?: SavedRouteSumOrderByAggregateInput
  }

  export type SavedRouteScalarWhereWithAggregatesInput = {
    AND?: SavedRouteScalarWhereWithAggregatesInput | SavedRouteScalarWhereWithAggregatesInput[]
    OR?: SavedRouteScalarWhereWithAggregatesInput[]
    NOT?: SavedRouteScalarWhereWithAggregatesInput | SavedRouteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SavedRoute"> | string
    userId?: StringWithAggregatesFilter<"SavedRoute"> | string
    originName?: StringWithAggregatesFilter<"SavedRoute"> | string
    originLat?: FloatWithAggregatesFilter<"SavedRoute"> | number
    originLon?: FloatWithAggregatesFilter<"SavedRoute"> | number
    destName?: StringWithAggregatesFilter<"SavedRoute"> | string
    destLat?: FloatWithAggregatesFilter<"SavedRoute"> | number
    destLon?: FloatWithAggregatesFilter<"SavedRoute"> | number
    batteryPercent?: IntWithAggregatesFilter<"SavedRoute"> | number
    vehicleRangeKm?: IntWithAggregatesFilter<"SavedRoute"> | number
    distanceKm?: FloatWithAggregatesFilter<"SavedRoute"> | number
    durationMin?: FloatWithAggregatesFilter<"SavedRoute"> | number
    elevationGainM?: FloatWithAggregatesFilter<"SavedRoute"> | number
    weatherTemp?: FloatNullableWithAggregatesFilter<"SavedRoute"> | number | null
    weatherWind?: FloatNullableWithAggregatesFilter<"SavedRoute"> | number | null
    weatherRain?: FloatNullableWithAggregatesFilter<"SavedRoute"> | number | null
    weatherFactor?: FloatNullableWithAggregatesFilter<"SavedRoute"> | number | null
    weatherLabel?: StringNullableWithAggregatesFilter<"SavedRoute"> | string | null
    totalBatteryUsed?: FloatWithAggregatesFilter<"SavedRoute"> | number
    remainingBattery?: FloatWithAggregatesFilter<"SavedRoute"> | number
    effectiveRange?: IntWithAggregatesFilter<"SavedRoute"> | number
    willReachDestination?: BoolWithAggregatesFilter<"SavedRoute"> | boolean
    safetyBuffer?: IntWithAggregatesFilter<"SavedRoute"> | number
    aiSummary?: StringNullableWithAggregatesFilter<"SavedRoute"> | string | null
    aiVerdict?: StringNullableWithAggregatesFilter<"SavedRoute"> | string | null
    aiChargingAdvice?: StringNullableWithAggregatesFilter<"SavedRoute"> | string | null
    aiOptimalSpeed?: IntNullableWithAggregatesFilter<"SavedRoute"> | number | null
    aiRiskLevel?: StringNullableWithAggregatesFilter<"SavedRoute"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SavedRoute"> | Date | string
  }

  export type ChargingStopSnapshotWhereInput = {
    AND?: ChargingStopSnapshotWhereInput | ChargingStopSnapshotWhereInput[]
    OR?: ChargingStopSnapshotWhereInput[]
    NOT?: ChargingStopSnapshotWhereInput | ChargingStopSnapshotWhereInput[]
    id?: StringFilter<"ChargingStopSnapshot"> | string
    savedRouteId?: StringFilter<"ChargingStopSnapshot"> | string
    externalId?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    name?: StringFilter<"ChargingStopSnapshot"> | string
    address?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    lat?: FloatFilter<"ChargingStopSnapshot"> | number
    lon?: FloatFilter<"ChargingStopSnapshot"> | number
    connectors?: IntFilter<"ChargingStopSnapshot"> | number
    fastCharge?: BoolFilter<"ChargingStopSnapshot"> | boolean
    powerKw?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
    network?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    source?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    batteryAtPoint?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
    isNeeded?: BoolFilter<"ChargingStopSnapshot"> | boolean
    isCritical?: BoolFilter<"ChargingStopSnapshot"> | boolean
    routeFraction?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
    savedRoute?: XOR<SavedRouteRelationFilter, SavedRouteWhereInput>
  }

  export type ChargingStopSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    savedRouteId?: SortOrder
    externalId?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    lat?: SortOrder
    lon?: SortOrder
    connectors?: SortOrder
    fastCharge?: SortOrder
    powerKw?: SortOrderInput | SortOrder
    network?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    batteryAtPoint?: SortOrderInput | SortOrder
    isNeeded?: SortOrder
    isCritical?: SortOrder
    routeFraction?: SortOrderInput | SortOrder
    savedRoute?: SavedRouteOrderByWithRelationInput
  }

  export type ChargingStopSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChargingStopSnapshotWhereInput | ChargingStopSnapshotWhereInput[]
    OR?: ChargingStopSnapshotWhereInput[]
    NOT?: ChargingStopSnapshotWhereInput | ChargingStopSnapshotWhereInput[]
    savedRouteId?: StringFilter<"ChargingStopSnapshot"> | string
    externalId?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    name?: StringFilter<"ChargingStopSnapshot"> | string
    address?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    lat?: FloatFilter<"ChargingStopSnapshot"> | number
    lon?: FloatFilter<"ChargingStopSnapshot"> | number
    connectors?: IntFilter<"ChargingStopSnapshot"> | number
    fastCharge?: BoolFilter<"ChargingStopSnapshot"> | boolean
    powerKw?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
    network?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    source?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    batteryAtPoint?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
    isNeeded?: BoolFilter<"ChargingStopSnapshot"> | boolean
    isCritical?: BoolFilter<"ChargingStopSnapshot"> | boolean
    routeFraction?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
    savedRoute?: XOR<SavedRouteRelationFilter, SavedRouteWhereInput>
  }, "id">

  export type ChargingStopSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    savedRouteId?: SortOrder
    externalId?: SortOrderInput | SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    lat?: SortOrder
    lon?: SortOrder
    connectors?: SortOrder
    fastCharge?: SortOrder
    powerKw?: SortOrderInput | SortOrder
    network?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    batteryAtPoint?: SortOrderInput | SortOrder
    isNeeded?: SortOrder
    isCritical?: SortOrder
    routeFraction?: SortOrderInput | SortOrder
    _count?: ChargingStopSnapshotCountOrderByAggregateInput
    _avg?: ChargingStopSnapshotAvgOrderByAggregateInput
    _max?: ChargingStopSnapshotMaxOrderByAggregateInput
    _min?: ChargingStopSnapshotMinOrderByAggregateInput
    _sum?: ChargingStopSnapshotSumOrderByAggregateInput
  }

  export type ChargingStopSnapshotScalarWhereWithAggregatesInput = {
    AND?: ChargingStopSnapshotScalarWhereWithAggregatesInput | ChargingStopSnapshotScalarWhereWithAggregatesInput[]
    OR?: ChargingStopSnapshotScalarWhereWithAggregatesInput[]
    NOT?: ChargingStopSnapshotScalarWhereWithAggregatesInput | ChargingStopSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChargingStopSnapshot"> | string
    savedRouteId?: StringWithAggregatesFilter<"ChargingStopSnapshot"> | string
    externalId?: StringNullableWithAggregatesFilter<"ChargingStopSnapshot"> | string | null
    name?: StringWithAggregatesFilter<"ChargingStopSnapshot"> | string
    address?: StringNullableWithAggregatesFilter<"ChargingStopSnapshot"> | string | null
    lat?: FloatWithAggregatesFilter<"ChargingStopSnapshot"> | number
    lon?: FloatWithAggregatesFilter<"ChargingStopSnapshot"> | number
    connectors?: IntWithAggregatesFilter<"ChargingStopSnapshot"> | number
    fastCharge?: BoolWithAggregatesFilter<"ChargingStopSnapshot"> | boolean
    powerKw?: FloatNullableWithAggregatesFilter<"ChargingStopSnapshot"> | number | null
    network?: StringNullableWithAggregatesFilter<"ChargingStopSnapshot"> | string | null
    source?: StringNullableWithAggregatesFilter<"ChargingStopSnapshot"> | string | null
    batteryAtPoint?: FloatNullableWithAggregatesFilter<"ChargingStopSnapshot"> | number | null
    isNeeded?: BoolWithAggregatesFilter<"ChargingStopSnapshot"> | boolean
    isCritical?: BoolWithAggregatesFilter<"ChargingStopSnapshot"> | boolean
    routeFraction?: FloatNullableWithAggregatesFilter<"ChargingStopSnapshot"> | number | null
  }

  export type CreditLogWhereInput = {
    AND?: CreditLogWhereInput | CreditLogWhereInput[]
    OR?: CreditLogWhereInput[]
    NOT?: CreditLogWhereInput | CreditLogWhereInput[]
    id?: StringFilter<"CreditLog"> | string
    userId?: StringFilter<"CreditLog"> | string
    amount?: IntFilter<"CreditLog"> | number
    reason?: StringFilter<"CreditLog"> | string
    balanceAfter?: IntFilter<"CreditLog"> | number
    createdAt?: DateTimeFilter<"CreditLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type CreditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CreditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreditLogWhereInput | CreditLogWhereInput[]
    OR?: CreditLogWhereInput[]
    NOT?: CreditLogWhereInput | CreditLogWhereInput[]
    userId?: StringFilter<"CreditLog"> | string
    amount?: IntFilter<"CreditLog"> | number
    reason?: StringFilter<"CreditLog"> | string
    balanceAfter?: IntFilter<"CreditLog"> | number
    createdAt?: DateTimeFilter<"CreditLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type CreditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
    _count?: CreditLogCountOrderByAggregateInput
    _avg?: CreditLogAvgOrderByAggregateInput
    _max?: CreditLogMaxOrderByAggregateInput
    _min?: CreditLogMinOrderByAggregateInput
    _sum?: CreditLogSumOrderByAggregateInput
  }

  export type CreditLogScalarWhereWithAggregatesInput = {
    AND?: CreditLogScalarWhereWithAggregatesInput | CreditLogScalarWhereWithAggregatesInput[]
    OR?: CreditLogScalarWhereWithAggregatesInput[]
    NOT?: CreditLogScalarWhereWithAggregatesInput | CreditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditLog"> | string
    userId?: StringWithAggregatesFilter<"CreditLog"> | string
    amount?: IntWithAggregatesFilter<"CreditLog"> | number
    reason?: StringWithAggregatesFilter<"CreditLog"> | string
    balanceAfter?: IntWithAggregatesFilter<"CreditLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CreditLog"> | Date | string
  }

  export type GeocodeCacheWhereInput = {
    AND?: GeocodeCacheWhereInput | GeocodeCacheWhereInput[]
    OR?: GeocodeCacheWhereInput[]
    NOT?: GeocodeCacheWhereInput | GeocodeCacheWhereInput[]
    id?: StringFilter<"GeocodeCache"> | string
    query?: StringFilter<"GeocodeCache"> | string
    lat?: FloatFilter<"GeocodeCache"> | number
    lon?: FloatFilter<"GeocodeCache"> | number
    displayName?: StringFilter<"GeocodeCache"> | string
    source?: StringFilter<"GeocodeCache"> | string
    createdAt?: DateTimeFilter<"GeocodeCache"> | Date | string
  }

  export type GeocodeCacheOrderByWithRelationInput = {
    id?: SortOrder
    query?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    displayName?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type GeocodeCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    query?: string
    AND?: GeocodeCacheWhereInput | GeocodeCacheWhereInput[]
    OR?: GeocodeCacheWhereInput[]
    NOT?: GeocodeCacheWhereInput | GeocodeCacheWhereInput[]
    lat?: FloatFilter<"GeocodeCache"> | number
    lon?: FloatFilter<"GeocodeCache"> | number
    displayName?: StringFilter<"GeocodeCache"> | string
    source?: StringFilter<"GeocodeCache"> | string
    createdAt?: DateTimeFilter<"GeocodeCache"> | Date | string
  }, "id" | "query">

  export type GeocodeCacheOrderByWithAggregationInput = {
    id?: SortOrder
    query?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    displayName?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    _count?: GeocodeCacheCountOrderByAggregateInput
    _avg?: GeocodeCacheAvgOrderByAggregateInput
    _max?: GeocodeCacheMaxOrderByAggregateInput
    _min?: GeocodeCacheMinOrderByAggregateInput
    _sum?: GeocodeCacheSumOrderByAggregateInput
  }

  export type GeocodeCacheScalarWhereWithAggregatesInput = {
    AND?: GeocodeCacheScalarWhereWithAggregatesInput | GeocodeCacheScalarWhereWithAggregatesInput[]
    OR?: GeocodeCacheScalarWhereWithAggregatesInput[]
    NOT?: GeocodeCacheScalarWhereWithAggregatesInput | GeocodeCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GeocodeCache"> | string
    query?: StringWithAggregatesFilter<"GeocodeCache"> | string
    lat?: FloatWithAggregatesFilter<"GeocodeCache"> | number
    lon?: FloatWithAggregatesFilter<"GeocodeCache"> | number
    displayName?: StringWithAggregatesFilter<"GeocodeCache"> | string
    source?: StringWithAggregatesFilter<"GeocodeCache"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GeocodeCache"> | Date | string
  }

  export type StationSearchCacheWhereInput = {
    AND?: StationSearchCacheWhereInput | StationSearchCacheWhereInput[]
    OR?: StationSearchCacheWhereInput[]
    NOT?: StationSearchCacheWhereInput | StationSearchCacheWhereInput[]
    id?: StringFilter<"StationSearchCache"> | string
    locality?: StringFilter<"StationSearchCache"> | string
    data?: JsonFilter<"StationSearchCache">
    createdAt?: DateTimeFilter<"StationSearchCache"> | Date | string
  }

  export type StationSearchCacheOrderByWithRelationInput = {
    id?: SortOrder
    locality?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type StationSearchCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    locality?: string
    AND?: StationSearchCacheWhereInput | StationSearchCacheWhereInput[]
    OR?: StationSearchCacheWhereInput[]
    NOT?: StationSearchCacheWhereInput | StationSearchCacheWhereInput[]
    data?: JsonFilter<"StationSearchCache">
    createdAt?: DateTimeFilter<"StationSearchCache"> | Date | string
  }, "id" | "locality">

  export type StationSearchCacheOrderByWithAggregationInput = {
    id?: SortOrder
    locality?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
    _count?: StationSearchCacheCountOrderByAggregateInput
    _max?: StationSearchCacheMaxOrderByAggregateInput
    _min?: StationSearchCacheMinOrderByAggregateInput
  }

  export type StationSearchCacheScalarWhereWithAggregatesInput = {
    AND?: StationSearchCacheScalarWhereWithAggregatesInput | StationSearchCacheScalarWhereWithAggregatesInput[]
    OR?: StationSearchCacheScalarWhereWithAggregatesInput[]
    NOT?: StationSearchCacheScalarWhereWithAggregatesInput | StationSearchCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StationSearchCache"> | string
    locality?: StringWithAggregatesFilter<"StationSearchCache"> | string
    data?: JsonWithAggregatesFilter<"StationSearchCache">
    createdAt?: DateTimeWithAggregatesFilter<"StationSearchCache"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    vehicles?: VehicleCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteUncheckedCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUncheckedUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    label: string
    rangeKm: number
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutVehiclesInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    userId: string
    label: string
    rangeKm: number
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    rangeKm?: IntFieldUpdateOperationsInput | number
    isPreset?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVehiclesNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    rangeKm?: IntFieldUpdateOperationsInput | number
    isPreset?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateManyInput = {
    id?: string
    userId: string
    label: string
    rangeKm: number
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    rangeKm?: IntFieldUpdateOperationsInput | number
    isPreset?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    rangeKm?: IntFieldUpdateOperationsInput | number
    isPreset?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedRouteCreateInput = {
    id?: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp?: number | null
    weatherWind?: number | null
    weatherRain?: number | null
    weatherFactor?: number | null
    weatherLabel?: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary?: string | null
    aiVerdict?: string | null
    aiChargingAdvice?: string | null
    aiOptimalSpeed?: number | null
    aiRiskLevel?: string | null
    createdAt?: Date | string
    chargingStations?: ChargingStopSnapshotCreateNestedManyWithoutSavedRouteInput
    user: UserCreateNestedOneWithoutSavedRoutesInput
  }

  export type SavedRouteUncheckedCreateInput = {
    id?: string
    userId: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp?: number | null
    weatherWind?: number | null
    weatherRain?: number | null
    weatherFactor?: number | null
    weatherLabel?: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary?: string | null
    aiVerdict?: string | null
    aiChargingAdvice?: string | null
    aiOptimalSpeed?: number | null
    aiRiskLevel?: string | null
    createdAt?: Date | string
    chargingStations?: ChargingStopSnapshotUncheckedCreateNestedManyWithoutSavedRouteInput
  }

  export type SavedRouteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chargingStations?: ChargingStopSnapshotUpdateManyWithoutSavedRouteNestedInput
    user?: UserUpdateOneRequiredWithoutSavedRoutesNestedInput
  }

  export type SavedRouteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chargingStations?: ChargingStopSnapshotUncheckedUpdateManyWithoutSavedRouteNestedInput
  }

  export type SavedRouteCreateManyInput = {
    id?: string
    userId: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp?: number | null
    weatherWind?: number | null
    weatherRain?: number | null
    weatherFactor?: number | null
    weatherLabel?: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary?: string | null
    aiVerdict?: string | null
    aiChargingAdvice?: string | null
    aiOptimalSpeed?: number | null
    aiRiskLevel?: string | null
    createdAt?: Date | string
  }

  export type SavedRouteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedRouteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChargingStopSnapshotCreateInput = {
    id?: string
    externalId?: string | null
    name: string
    address?: string | null
    lat: number
    lon: number
    connectors: number
    fastCharge?: boolean
    powerKw?: number | null
    network?: string | null
    source?: string | null
    batteryAtPoint?: number | null
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: number | null
    savedRoute: SavedRouteCreateNestedOneWithoutChargingStationsInput
  }

  export type ChargingStopSnapshotUncheckedCreateInput = {
    id?: string
    savedRouteId: string
    externalId?: string | null
    name: string
    address?: string | null
    lat: number
    lon: number
    connectors: number
    fastCharge?: boolean
    powerKw?: number | null
    network?: string | null
    source?: string | null
    batteryAtPoint?: number | null
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: number | null
  }

  export type ChargingStopSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    connectors?: IntFieldUpdateOperationsInput | number
    fastCharge?: BoolFieldUpdateOperationsInput | boolean
    powerKw?: NullableFloatFieldUpdateOperationsInput | number | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    batteryAtPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    isNeeded?: BoolFieldUpdateOperationsInput | boolean
    isCritical?: BoolFieldUpdateOperationsInput | boolean
    routeFraction?: NullableFloatFieldUpdateOperationsInput | number | null
    savedRoute?: SavedRouteUpdateOneRequiredWithoutChargingStationsNestedInput
  }

  export type ChargingStopSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedRouteId?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    connectors?: IntFieldUpdateOperationsInput | number
    fastCharge?: BoolFieldUpdateOperationsInput | boolean
    powerKw?: NullableFloatFieldUpdateOperationsInput | number | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    batteryAtPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    isNeeded?: BoolFieldUpdateOperationsInput | boolean
    isCritical?: BoolFieldUpdateOperationsInput | boolean
    routeFraction?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ChargingStopSnapshotCreateManyInput = {
    id?: string
    savedRouteId: string
    externalId?: string | null
    name: string
    address?: string | null
    lat: number
    lon: number
    connectors: number
    fastCharge?: boolean
    powerKw?: number | null
    network?: string | null
    source?: string | null
    batteryAtPoint?: number | null
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: number | null
  }

  export type ChargingStopSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    connectors?: IntFieldUpdateOperationsInput | number
    fastCharge?: BoolFieldUpdateOperationsInput | boolean
    powerKw?: NullableFloatFieldUpdateOperationsInput | number | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    batteryAtPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    isNeeded?: BoolFieldUpdateOperationsInput | boolean
    isCritical?: BoolFieldUpdateOperationsInput | boolean
    routeFraction?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ChargingStopSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    savedRouteId?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    connectors?: IntFieldUpdateOperationsInput | number
    fastCharge?: BoolFieldUpdateOperationsInput | boolean
    powerKw?: NullableFloatFieldUpdateOperationsInput | number | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    batteryAtPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    isNeeded?: BoolFieldUpdateOperationsInput | boolean
    isCritical?: BoolFieldUpdateOperationsInput | boolean
    routeFraction?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type CreditLogCreateInput = {
    id?: string
    amount: number
    reason: string
    balanceAfter: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCreditLogsInput
  }

  export type CreditLogUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    reason: string
    balanceAfter: number
    createdAt?: Date | string
  }

  export type CreditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCreditLogsNestedInput
  }

  export type CreditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditLogCreateManyInput = {
    id?: string
    userId: string
    amount: number
    reason: string
    balanceAfter: number
    createdAt?: Date | string
  }

  export type CreditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeocodeCacheCreateInput = {
    id?: string
    query: string
    lat: number
    lon: number
    displayName: string
    source: string
    createdAt?: Date | string
  }

  export type GeocodeCacheUncheckedCreateInput = {
    id?: string
    query: string
    lat: number
    lon: number
    displayName: string
    source: string
    createdAt?: Date | string
  }

  export type GeocodeCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeocodeCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeocodeCacheCreateManyInput = {
    id?: string
    query: string
    lat: number
    lon: number
    displayName: string
    source: string
    createdAt?: Date | string
  }

  export type GeocodeCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeocodeCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StationSearchCacheCreateInput = {
    id?: string
    locality: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type StationSearchCacheUncheckedCreateInput = {
    id?: string
    locality: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type StationSearchCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locality?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StationSearchCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locality?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StationSearchCacheCreateManyInput = {
    id?: string
    locality: string
    data: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type StationSearchCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    locality?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StationSearchCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    locality?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type VehicleListRelationFilter = {
    every?: VehicleWhereInput
    some?: VehicleWhereInput
    none?: VehicleWhereInput
  }

  export type SavedRouteListRelationFilter = {
    every?: SavedRouteWhereInput
    some?: SavedRouteWhereInput
    none?: SavedRouteWhereInput
  }

  export type CreditLogListRelationFilter = {
    every?: CreditLogWhereInput
    some?: CreditLogWhereInput
    none?: CreditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VehicleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedRouteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    credits?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    credits?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    rangeKm?: SortOrder
    isPreset?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    rangeKm?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    rangeKm?: SortOrder
    isPreset?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    label?: SortOrder
    rangeKm?: SortOrder
    isPreset?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    rangeKm?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ChargingStopSnapshotListRelationFilter = {
    every?: ChargingStopSnapshotWhereInput
    some?: ChargingStopSnapshotWhereInput
    none?: ChargingStopSnapshotWhereInput
  }

  export type ChargingStopSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedRouteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originName?: SortOrder
    originLat?: SortOrder
    originLon?: SortOrder
    destName?: SortOrder
    destLat?: SortOrder
    destLon?: SortOrder
    batteryPercent?: SortOrder
    vehicleRangeKm?: SortOrder
    distanceKm?: SortOrder
    durationMin?: SortOrder
    elevationGainM?: SortOrder
    weatherTemp?: SortOrder
    weatherWind?: SortOrder
    weatherRain?: SortOrder
    weatherFactor?: SortOrder
    weatherLabel?: SortOrder
    totalBatteryUsed?: SortOrder
    remainingBattery?: SortOrder
    effectiveRange?: SortOrder
    willReachDestination?: SortOrder
    safetyBuffer?: SortOrder
    aiSummary?: SortOrder
    aiVerdict?: SortOrder
    aiChargingAdvice?: SortOrder
    aiOptimalSpeed?: SortOrder
    aiRiskLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedRouteAvgOrderByAggregateInput = {
    originLat?: SortOrder
    originLon?: SortOrder
    destLat?: SortOrder
    destLon?: SortOrder
    batteryPercent?: SortOrder
    vehicleRangeKm?: SortOrder
    distanceKm?: SortOrder
    durationMin?: SortOrder
    elevationGainM?: SortOrder
    weatherTemp?: SortOrder
    weatherWind?: SortOrder
    weatherRain?: SortOrder
    weatherFactor?: SortOrder
    totalBatteryUsed?: SortOrder
    remainingBattery?: SortOrder
    effectiveRange?: SortOrder
    safetyBuffer?: SortOrder
    aiOptimalSpeed?: SortOrder
  }

  export type SavedRouteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originName?: SortOrder
    originLat?: SortOrder
    originLon?: SortOrder
    destName?: SortOrder
    destLat?: SortOrder
    destLon?: SortOrder
    batteryPercent?: SortOrder
    vehicleRangeKm?: SortOrder
    distanceKm?: SortOrder
    durationMin?: SortOrder
    elevationGainM?: SortOrder
    weatherTemp?: SortOrder
    weatherWind?: SortOrder
    weatherRain?: SortOrder
    weatherFactor?: SortOrder
    weatherLabel?: SortOrder
    totalBatteryUsed?: SortOrder
    remainingBattery?: SortOrder
    effectiveRange?: SortOrder
    willReachDestination?: SortOrder
    safetyBuffer?: SortOrder
    aiSummary?: SortOrder
    aiVerdict?: SortOrder
    aiChargingAdvice?: SortOrder
    aiOptimalSpeed?: SortOrder
    aiRiskLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedRouteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originName?: SortOrder
    originLat?: SortOrder
    originLon?: SortOrder
    destName?: SortOrder
    destLat?: SortOrder
    destLon?: SortOrder
    batteryPercent?: SortOrder
    vehicleRangeKm?: SortOrder
    distanceKm?: SortOrder
    durationMin?: SortOrder
    elevationGainM?: SortOrder
    weatherTemp?: SortOrder
    weatherWind?: SortOrder
    weatherRain?: SortOrder
    weatherFactor?: SortOrder
    weatherLabel?: SortOrder
    totalBatteryUsed?: SortOrder
    remainingBattery?: SortOrder
    effectiveRange?: SortOrder
    willReachDestination?: SortOrder
    safetyBuffer?: SortOrder
    aiSummary?: SortOrder
    aiVerdict?: SortOrder
    aiChargingAdvice?: SortOrder
    aiOptimalSpeed?: SortOrder
    aiRiskLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedRouteSumOrderByAggregateInput = {
    originLat?: SortOrder
    originLon?: SortOrder
    destLat?: SortOrder
    destLon?: SortOrder
    batteryPercent?: SortOrder
    vehicleRangeKm?: SortOrder
    distanceKm?: SortOrder
    durationMin?: SortOrder
    elevationGainM?: SortOrder
    weatherTemp?: SortOrder
    weatherWind?: SortOrder
    weatherRain?: SortOrder
    weatherFactor?: SortOrder
    totalBatteryUsed?: SortOrder
    remainingBattery?: SortOrder
    effectiveRange?: SortOrder
    safetyBuffer?: SortOrder
    aiOptimalSpeed?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type SavedRouteRelationFilter = {
    is?: SavedRouteWhereInput
    isNot?: SavedRouteWhereInput
  }

  export type ChargingStopSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    savedRouteId?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    connectors?: SortOrder
    fastCharge?: SortOrder
    powerKw?: SortOrder
    network?: SortOrder
    source?: SortOrder
    batteryAtPoint?: SortOrder
    isNeeded?: SortOrder
    isCritical?: SortOrder
    routeFraction?: SortOrder
  }

  export type ChargingStopSnapshotAvgOrderByAggregateInput = {
    lat?: SortOrder
    lon?: SortOrder
    connectors?: SortOrder
    powerKw?: SortOrder
    batteryAtPoint?: SortOrder
    routeFraction?: SortOrder
  }

  export type ChargingStopSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    savedRouteId?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    connectors?: SortOrder
    fastCharge?: SortOrder
    powerKw?: SortOrder
    network?: SortOrder
    source?: SortOrder
    batteryAtPoint?: SortOrder
    isNeeded?: SortOrder
    isCritical?: SortOrder
    routeFraction?: SortOrder
  }

  export type ChargingStopSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    savedRouteId?: SortOrder
    externalId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    connectors?: SortOrder
    fastCharge?: SortOrder
    powerKw?: SortOrder
    network?: SortOrder
    source?: SortOrder
    batteryAtPoint?: SortOrder
    isNeeded?: SortOrder
    isCritical?: SortOrder
    routeFraction?: SortOrder
  }

  export type ChargingStopSnapshotSumOrderByAggregateInput = {
    lat?: SortOrder
    lon?: SortOrder
    connectors?: SortOrder
    powerKw?: SortOrder
    batteryAtPoint?: SortOrder
    routeFraction?: SortOrder
  }

  export type CreditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditLogAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type CreditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    reason?: SortOrder
    balanceAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditLogSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type GeocodeCacheCountOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    displayName?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type GeocodeCacheAvgOrderByAggregateInput = {
    lat?: SortOrder
    lon?: SortOrder
  }

  export type GeocodeCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    displayName?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type GeocodeCacheMinOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    lat?: SortOrder
    lon?: SortOrder
    displayName?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type GeocodeCacheSumOrderByAggregateInput = {
    lat?: SortOrder
    lon?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StationSearchCacheCountOrderByAggregateInput = {
    id?: SortOrder
    locality?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type StationSearchCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    locality?: SortOrder
    createdAt?: SortOrder
  }

  export type StationSearchCacheMinOrderByAggregateInput = {
    id?: SortOrder
    locality?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type VehicleCreateNestedManyWithoutUserInput = {
    create?: XOR<VehicleCreateWithoutUserInput, VehicleUncheckedCreateWithoutUserInput> | VehicleCreateWithoutUserInput[] | VehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutUserInput | VehicleCreateOrConnectWithoutUserInput[]
    createMany?: VehicleCreateManyUserInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type SavedRouteCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedRouteCreateWithoutUserInput, SavedRouteUncheckedCreateWithoutUserInput> | SavedRouteCreateWithoutUserInput[] | SavedRouteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedRouteCreateOrConnectWithoutUserInput | SavedRouteCreateOrConnectWithoutUserInput[]
    createMany?: SavedRouteCreateManyUserInputEnvelope
    connect?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
  }

  export type CreditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditLogCreateWithoutUserInput, CreditLogUncheckedCreateWithoutUserInput> | CreditLogCreateWithoutUserInput[] | CreditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditLogCreateOrConnectWithoutUserInput | CreditLogCreateOrConnectWithoutUserInput[]
    createMany?: CreditLogCreateManyUserInputEnvelope
    connect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type VehicleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VehicleCreateWithoutUserInput, VehicleUncheckedCreateWithoutUserInput> | VehicleCreateWithoutUserInput[] | VehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutUserInput | VehicleCreateOrConnectWithoutUserInput[]
    createMany?: VehicleCreateManyUserInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type SavedRouteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedRouteCreateWithoutUserInput, SavedRouteUncheckedCreateWithoutUserInput> | SavedRouteCreateWithoutUserInput[] | SavedRouteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedRouteCreateOrConnectWithoutUserInput | SavedRouteCreateOrConnectWithoutUserInput[]
    createMany?: SavedRouteCreateManyUserInputEnvelope
    connect?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
  }

  export type CreditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditLogCreateWithoutUserInput, CreditLogUncheckedCreateWithoutUserInput> | CreditLogCreateWithoutUserInput[] | CreditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditLogCreateOrConnectWithoutUserInput | CreditLogCreateOrConnectWithoutUserInput[]
    createMany?: CreditLogCreateManyUserInputEnvelope
    connect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type VehicleUpdateManyWithoutUserNestedInput = {
    create?: XOR<VehicleCreateWithoutUserInput, VehicleUncheckedCreateWithoutUserInput> | VehicleCreateWithoutUserInput[] | VehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutUserInput | VehicleCreateOrConnectWithoutUserInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutUserInput | VehicleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VehicleCreateManyUserInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutUserInput | VehicleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutUserInput | VehicleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type SavedRouteUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedRouteCreateWithoutUserInput, SavedRouteUncheckedCreateWithoutUserInput> | SavedRouteCreateWithoutUserInput[] | SavedRouteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedRouteCreateOrConnectWithoutUserInput | SavedRouteCreateOrConnectWithoutUserInput[]
    upsert?: SavedRouteUpsertWithWhereUniqueWithoutUserInput | SavedRouteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedRouteCreateManyUserInputEnvelope
    set?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
    disconnect?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
    delete?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
    connect?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
    update?: SavedRouteUpdateWithWhereUniqueWithoutUserInput | SavedRouteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedRouteUpdateManyWithWhereWithoutUserInput | SavedRouteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedRouteScalarWhereInput | SavedRouteScalarWhereInput[]
  }

  export type CreditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditLogCreateWithoutUserInput, CreditLogUncheckedCreateWithoutUserInput> | CreditLogCreateWithoutUserInput[] | CreditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditLogCreateOrConnectWithoutUserInput | CreditLogCreateOrConnectWithoutUserInput[]
    upsert?: CreditLogUpsertWithWhereUniqueWithoutUserInput | CreditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditLogCreateManyUserInputEnvelope
    set?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    disconnect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    delete?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    connect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    update?: CreditLogUpdateWithWhereUniqueWithoutUserInput | CreditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditLogUpdateManyWithWhereWithoutUserInput | CreditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditLogScalarWhereInput | CreditLogScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type VehicleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VehicleCreateWithoutUserInput, VehicleUncheckedCreateWithoutUserInput> | VehicleCreateWithoutUserInput[] | VehicleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutUserInput | VehicleCreateOrConnectWithoutUserInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutUserInput | VehicleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VehicleCreateManyUserInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutUserInput | VehicleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutUserInput | VehicleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type SavedRouteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedRouteCreateWithoutUserInput, SavedRouteUncheckedCreateWithoutUserInput> | SavedRouteCreateWithoutUserInput[] | SavedRouteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedRouteCreateOrConnectWithoutUserInput | SavedRouteCreateOrConnectWithoutUserInput[]
    upsert?: SavedRouteUpsertWithWhereUniqueWithoutUserInput | SavedRouteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedRouteCreateManyUserInputEnvelope
    set?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
    disconnect?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
    delete?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
    connect?: SavedRouteWhereUniqueInput | SavedRouteWhereUniqueInput[]
    update?: SavedRouteUpdateWithWhereUniqueWithoutUserInput | SavedRouteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedRouteUpdateManyWithWhereWithoutUserInput | SavedRouteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedRouteScalarWhereInput | SavedRouteScalarWhereInput[]
  }

  export type CreditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditLogCreateWithoutUserInput, CreditLogUncheckedCreateWithoutUserInput> | CreditLogCreateWithoutUserInput[] | CreditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditLogCreateOrConnectWithoutUserInput | CreditLogCreateOrConnectWithoutUserInput[]
    upsert?: CreditLogUpsertWithWhereUniqueWithoutUserInput | CreditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditLogCreateManyUserInputEnvelope
    set?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    disconnect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    delete?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    connect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    update?: CreditLogUpdateWithWhereUniqueWithoutUserInput | CreditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditLogUpdateManyWithWhereWithoutUserInput | CreditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditLogScalarWhereInput | CreditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutVehiclesInput = {
    create?: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVehiclesInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutVehiclesNestedInput = {
    create?: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVehiclesInput
    upsert?: UserUpsertWithoutVehiclesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVehiclesInput, UserUpdateWithoutVehiclesInput>, UserUncheckedUpdateWithoutVehiclesInput>
  }

  export type ChargingStopSnapshotCreateNestedManyWithoutSavedRouteInput = {
    create?: XOR<ChargingStopSnapshotCreateWithoutSavedRouteInput, ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput> | ChargingStopSnapshotCreateWithoutSavedRouteInput[] | ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput[]
    connectOrCreate?: ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput | ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput[]
    createMany?: ChargingStopSnapshotCreateManySavedRouteInputEnvelope
    connect?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutSavedRoutesInput = {
    create?: XOR<UserCreateWithoutSavedRoutesInput, UserUncheckedCreateWithoutSavedRoutesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedRoutesInput
    connect?: UserWhereUniqueInput
  }

  export type ChargingStopSnapshotUncheckedCreateNestedManyWithoutSavedRouteInput = {
    create?: XOR<ChargingStopSnapshotCreateWithoutSavedRouteInput, ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput> | ChargingStopSnapshotCreateWithoutSavedRouteInput[] | ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput[]
    connectOrCreate?: ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput | ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput[]
    createMany?: ChargingStopSnapshotCreateManySavedRouteInputEnvelope
    connect?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChargingStopSnapshotUpdateManyWithoutSavedRouteNestedInput = {
    create?: XOR<ChargingStopSnapshotCreateWithoutSavedRouteInput, ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput> | ChargingStopSnapshotCreateWithoutSavedRouteInput[] | ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput[]
    connectOrCreate?: ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput | ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput[]
    upsert?: ChargingStopSnapshotUpsertWithWhereUniqueWithoutSavedRouteInput | ChargingStopSnapshotUpsertWithWhereUniqueWithoutSavedRouteInput[]
    createMany?: ChargingStopSnapshotCreateManySavedRouteInputEnvelope
    set?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
    disconnect?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
    delete?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
    connect?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
    update?: ChargingStopSnapshotUpdateWithWhereUniqueWithoutSavedRouteInput | ChargingStopSnapshotUpdateWithWhereUniqueWithoutSavedRouteInput[]
    updateMany?: ChargingStopSnapshotUpdateManyWithWhereWithoutSavedRouteInput | ChargingStopSnapshotUpdateManyWithWhereWithoutSavedRouteInput[]
    deleteMany?: ChargingStopSnapshotScalarWhereInput | ChargingStopSnapshotScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutSavedRoutesNestedInput = {
    create?: XOR<UserCreateWithoutSavedRoutesInput, UserUncheckedCreateWithoutSavedRoutesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedRoutesInput
    upsert?: UserUpsertWithoutSavedRoutesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedRoutesInput, UserUpdateWithoutSavedRoutesInput>, UserUncheckedUpdateWithoutSavedRoutesInput>
  }

  export type ChargingStopSnapshotUncheckedUpdateManyWithoutSavedRouteNestedInput = {
    create?: XOR<ChargingStopSnapshotCreateWithoutSavedRouteInput, ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput> | ChargingStopSnapshotCreateWithoutSavedRouteInput[] | ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput[]
    connectOrCreate?: ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput | ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput[]
    upsert?: ChargingStopSnapshotUpsertWithWhereUniqueWithoutSavedRouteInput | ChargingStopSnapshotUpsertWithWhereUniqueWithoutSavedRouteInput[]
    createMany?: ChargingStopSnapshotCreateManySavedRouteInputEnvelope
    set?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
    disconnect?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
    delete?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
    connect?: ChargingStopSnapshotWhereUniqueInput | ChargingStopSnapshotWhereUniqueInput[]
    update?: ChargingStopSnapshotUpdateWithWhereUniqueWithoutSavedRouteInput | ChargingStopSnapshotUpdateWithWhereUniqueWithoutSavedRouteInput[]
    updateMany?: ChargingStopSnapshotUpdateManyWithWhereWithoutSavedRouteInput | ChargingStopSnapshotUpdateManyWithWhereWithoutSavedRouteInput[]
    deleteMany?: ChargingStopSnapshotScalarWhereInput | ChargingStopSnapshotScalarWhereInput[]
  }

  export type SavedRouteCreateNestedOneWithoutChargingStationsInput = {
    create?: XOR<SavedRouteCreateWithoutChargingStationsInput, SavedRouteUncheckedCreateWithoutChargingStationsInput>
    connectOrCreate?: SavedRouteCreateOrConnectWithoutChargingStationsInput
    connect?: SavedRouteWhereUniqueInput
  }

  export type SavedRouteUpdateOneRequiredWithoutChargingStationsNestedInput = {
    create?: XOR<SavedRouteCreateWithoutChargingStationsInput, SavedRouteUncheckedCreateWithoutChargingStationsInput>
    connectOrCreate?: SavedRouteCreateOrConnectWithoutChargingStationsInput
    upsert?: SavedRouteUpsertWithoutChargingStationsInput
    connect?: SavedRouteWhereUniqueInput
    update?: XOR<XOR<SavedRouteUpdateToOneWithWhereWithoutChargingStationsInput, SavedRouteUpdateWithoutChargingStationsInput>, SavedRouteUncheckedUpdateWithoutChargingStationsInput>
  }

  export type UserCreateNestedOneWithoutCreditLogsInput = {
    create?: XOR<UserCreateWithoutCreditLogsInput, UserUncheckedCreateWithoutCreditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCreditLogsNestedInput = {
    create?: XOR<UserCreateWithoutCreditLogsInput, UserUncheckedCreateWithoutCreditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditLogsInput
    upsert?: UserUpsertWithoutCreditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreditLogsInput, UserUpdateWithoutCreditLogsInput>, UserUncheckedUpdateWithoutCreditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VehicleCreateWithoutUserInput = {
    id?: string
    label: string
    rangeKm: number
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type VehicleUncheckedCreateWithoutUserInput = {
    id?: string
    label: string
    rangeKm: number
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type VehicleCreateOrConnectWithoutUserInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutUserInput, VehicleUncheckedCreateWithoutUserInput>
  }

  export type VehicleCreateManyUserInputEnvelope = {
    data: VehicleCreateManyUserInput | VehicleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SavedRouteCreateWithoutUserInput = {
    id?: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp?: number | null
    weatherWind?: number | null
    weatherRain?: number | null
    weatherFactor?: number | null
    weatherLabel?: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary?: string | null
    aiVerdict?: string | null
    aiChargingAdvice?: string | null
    aiOptimalSpeed?: number | null
    aiRiskLevel?: string | null
    createdAt?: Date | string
    chargingStations?: ChargingStopSnapshotCreateNestedManyWithoutSavedRouteInput
  }

  export type SavedRouteUncheckedCreateWithoutUserInput = {
    id?: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp?: number | null
    weatherWind?: number | null
    weatherRain?: number | null
    weatherFactor?: number | null
    weatherLabel?: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary?: string | null
    aiVerdict?: string | null
    aiChargingAdvice?: string | null
    aiOptimalSpeed?: number | null
    aiRiskLevel?: string | null
    createdAt?: Date | string
    chargingStations?: ChargingStopSnapshotUncheckedCreateNestedManyWithoutSavedRouteInput
  }

  export type SavedRouteCreateOrConnectWithoutUserInput = {
    where: SavedRouteWhereUniqueInput
    create: XOR<SavedRouteCreateWithoutUserInput, SavedRouteUncheckedCreateWithoutUserInput>
  }

  export type SavedRouteCreateManyUserInputEnvelope = {
    data: SavedRouteCreateManyUserInput | SavedRouteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CreditLogCreateWithoutUserInput = {
    id?: string
    amount: number
    reason: string
    balanceAfter: number
    createdAt?: Date | string
  }

  export type CreditLogUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    reason: string
    balanceAfter: number
    createdAt?: Date | string
  }

  export type CreditLogCreateOrConnectWithoutUserInput = {
    where: CreditLogWhereUniqueInput
    create: XOR<CreditLogCreateWithoutUserInput, CreditLogUncheckedCreateWithoutUserInput>
  }

  export type CreditLogCreateManyUserInputEnvelope = {
    data: CreditLogCreateManyUserInput | CreditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type VehicleUpsertWithWhereUniqueWithoutUserInput = {
    where: VehicleWhereUniqueInput
    update: XOR<VehicleUpdateWithoutUserInput, VehicleUncheckedUpdateWithoutUserInput>
    create: XOR<VehicleCreateWithoutUserInput, VehicleUncheckedCreateWithoutUserInput>
  }

  export type VehicleUpdateWithWhereUniqueWithoutUserInput = {
    where: VehicleWhereUniqueInput
    data: XOR<VehicleUpdateWithoutUserInput, VehicleUncheckedUpdateWithoutUserInput>
  }

  export type VehicleUpdateManyWithWhereWithoutUserInput = {
    where: VehicleScalarWhereInput
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyWithoutUserInput>
  }

  export type VehicleScalarWhereInput = {
    AND?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    OR?: VehicleScalarWhereInput[]
    NOT?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    userId?: StringFilter<"Vehicle"> | string
    label?: StringFilter<"Vehicle"> | string
    rangeKm?: IntFilter<"Vehicle"> | number
    isPreset?: BoolFilter<"Vehicle"> | boolean
    isDefault?: BoolFilter<"Vehicle"> | boolean
    createdAt?: DateTimeFilter<"Vehicle"> | Date | string
  }

  export type SavedRouteUpsertWithWhereUniqueWithoutUserInput = {
    where: SavedRouteWhereUniqueInput
    update: XOR<SavedRouteUpdateWithoutUserInput, SavedRouteUncheckedUpdateWithoutUserInput>
    create: XOR<SavedRouteCreateWithoutUserInput, SavedRouteUncheckedCreateWithoutUserInput>
  }

  export type SavedRouteUpdateWithWhereUniqueWithoutUserInput = {
    where: SavedRouteWhereUniqueInput
    data: XOR<SavedRouteUpdateWithoutUserInput, SavedRouteUncheckedUpdateWithoutUserInput>
  }

  export type SavedRouteUpdateManyWithWhereWithoutUserInput = {
    where: SavedRouteScalarWhereInput
    data: XOR<SavedRouteUpdateManyMutationInput, SavedRouteUncheckedUpdateManyWithoutUserInput>
  }

  export type SavedRouteScalarWhereInput = {
    AND?: SavedRouteScalarWhereInput | SavedRouteScalarWhereInput[]
    OR?: SavedRouteScalarWhereInput[]
    NOT?: SavedRouteScalarWhereInput | SavedRouteScalarWhereInput[]
    id?: StringFilter<"SavedRoute"> | string
    userId?: StringFilter<"SavedRoute"> | string
    originName?: StringFilter<"SavedRoute"> | string
    originLat?: FloatFilter<"SavedRoute"> | number
    originLon?: FloatFilter<"SavedRoute"> | number
    destName?: StringFilter<"SavedRoute"> | string
    destLat?: FloatFilter<"SavedRoute"> | number
    destLon?: FloatFilter<"SavedRoute"> | number
    batteryPercent?: IntFilter<"SavedRoute"> | number
    vehicleRangeKm?: IntFilter<"SavedRoute"> | number
    distanceKm?: FloatFilter<"SavedRoute"> | number
    durationMin?: FloatFilter<"SavedRoute"> | number
    elevationGainM?: FloatFilter<"SavedRoute"> | number
    weatherTemp?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherWind?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherRain?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherFactor?: FloatNullableFilter<"SavedRoute"> | number | null
    weatherLabel?: StringNullableFilter<"SavedRoute"> | string | null
    totalBatteryUsed?: FloatFilter<"SavedRoute"> | number
    remainingBattery?: FloatFilter<"SavedRoute"> | number
    effectiveRange?: IntFilter<"SavedRoute"> | number
    willReachDestination?: BoolFilter<"SavedRoute"> | boolean
    safetyBuffer?: IntFilter<"SavedRoute"> | number
    aiSummary?: StringNullableFilter<"SavedRoute"> | string | null
    aiVerdict?: StringNullableFilter<"SavedRoute"> | string | null
    aiChargingAdvice?: StringNullableFilter<"SavedRoute"> | string | null
    aiOptimalSpeed?: IntNullableFilter<"SavedRoute"> | number | null
    aiRiskLevel?: StringNullableFilter<"SavedRoute"> | string | null
    createdAt?: DateTimeFilter<"SavedRoute"> | Date | string
  }

  export type CreditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: CreditLogWhereUniqueInput
    update: XOR<CreditLogUpdateWithoutUserInput, CreditLogUncheckedUpdateWithoutUserInput>
    create: XOR<CreditLogCreateWithoutUserInput, CreditLogUncheckedCreateWithoutUserInput>
  }

  export type CreditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: CreditLogWhereUniqueInput
    data: XOR<CreditLogUpdateWithoutUserInput, CreditLogUncheckedUpdateWithoutUserInput>
  }

  export type CreditLogUpdateManyWithWhereWithoutUserInput = {
    where: CreditLogScalarWhereInput
    data: XOR<CreditLogUpdateManyMutationInput, CreditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type CreditLogScalarWhereInput = {
    AND?: CreditLogScalarWhereInput | CreditLogScalarWhereInput[]
    OR?: CreditLogScalarWhereInput[]
    NOT?: CreditLogScalarWhereInput | CreditLogScalarWhereInput[]
    id?: StringFilter<"CreditLog"> | string
    userId?: StringFilter<"CreditLog"> | string
    amount?: IntFilter<"CreditLog"> | number
    reason?: StringFilter<"CreditLog"> | string
    balanceAfter?: IntFilter<"CreditLog"> | number
    createdAt?: DateTimeFilter<"CreditLog"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    vehicles?: VehicleCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteUncheckedCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUncheckedUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    vehicles?: VehicleCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteUncheckedCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUncheckedUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutVehiclesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVehiclesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteUncheckedCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVehiclesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
  }

  export type UserUpsertWithoutVehiclesInput = {
    update: XOR<UserUpdateWithoutVehiclesInput, UserUncheckedUpdateWithoutVehiclesInput>
    create: XOR<UserCreateWithoutVehiclesInput, UserUncheckedCreateWithoutVehiclesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVehiclesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVehiclesInput, UserUncheckedUpdateWithoutVehiclesInput>
  }

  export type UserUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUncheckedUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ChargingStopSnapshotCreateWithoutSavedRouteInput = {
    id?: string
    externalId?: string | null
    name: string
    address?: string | null
    lat: number
    lon: number
    connectors: number
    fastCharge?: boolean
    powerKw?: number | null
    network?: string | null
    source?: string | null
    batteryAtPoint?: number | null
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: number | null
  }

  export type ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput = {
    id?: string
    externalId?: string | null
    name: string
    address?: string | null
    lat: number
    lon: number
    connectors: number
    fastCharge?: boolean
    powerKw?: number | null
    network?: string | null
    source?: string | null
    batteryAtPoint?: number | null
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: number | null
  }

  export type ChargingStopSnapshotCreateOrConnectWithoutSavedRouteInput = {
    where: ChargingStopSnapshotWhereUniqueInput
    create: XOR<ChargingStopSnapshotCreateWithoutSavedRouteInput, ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput>
  }

  export type ChargingStopSnapshotCreateManySavedRouteInputEnvelope = {
    data: ChargingStopSnapshotCreateManySavedRouteInput | ChargingStopSnapshotCreateManySavedRouteInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutSavedRoutesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    vehicles?: VehicleCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedRoutesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutUserInput
    creditLogs?: CreditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedRoutesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedRoutesInput, UserUncheckedCreateWithoutSavedRoutesInput>
  }

  export type ChargingStopSnapshotUpsertWithWhereUniqueWithoutSavedRouteInput = {
    where: ChargingStopSnapshotWhereUniqueInput
    update: XOR<ChargingStopSnapshotUpdateWithoutSavedRouteInput, ChargingStopSnapshotUncheckedUpdateWithoutSavedRouteInput>
    create: XOR<ChargingStopSnapshotCreateWithoutSavedRouteInput, ChargingStopSnapshotUncheckedCreateWithoutSavedRouteInput>
  }

  export type ChargingStopSnapshotUpdateWithWhereUniqueWithoutSavedRouteInput = {
    where: ChargingStopSnapshotWhereUniqueInput
    data: XOR<ChargingStopSnapshotUpdateWithoutSavedRouteInput, ChargingStopSnapshotUncheckedUpdateWithoutSavedRouteInput>
  }

  export type ChargingStopSnapshotUpdateManyWithWhereWithoutSavedRouteInput = {
    where: ChargingStopSnapshotScalarWhereInput
    data: XOR<ChargingStopSnapshotUpdateManyMutationInput, ChargingStopSnapshotUncheckedUpdateManyWithoutSavedRouteInput>
  }

  export type ChargingStopSnapshotScalarWhereInput = {
    AND?: ChargingStopSnapshotScalarWhereInput | ChargingStopSnapshotScalarWhereInput[]
    OR?: ChargingStopSnapshotScalarWhereInput[]
    NOT?: ChargingStopSnapshotScalarWhereInput | ChargingStopSnapshotScalarWhereInput[]
    id?: StringFilter<"ChargingStopSnapshot"> | string
    savedRouteId?: StringFilter<"ChargingStopSnapshot"> | string
    externalId?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    name?: StringFilter<"ChargingStopSnapshot"> | string
    address?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    lat?: FloatFilter<"ChargingStopSnapshot"> | number
    lon?: FloatFilter<"ChargingStopSnapshot"> | number
    connectors?: IntFilter<"ChargingStopSnapshot"> | number
    fastCharge?: BoolFilter<"ChargingStopSnapshot"> | boolean
    powerKw?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
    network?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    source?: StringNullableFilter<"ChargingStopSnapshot"> | string | null
    batteryAtPoint?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
    isNeeded?: BoolFilter<"ChargingStopSnapshot"> | boolean
    isCritical?: BoolFilter<"ChargingStopSnapshot"> | boolean
    routeFraction?: FloatNullableFilter<"ChargingStopSnapshot"> | number | null
  }

  export type UserUpsertWithoutSavedRoutesInput = {
    update: XOR<UserUpdateWithoutSavedRoutesInput, UserUncheckedUpdateWithoutSavedRoutesInput>
    create: XOR<UserCreateWithoutSavedRoutesInput, UserUncheckedCreateWithoutSavedRoutesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedRoutesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedRoutesInput, UserUncheckedUpdateWithoutSavedRoutesInput>
  }

  export type UserUpdateWithoutSavedRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedRoutesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutUserNestedInput
    creditLogs?: CreditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SavedRouteCreateWithoutChargingStationsInput = {
    id?: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp?: number | null
    weatherWind?: number | null
    weatherRain?: number | null
    weatherFactor?: number | null
    weatherLabel?: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary?: string | null
    aiVerdict?: string | null
    aiChargingAdvice?: string | null
    aiOptimalSpeed?: number | null
    aiRiskLevel?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedRoutesInput
  }

  export type SavedRouteUncheckedCreateWithoutChargingStationsInput = {
    id?: string
    userId: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp?: number | null
    weatherWind?: number | null
    weatherRain?: number | null
    weatherFactor?: number | null
    weatherLabel?: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary?: string | null
    aiVerdict?: string | null
    aiChargingAdvice?: string | null
    aiOptimalSpeed?: number | null
    aiRiskLevel?: string | null
    createdAt?: Date | string
  }

  export type SavedRouteCreateOrConnectWithoutChargingStationsInput = {
    where: SavedRouteWhereUniqueInput
    create: XOR<SavedRouteCreateWithoutChargingStationsInput, SavedRouteUncheckedCreateWithoutChargingStationsInput>
  }

  export type SavedRouteUpsertWithoutChargingStationsInput = {
    update: XOR<SavedRouteUpdateWithoutChargingStationsInput, SavedRouteUncheckedUpdateWithoutChargingStationsInput>
    create: XOR<SavedRouteCreateWithoutChargingStationsInput, SavedRouteUncheckedCreateWithoutChargingStationsInput>
    where?: SavedRouteWhereInput
  }

  export type SavedRouteUpdateToOneWithWhereWithoutChargingStationsInput = {
    where?: SavedRouteWhereInput
    data: XOR<SavedRouteUpdateWithoutChargingStationsInput, SavedRouteUncheckedUpdateWithoutChargingStationsInput>
  }

  export type SavedRouteUpdateWithoutChargingStationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedRoutesNestedInput
  }

  export type SavedRouteUncheckedUpdateWithoutChargingStationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutCreditLogsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    vehicles?: VehicleCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreditLogsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    vehicles?: VehicleUncheckedCreateNestedManyWithoutUserInput
    savedRoutes?: SavedRouteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreditLogsInput, UserUncheckedCreateWithoutCreditLogsInput>
  }

  export type UserUpsertWithoutCreditLogsInput = {
    update: XOR<UserUpdateWithoutCreditLogsInput, UserUncheckedUpdateWithoutCreditLogsInput>
    create: XOR<UserCreateWithoutCreditLogsInput, UserUncheckedCreateWithoutCreditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreditLogsInput, UserUncheckedUpdateWithoutCreditLogsInput>
  }

  export type UserUpdateWithoutCreditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    vehicles?: VehicleUncheckedUpdateManyWithoutUserNestedInput
    savedRoutes?: SavedRouteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type VehicleCreateManyUserInput = {
    id?: string
    label: string
    rangeKm: number
    isPreset?: boolean
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type SavedRouteCreateManyUserInput = {
    id?: string
    originName: string
    originLat: number
    originLon: number
    destName: string
    destLat: number
    destLon: number
    batteryPercent: number
    vehicleRangeKm: number
    distanceKm: number
    durationMin: number
    elevationGainM: number
    weatherTemp?: number | null
    weatherWind?: number | null
    weatherRain?: number | null
    weatherFactor?: number | null
    weatherLabel?: string | null
    totalBatteryUsed: number
    remainingBattery: number
    effectiveRange: number
    willReachDestination: boolean
    safetyBuffer: number
    aiSummary?: string | null
    aiVerdict?: string | null
    aiChargingAdvice?: string | null
    aiOptimalSpeed?: number | null
    aiRiskLevel?: string | null
    createdAt?: Date | string
  }

  export type CreditLogCreateManyUserInput = {
    id?: string
    amount: number
    reason: string
    balanceAfter: number
    createdAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    rangeKm?: IntFieldUpdateOperationsInput | number
    isPreset?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    rangeKm?: IntFieldUpdateOperationsInput | number
    isPreset?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    rangeKm?: IntFieldUpdateOperationsInput | number
    isPreset?: BoolFieldUpdateOperationsInput | boolean
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedRouteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chargingStations?: ChargingStopSnapshotUpdateManyWithoutSavedRouteNestedInput
  }

  export type SavedRouteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chargingStations?: ChargingStopSnapshotUncheckedUpdateManyWithoutSavedRouteNestedInput
  }

  export type SavedRouteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originName?: StringFieldUpdateOperationsInput | string
    originLat?: FloatFieldUpdateOperationsInput | number
    originLon?: FloatFieldUpdateOperationsInput | number
    destName?: StringFieldUpdateOperationsInput | string
    destLat?: FloatFieldUpdateOperationsInput | number
    destLon?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: IntFieldUpdateOperationsInput | number
    vehicleRangeKm?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationMin?: FloatFieldUpdateOperationsInput | number
    elevationGainM?: FloatFieldUpdateOperationsInput | number
    weatherTemp?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherWind?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherRain?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherFactor?: NullableFloatFieldUpdateOperationsInput | number | null
    weatherLabel?: NullableStringFieldUpdateOperationsInput | string | null
    totalBatteryUsed?: FloatFieldUpdateOperationsInput | number
    remainingBattery?: FloatFieldUpdateOperationsInput | number
    effectiveRange?: IntFieldUpdateOperationsInput | number
    willReachDestination?: BoolFieldUpdateOperationsInput | boolean
    safetyBuffer?: IntFieldUpdateOperationsInput | number
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    aiVerdict?: NullableStringFieldUpdateOperationsInput | string | null
    aiChargingAdvice?: NullableStringFieldUpdateOperationsInput | string | null
    aiOptimalSpeed?: NullableIntFieldUpdateOperationsInput | number | null
    aiRiskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChargingStopSnapshotCreateManySavedRouteInput = {
    id?: string
    externalId?: string | null
    name: string
    address?: string | null
    lat: number
    lon: number
    connectors: number
    fastCharge?: boolean
    powerKw?: number | null
    network?: string | null
    source?: string | null
    batteryAtPoint?: number | null
    isNeeded?: boolean
    isCritical?: boolean
    routeFraction?: number | null
  }

  export type ChargingStopSnapshotUpdateWithoutSavedRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    connectors?: IntFieldUpdateOperationsInput | number
    fastCharge?: BoolFieldUpdateOperationsInput | boolean
    powerKw?: NullableFloatFieldUpdateOperationsInput | number | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    batteryAtPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    isNeeded?: BoolFieldUpdateOperationsInput | boolean
    isCritical?: BoolFieldUpdateOperationsInput | boolean
    routeFraction?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ChargingStopSnapshotUncheckedUpdateWithoutSavedRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    connectors?: IntFieldUpdateOperationsInput | number
    fastCharge?: BoolFieldUpdateOperationsInput | boolean
    powerKw?: NullableFloatFieldUpdateOperationsInput | number | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    batteryAtPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    isNeeded?: BoolFieldUpdateOperationsInput | boolean
    isCritical?: BoolFieldUpdateOperationsInput | boolean
    routeFraction?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ChargingStopSnapshotUncheckedUpdateManyWithoutSavedRouteInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    lat?: FloatFieldUpdateOperationsInput | number
    lon?: FloatFieldUpdateOperationsInput | number
    connectors?: IntFieldUpdateOperationsInput | number
    fastCharge?: BoolFieldUpdateOperationsInput | boolean
    powerKw?: NullableFloatFieldUpdateOperationsInput | number | null
    network?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    batteryAtPoint?: NullableFloatFieldUpdateOperationsInput | number | null
    isNeeded?: BoolFieldUpdateOperationsInput | boolean
    isCritical?: BoolFieldUpdateOperationsInput | boolean
    routeFraction?: NullableFloatFieldUpdateOperationsInput | number | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SavedRouteCountOutputTypeDefaultArgs instead
     */
    export type SavedRouteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SavedRouteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountDefaultArgs instead
     */
    export type AccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VerificationTokenDefaultArgs instead
     */
    export type VerificationTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VerificationTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VehicleDefaultArgs instead
     */
    export type VehicleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VehicleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SavedRouteDefaultArgs instead
     */
    export type SavedRouteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SavedRouteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChargingStopSnapshotDefaultArgs instead
     */
    export type ChargingStopSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChargingStopSnapshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CreditLogDefaultArgs instead
     */
    export type CreditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CreditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GeocodeCacheDefaultArgs instead
     */
    export type GeocodeCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GeocodeCacheDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StationSearchCacheDefaultArgs instead
     */
    export type StationSearchCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StationSearchCacheDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}