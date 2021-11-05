import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artefact } from '../schemas/artefact.schema';
import { Measure } from '../schemas/measure.schema';
import { Sheet } from '../schemas/sheet.schema';
import { Budget } from '../schemas/budget.schema';
import { PastBudget } from '../types';
import { Notification } from '../schemas/notification.schema';
import { NotificationStatus } from '../schemas/notificationStatus.schema';
import { Upload } from '../schemas/upload.schema';

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [{ provide: ApiService, useValue: {} }],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
