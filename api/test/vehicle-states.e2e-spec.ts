import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import * as request from "supertest";

describe('Vehicle State API', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it(`is the default test case as per the requirement`, () => {
        return request(app.getHttpServer())
            .get(`/vehicle-states/3?timestamp=${encodeURIComponent('2022-09-12 10:00:00+00')}`)
            .expect(200)
            .expect({
                vehicleId: 3,
                state: 'selling',
                timestamp: '2022-09-11 23:21:38+00'
            });
    });

    it(`should return 404 (vehicle doesn't exist)`, () => {
        return request(app.getHttpServer())
            .get(`/vehicle-states/9999?timestamp=${encodeURIComponent('2022-09-12 10:00:00+00')}`)
            .expect(404)
            .expect({
                message: 'Vehicle not found.',
                error: 'Not Found',
                statusCode: 404
            });
    });

    it(`should a return a 404 (vehicle exists, but timestamp is invalid)`, () => {
        return request(app.getHttpServer())
            .get(`/vehicle-states/2?timestamp=${encodeURIComponent('2009-09-10 14:59:01+00')}`)
            .expect(404)
            .expect({
                message: 'Vehicle not found.',
                error: 'Not Found',
                statusCode: 404
            });
    });

    it(`should a return a 400 (timestamp format invalid)`, () => {
        return request(app.getHttpServer())
            .get(`/vehicle-states/3?timestamp=${decodeURIComponent('2022-09-12%2010%3A00%3A00%2B0')}`)
            .expect(400)
            .expect({
                message: ['Invalid date format. Use format (encoded): 0000-00-00 00:00:00+00'],
                error: 'Bad Request',
                statusCode: 400
            });
    });


    it(`should return state as "quoted"`, () => {
        return request(app.getHttpServer())
            .get(`/vehicle-states/2?timestamp=${encodeURIComponent('2022-09-10 14:59:01+00')}`)
            .expect(200)
            .expect({
                vehicleId: 2,
                state: 'quoted',
                timestamp: '2022-09-10 14:59:01+00'
            });
    });

    it(`should return state as "selling"`, () => {
        return request(app.getHttpServer())
            .get(`/vehicle-states/2?timestamp=${encodeURIComponent('2022-09-11 17:03:17+00')}`)
            .expect(200)
            .expect({
                vehicleId: 2,
                state: 'selling',
                timestamp: '2022-09-11 17:03:17+00'
            });
    });

    afterAll(async () => {
        await app.close();
    })
});
