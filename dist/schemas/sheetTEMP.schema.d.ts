import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MeasureTEMP } from './measureTEMP.schema';
export declare type SheetTEMPDocument = SheetTEMP & Document;
export declare class SheetTEMP {
    name: string;
    totalBudget: number;
    totalSpentBudget: number;
    totalInvoicedBudget: number;
    totalPlanBudget: number;
    totalForecastBudget: number;
    overallStatus: number;
    progress: number;
    kpiPlans: string[];
    kpiDates: string[];
    statusDate: string;
    budgetDate: string;
    kpiProgress: number;
    monthNames: string[];
    measures: [MeasureTEMP];
}
export declare const SheetTEMPSchema: mongoose.Schema<mongoose.Document<SheetTEMP, any, any>, mongoose.Model<mongoose.Document<SheetTEMP, any, any>, any, any>, undefined, {}>;
