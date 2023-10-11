import {Test, TestingModule} from '@nestjs/testing';
import {RedisService} from './redis.service';

describe('RedisService', () => {
    let service: RedisService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RedisService],
        }).compile();

        service = module.get<RedisService>(RedisService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should PONG', async () => {
        const response = await service.getClient().ping();

        expect(response).toEqual('PONG')
    });

    it(`should set 'test' key with val of 'ing'`, async () => {
        await service.set('test', 'ing', {
            ex: 60,
            toJson: false
        });

        const val = await service.get('test', {
            fromJson: false
        });

        expect(val).toEqual('ing');
    })
});
