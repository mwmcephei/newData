import { Test, TestingModule } from '@nestjs/testing';
import { XlsxParserService } from './xlsxParser.service';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artefact } from '../schemas/artefact.schema';
import { ArtefactTEMP } from '../schemas/artefactTEMP.schema';
import { Measure } from '../schemas/measure.schema';
import { MeasureTEMP } from '../schemas/measureTEMP.schema';
import { Sheet } from '../schemas/sheet.schema';
import { SheetTEMP } from '../schemas/sheetTEMP.schema';
import { Budget } from '../schemas/budget.schema';
import { BudgetTEMP } from '../schemas/budgetTEMP.schema';
import { PastBudget } from '../types';
import { Notification } from '../schemas/notification.schema';
import { NotificationStatus } from '../schemas/notificationStatus.schema';
import { Upload } from '../schemas/upload.schema';

describe('XlsxParserService', () => {
  let service: XlsxParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XlsxParserService,
        { provide: getModelToken('Artefact'), useValue: {} },
        { provide: getModelToken('ArtefactTEMP'), useValue: {} },
        { provide: getModelToken('Measure'), useValue: {} },
        { provide: getModelToken('MeasureTEMP'), useValue: {} },
        { provide: getModelToken('Sheet'), useValue: {} },
        { provide: getModelToken('SheetTEMP'), useValue: {} },
        { provide: getModelToken('Budget'), useValue: {} },
        { provide: getModelToken('BudgetTEMP'), useValue: {} },
        { provide: getModelToken('PastBudget'), useValue: {} },
        { provide: getModelToken('Notification'), useValue: {} },
        {
          provide: getModelToken('NotificationStatus'),
          useValue: {},
        },
        { provide: getModelToken('Upload'), useValue: {} },
      ],
    }).compile();

    service = module.get<XlsxParserService>(XlsxParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
