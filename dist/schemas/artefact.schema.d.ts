import * as mongoose from 'mongoose';
export declare const ArtefactSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<mongoose.Document<any, any, any>, any, any>, undefined, {}>;
export interface Artefact {
    id: number;
    description: string;
    progress: number;
    budget: string;
    achievement: string;
    work: string;
}
