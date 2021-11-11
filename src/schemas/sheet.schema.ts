import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Measure } from './measure.schema';

export type SheetDocument = Sheet & Document;

@Schema()
export class Sheet {
  @Prop()
  name: string;

  @Prop()
  totalBudget: number;
  @Prop()
  totalSpentBudget: number;
  @Prop()
  totalInvoicedBudget: number;
  @Prop()
  totalPlanBudget: number;
  @Prop()
  totalForecastBudget: number;

  @Prop()
  overallStatus: number;
  @Prop()
  progress: number;

  @Prop()
  monthNames: string[];

  @Prop()
  kpiPlans: string[];
  @Prop()
  kpiDates: string[];
  @Prop()
  statusDate: string;
  @Prop()
  budgetDate: string;

  @Prop()
  kpiProgress: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Measure' })
  measures: [Measure];
}

export const SheetSchema = SchemaFactory.createForClass(Sheet);
