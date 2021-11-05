import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamesWithoutExtension, rootPath } from '../globalVars';
import { ExistingFiles } from '../types';

export class SetNotificationDto {
  title: string;
  body: string;
  seen: boolean;
}

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // returns measure wth a certain ID
  @Get('measure/:measureID')
  getMeasure(@Param() params) {
    return this.apiService.getMeasure(params.measureID);
  }

  // returns the artefacts of a measure wth a certain ID
  @Get('measure/:measureID/artefacts')
  getArtefactsOfMeasure(@Param() params) {
    return this.apiService.getArtefactsOfMeasure(params.measureID);
  }

  // returns the database id of a measure with a certain title (e.g. "M274")
  @Get('measure/id/:measureTitle')
  async getMeasureID(@Param() params) {
    const measureID = await this.apiService.getMeasureID(params.measureTitle);
    return measureID;
  }

  // returns the "Sheet" table containing information concerning all measures
  @Get('overview')
  getOverview() {
    return this.apiService.getOverview();
  }

  // returns a list of all entries from the measures table
  @Get('measures')
  getAllMeasures() {
    return this.apiService.getAllMeasures();
  }

  // returns the "Budget" table containing information concerning all measures
  @Get('budget')
  getBudget() {
    return this.apiService.getBudget();
  }

  // returns the "PastBudgets" table containing information concerning old measures
  @Get('pastBudget')
  getPastBudgets() {
    return this.apiService.getPastBudgets();
  }

  // returns notifications from database
  // param 'all' determines whether all notifications or only those where notified === false
  @Get('getNotifications/:all')
  async getNotifications(@Param() params) {
    const allAsBool = params.all === 'true';
    const result = await this.apiService.getNotifications(allAsBool);
    if (result) {
      await this.apiService.setToNotified(result);
    }
    return result;
  }

  // set property "seen" to true for all unseen notifications
  @Get('setAllNotificationsToSeen')
  setAllNotificationsToSeen() {
    return this.apiService.setAllNotificationsToSeen();
  }

  // currently not in use
  @Get('checkForNewNotifications')
  checkForNewNotifications() {
    return this.apiService.checkForNewNotifications();
  }

  // returns names of files currently in the parse buffer (/data) and currently parsed data (/src/realData)
  @Get('existingFiles')
  async existingFiles(): Promise<ExistingFiles> {
    const filesInBuffer = await this.apiService.filesInParseBuffer();
    const filesAlreadyParsed = await listDir(rootPath + '/src/realData/');
    return {
      filesInBuffer,
      filesAlreadyParsed,
    };
  }

  // uploads file into the parse buffer
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: function (req, file, callback) {
          callback(null, file.originalname);
        },
      }),
      fileFilter: xlsxFileFilter,
    }),
  )
  async upload(@Body() category, @UploadedFile() file) {
    await this.apiService.createNotificationForFileChange(category.name);
    const targetFileName = mapFileCategoryToFilename(category.name);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return this.apiService.handleFileUpload(file.originalname, targetFileName);
  }
}

export const xlsxFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(xlsx)$/)) {
    return callback(new Error('Only xlsx files are allowed!'), false);
  }
  callback(null, true);
};

export const mapFileCategoryToFilename = (fileName: string): string => {
  switch (parseInt(fileName)) {
    case 1:
      return fileNamesWithoutExtension[0] + '.xlsx';
    case 2:
      return fileNamesWithoutExtension[1] + '.xlsx';
    case 3:
      return fileNamesWithoutExtension[2] + '.xlsx';
    case 4:
      return fileNamesWithoutExtension[3] + '.xlsx';
    case 5:
      return fileNamesWithoutExtension[4] + '.xlsx';
    default:
      return 'none';
  }
};

export const listDir = async (path): Promise<string[] | undefined> => {
  const fs = require('fs');
  const fsPromises = fs.promises;
  try {
    return fsPromises.readdir(path);
  } catch (err) {
    console.error('Error occured while reading directory!', err);
  }
};
