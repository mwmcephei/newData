import { Document } from 'mongoose';
export declare type NotificationDocument = Notification & Document;
export declare class Notification {
    [x: string]: any;
    title: string;
    body: string;
    time: string;
    type: string;
    measure: string;
    seen: boolean;
    notified: boolean;
}
export declare const NotificationSchema: import("mongoose").Schema<Document<Notification, any, any>, import("mongoose").Model<Document<Notification, any, any>, any, any>, undefined, {}>;
