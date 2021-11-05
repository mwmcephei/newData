"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDir = exports.mapFileCategoryToFilename = exports.xlsxFileFilter = exports.ApiController = exports.SetNotificationDto = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("./api.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const globalVars_1 = require("../globalVars");
class SetNotificationDto {
}
exports.SetNotificationDto = SetNotificationDto;
let ApiController = class ApiController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    getMeasure(params) {
        return this.apiService.getMeasure(params.measureID);
    }
    getArtefactsOfMeasure(params) {
        return this.apiService.getArtefactsOfMeasure(params.measureID);
    }
    async getMeasureID(params) {
        const measureID = await this.apiService.getMeasureID(params.measureTitle);
        return measureID;
    }
    getOverview() {
        return this.apiService.getOverview();
    }
    getAllMeasures() {
        return this.apiService.getAllMeasures();
    }
    getBudget() {
        return this.apiService.getBudget();
    }
    getPastBudgets() {
        return this.apiService.getPastBudgets();
    }
    async getNotifications(params) {
        const allAsBool = params.all === 'true';
        const result = await this.apiService.getNotifications(allAsBool);
        if (result) {
            await this.apiService.setToNotified(result);
        }
        return result;
    }
    setAllNotificationsToSeen() {
        return this.apiService.setAllNotificationsToSeen();
    }
    checkForNewNotifications() {
        return this.apiService.checkForNewNotifications();
    }
    async existingFiles() {
        const filesInBuffer = await this.apiService.filesInParseBuffer();
        const filesAlreadyParsed = await (0, exports.listDir)(globalVars_1.rootPath + '/src/realData/');
        return {
            filesInBuffer,
            filesAlreadyParsed,
        };
    }
    async upload(category, file) {
        await this.apiService.createNotificationForFileChange(category.name);
        const targetFileName = (0, exports.mapFileCategoryToFilename)(category.name);
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return this.apiService.handleFileUpload(file.originalname, targetFileName);
    }
};
__decorate([
    (0, common_1.Get)('measure/:measureID'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getMeasure", null);
__decorate([
    (0, common_1.Get)('measure/:measureID/artefacts'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getArtefactsOfMeasure", null);
__decorate([
    (0, common_1.Get)('measure/id/:measureTitle'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getMeasureID", null);
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('measures'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getAllMeasures", null);
__decorate([
    (0, common_1.Get)('budget'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getBudget", null);
__decorate([
    (0, common_1.Get)('pastBudget'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getPastBudgets", null);
__decorate([
    (0, common_1.Get)('getNotifications/:all'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)('setAllNotificationsToSeen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "setAllNotificationsToSeen", null);
__decorate([
    (0, common_1.Get)('checkForNewNotifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "checkForNewNotifications", null);
__decorate([
    (0, common_1.Get)('existingFiles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "existingFiles", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './files',
            filename: function (req, file, callback) {
                callback(null, file.originalname);
            },
        }),
        fileFilter: exports.xlsxFileFilter,
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "upload", null);
ApiController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
exports.ApiController = ApiController;
const xlsxFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
        return callback(new Error('Only xlsx files are allowed!'), false);
    }
    callback(null, true);
};
exports.xlsxFileFilter = xlsxFileFilter;
const mapFileCategoryToFilename = (fileName) => {
    switch (parseInt(fileName)) {
        case 1:
            return globalVars_1.fileNamesWithoutExtension[0] + '.xlsx';
        case 2:
            return globalVars_1.fileNamesWithoutExtension[1] + '.xlsx';
        case 3:
            return globalVars_1.fileNamesWithoutExtension[2] + '.xlsx';
        case 4:
            return globalVars_1.fileNamesWithoutExtension[3] + '.xlsx';
        case 5:
            return globalVars_1.fileNamesWithoutExtension[4] + '.xlsx';
        default:
            return 'none';
    }
};
exports.mapFileCategoryToFilename = mapFileCategoryToFilename;
const listDir = async (path) => {
    const fs = require('fs');
    const fsPromises = fs.promises;
    try {
        return fsPromises.readdir(path);
    }
    catch (err) {
        console.error('Error occured while reading directory!', err);
    }
};
exports.listDir = listDir;
//# sourceMappingURL=api.controller.js.map