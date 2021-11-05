import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { getModelToken } from '@nestjs/mongoose';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ApiService, useValue: {} },
        { provide: getModelToken('Artefact'), useValue: {} },
        { provide: getModelToken('Measure'), useValue: {} },
        { provide: getModelToken('Sheet'), useValue: {} },
        { provide: getModelToken('Budget'), useValue: {} },
        { provide: getModelToken('PastBudget'), useValue: {} },
        { provide: getModelToken('Notification'), useValue: {} },
        {
          provide: getModelToken('NotificationStatus'),
          useValue: {},
        },
        { provide: getModelToken('Upload'), useValue: {} },
      ],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
