import { Test, TestingModule } from '@nestjs/testing';
import { SimpleAuthController } from './simpleauth.controller';
import { SimpleAuthService } from './simpleAuth.service';

describe('SimpleauthController', () => {
  let controller: SimpleAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimpleAuthController],
      providers: [{ provide: SimpleAuthService, useValue: {} }],
    }).compile();

    controller = module.get<SimpleAuthController>(SimpleAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
