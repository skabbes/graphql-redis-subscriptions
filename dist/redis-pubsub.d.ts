/// <reference types="node" />
import { Cluster, Ok, Redis, RedisOptions } from 'ioredis';
import { PubSubEngine } from 'graphql-subscriptions';
declare type RedisClient = Redis | Cluster;
declare type OnMessage<T> = (message: T) => void;
declare type SubscribeOptions = {
    pattern?: boolean;
    includeChannel?: boolean;
    [key: string]: any;
};
export interface PubSubRedisOptions {
    connection?: RedisOptions;
    triggerTransform?: TriggerTransform;
    connectionListener?: (err: Error) => void;
    publisher?: RedisClient;
    subscriber?: RedisClient;
    reviver?: Reviver;
    serializer?: Serializer;
    deserializer?: Deserializer;
    messageEventName?: string;
    pmessageEventName?: string;
}
export declare class RedisPubSub implements PubSubEngine {
    constructor(options?: PubSubRedisOptions);
    publish<T>(trigger: string, payload: T): Promise<void>;
    subscribe<T = any>(trigger: string, onMessage: OnMessage<T>, options?: SubscribeOptions): Promise<number>;
    unsubscribe(subId: number): void;
    asyncIterator<T>(triggers: string | string[], options?: SubscribeOptions): AsyncIterator<T>;
    getSubscriber(): RedisClient;
    getPublisher(): RedisClient;
    close(): Promise<Ok[]>;
    private readonly serializer?;
    private readonly deserializer?;
    private readonly triggerTransform;
    private readonly redisSubscriber;
    private readonly redisPublisher;
    private readonly reviver;
    private readonly subscriptionMap;
    private readonly subsRefsMap;
    private currentSubscriptionId;
    private onMessage;
}
export declare type Path = Array<string | number>;
export declare type Trigger = string | Path;
export declare type TriggerTransform = (trigger: Trigger, channelOptions?: unknown) => string;
export declare type Reviver = (key: any, value: any) => any;
export declare type Serializer = (source: any) => string;
export declare type Deserializer = (source: string | Buffer) => any;
export {};
