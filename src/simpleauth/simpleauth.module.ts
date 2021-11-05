import { Module } from '@nestjs/common';
import { UserSchema } from 'src/schemas/user.schema';
import { SimpleAuthController } from './simpleAuth.controller';
import { SimpleAuthService } from './simpleAuth.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [SimpleAuthController],
  providers: [SimpleAuthService],
})
export class SimpleAuthModule {}
