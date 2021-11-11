import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Measure } from './measure.schema';
export declare type SheetDocument = Sheet & Document;
export declare class Sheet {
    name: string;
    totalBudget: number;
    totalSpentBudget: number;
    totalInvoicedBudget: number;
    totalPlanBudget: number;
    totalForecastBudget: number;
    overallStatus: number;
    progress: number;
    monthNames: string[];
    kpiPlans: string[];
    kpiDates: string[];
    statusDate: string;
    budgetDate: string;
    kpiProgress: number;
    measures: [Measure];
}
export declare const SheetSchema: mongoose.Schema<mongoose.Document<Sheet, any, any>, mongoose.Model<mongoose.Document<Sheet, any, any>, any, any>, undefined, {}>;
