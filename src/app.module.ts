import { Module } from '@nestjs/common';
import { XlsxParserModule } from './xlsxParser/xlsxParser.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { SimpleAuthModule } from './simpleAuth/simpleAuth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      //     process.env.MONGODB_CONNECTION_DEV_1,
      //       process.env.MONGODB_CONNECTION_DEV_2,
      process.env.MONGODB_CONNECTION_DEV_3,
      // process.env.MONGODB_CONNECTION_DOCKER
      //  'mongodb://mongo:27017/pmo-nest-mongo'  // Docker
    ),
    XlsxParserModule,
    ApiModule,
    SimpleAuthModule,
  ],
})
export class AppModule {}
