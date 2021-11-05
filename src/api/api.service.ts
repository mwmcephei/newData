import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sheet } from '../schemas/sheet.schema';
import { Measure } from '../schemas/measure.schema';
import { Artefact } from '../schemas/artefact.schema';
import { Budget } from '../schemas/budget.schema';
import { Notification } from '../schemas/notification.schema';
import { NotificationStatus } from '../schemas/notificationStatus.schema';
import { Model } from 'mongoose';
import '../types';
import { PastBudget } from '../types';
import { Upload } from 'src/schemas/upload.schema';
import { dateTimeNow, rootPath } from '../globalVars';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel('Artefact') private artefactModel: Model<Artefact>,
    @InjectModel('Measure') private measureModel: Model<Measure>,
    @InjectModel('Sheet') private sheetModel: Model<Sheet>,
    @InjectModel('Budget') private budgetModel: Model<Budget>,
    @InjectModel('PastBudget') private pastBudgetModel: Model<PastBudget>,
    @InjectModel('Notification') private notificationModel: Model<Notification>,
    @InjectModel('NotificationStatus')
    private notificationStatusModel: Model<NotificationStatus>,
    @InjectModel('Upload') private uploadModel: Model<Upload>,
  ) {}

  async getMeasure(measureID: string): Promise<Measure> {
    try {
      const measure = await this.measureModel.findById(measureID);
      return measure;
    } catch (error) {
      throw error;
    }
  }

  async getArtefactsOfMeasure(measureID: string): Promise<Artefact[]> {
    try {
      const measure = await this.measureModel
        .findById(measureID)
        .sort({ id: 'asc' });
      const populatedMeasure = await measure
        .populate('artefacts')
        .execPopulate();
      return populatedMeasure.artefacts;
    } catch (error) {
      throw error;
    }
  }

  async getMeasureID(measureTitle: string): Promise<string> {
    try {
      const measure = await this.measureModel.findOne({
        title: measureTitle,
      });
      return measure._id;
    } catch (error) {
      throw error;
    }
  }

  async getAllMeasures(): Promise<Measure[]> {
    try {
      const result = await this.measureModel.find().sort({ id: 'asc' });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getOverview(): Promise<Sheet> {
    try {
      const excelSheet = await this.sheetModel.findOne();
      return excelSheet;
    } catch (error) {
      throw error;
    }
  }

  async getBudget(): Promise<Budget> {
    try {
      const budget = await this.budgetModel.findOne();
      return budget;
    } catch (error) {
      throw error;
    }
  }

  async getPastBudgets(): Promise<PastBudget[]> {
    try {
      const result = await this.pastBudgetModel.find();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async setAllNotificationsToSeen(): Promise<Notification[]> {
    try {
      const allNots = await this.notificationModel.find();
      if (allNots) {
        allNots.forEach(async (n) => {
          await n.update({
            seen: true,
          });
        });
      }
      return allNots;
    } catch (error) {
      throw error;
    }
  }

  async getNotifications(all: boolean): Promise<Notification[]> {
    try {
      const result: Notification[] = all
        ? await this.notificationModel.find()
        : await this.notificationModel.find({
            notified: false,
          });
      if (all && result.length > 0) {
        result.forEach(async (n) => {
          await n.update({ notified: true });
        });
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async setToNotified(result: Notification[]): Promise<void> {
    if (result) {
      for (let i = 0; i < result.length; i++) {
        await result[i].update({ notified: true });
      }
    }
  }

  async checkForNewNotifications(): Promise<NotificationStatus> | undefined {
    // route of this function is periodically visited by the frontend to check if change has happened,
    // i.e. that new notifications are availible. Database property/variable 'change' indicates this and is toggled back to false after the visit.
    try {
      const existingChange = await this.notificationStatusModel.findOne();
      if (existingChange) {
        if (existingChange.change) {
          await existingChange.update({
            change: false,
          });
        }
        return existingChange;
      } else {
        // table is empty. Create entry
        const newChange = new this.notificationStatusModel({
          change: false,
        });
        await newChange.save();
        return newChange;
      }
    } catch (error) {
      throw error;
    }
  }

  async handleFileUpload(
    originalname: string,
    targetFileName: string,
  ): Promise<boolean> {
    const fs = require('fs');
    try {
      await fs.promises.rename(
        rootPath + '/files/' + originalname,
        rootPath + '/data/' + targetFileName,
      );
      return true;
    } catch (err) {
      console.error('Error occured while reading directory!', err);
      return false;
    }
  }

  async createNotificationForFileChange(fileCategory: string): Promise<void> {
    let fileName = '';
    switch (parseInt(fileCategory)) {
      case 1:
        fileName = 'Budget Report';
        break;
      case 2:
        fileName = 'KPI Report';
        break;
      case 3:
        fileName = 'Status Report';
        break;
      case 4:
        fileName = 'Measure Overview';
        break;
      case 5:
        fileName = 'All Budgets';
        break;
      default:
        fileName = '';
        break;
    }
    const notification = {
      title: 'File Upload',
      body: 'A new ' + fileName + ' file has been uploaded',
      time: dateTimeNow(),
      type: 'file',
      measure: '',
      seen: false,
      notified: false,
    };
    const newNot = new this.notificationModel(notification);
    await newNot.save();
    const upload = await this.uploadModel.findOne({
      name: fileName,
    });
    if (upload) {
      await upload.update({
        date: new Date().toISOString().split('T')[0],
        ok: true,
      });
    } else {
      const newUpload = new this.uploadModel({
        name: fileName,
        date: new Date().toISOString().split('T')[0],
        ok: true,
      });
      await newUpload.save();
    }
  }

  async filesInParseBuffer(): Promise<Upload[]> {
    try {
      const files = await this.uploadModel.find();
      return files;
    } catch (error) {
      throw error;
    }
  }
}
