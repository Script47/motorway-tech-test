import {Injectable} from '@nestjs/common';
import * as Redis from 'redis';

type RedisCommandArgument = string | Buffer;
type RedisSetOptions = {
    ex: number
    toJson: boolean
}
type RedisGetOptions = {
    fromJson: boolean
}

@Injectable()
export class RedisService {
    private readonly client: Redis.RedisClientType

    constructor() {
        this.client = Redis.createClient({
            url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
        });

        (async () => {
            try {
                await this.client.connect();
            } catch (e) {
                console.error('failed to connect to redis', e)
            }
        })()
    }

    public getClient(): Redis.RedisClientType {
        return this.client
    }

    public async set(
        key: RedisCommandArgument, val: any, opts: RedisSetOptions = {
            ex: parseInt(process.env.CACHE_TTL) || 60,
            toJson: true
        }
    ) {
        try {
            val = opts.toJson ? JSON.stringify(val) : val

            await this.client.set(key, val, {
                EX: opts.ex
            })
        } catch (e) {
            console.error(`failed to set key '${key}' with value '${val}'`, e)
        }
    }

    public async get(key: RedisCommandArgument, opts: RedisGetOptions = {fromJson: true}) {
        try {
            const val = await this.client.get(key);

            if (!val) {
                return null;
            }

            return opts.fromJson ? JSON.parse(val) : val
        } catch (e) {
            console.error(`failed to get key '${key}'`, e)
        }
    }
}
