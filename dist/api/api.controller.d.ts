import { ApiService } from './api.service';
import { ExistingFiles } from '../types';
export declare class SetNotificationDto {
    title: string;
    body: string;
    seen: boolean;
}
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    memory(): string;
    getMeasure(params: any): Promise<import("../schemas/measure.schema").Measure>;
    getArtefactsOfMeasure(params: any): Promise<import("../schemas/artefact.schema").Artefact[]>;
    getMeasureID(params: any): Promise<string>;
    getOverview(): Promise<import("../schemas/sheet.schema").Sheet>;
    getAllMeasures(): Promise<import("../schemas/measure.schema").Measure[]>;
    getBudget(): Promise<import("../schemas/budget.schema").Budget>;
    getPastBudgets(): Promise<import("../types").PastBudget[]>;
    getNotifications(params: any): Promise<import("../schemas/notification.schema").Notification[]>;
    setAllNotificationsToSeen(): Promise<import("../schemas/notification.schema").Notification[]>;
    checkForNewNotifications(): Promise<import("../schemas/notificationStatus.schema").NotificationStatus>;
    existingFiles(): Promise<ExistingFiles>;
    upload(category: any, file: any): Promise<boolean>;
}
export declare const xlsxFileFilter: (req: any, file: any, callback: any) => any;
export declare const mapFileCategoryToFilename: (fileName: string) => string;
export declare const listDir: (path: any) => Promise<string[] | undefined>;
