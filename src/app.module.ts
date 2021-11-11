import { Module } from '@nestjs/common';
import { XlsxParserModule } from './xlsxParser/xlsxParser.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    XlsxParserModule,
    ApiModule,
  ],
})
export class AppModule {}
