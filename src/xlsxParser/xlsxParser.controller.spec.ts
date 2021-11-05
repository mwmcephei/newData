import { Test, TestingModule } from '@nestjs/testing';
import { XlsxParserController } from './xlsxParser.controller';
import { XlsxParserService } from './xlsxParser.service';

describe('XlsxParserController', () => {
  let controller: XlsxParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XlsxParserController],
      providers: [{ provide: XlsxParserService, useValue: {} }],
    }).compile();

    controller = module.get<XlsxParserController>(XlsxParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
