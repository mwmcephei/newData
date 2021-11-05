import { Test, TestingModule } from '@nestjs/testing';
import { SimpleAuthService } from './simpleAuth.service';
import { getModelToken } from '@nestjs/mongoose';

describe('SimpleAuthService', () => {
  let service: SimpleAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimpleAuthService,
        { provide: getModelToken('User'), useValue: {} },
      ],
    }).compile();

    service = module.get<SimpleAuthService>(SimpleAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
