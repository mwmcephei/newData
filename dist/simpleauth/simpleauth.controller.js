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
exports.SimpleAuthController = exports.UserDataDto = void 0;
const common_1 = require("@nestjs/common");
const simpleAuth_service_1 = require("./simpleAuth.service");
class UserDataDto {
}
exports.UserDataDto = UserDataDto;
let SimpleAuthController = class SimpleAuthController {
    constructor(SimpleAuthService) {
        this.SimpleAuthService = SimpleAuthService;
    }
    async login(userData) {
        const success = await this.SimpleAuthService.login(userData.username, userData.password);
        return {
            login: success,
        };
    }
    addUser() {
        return this.SimpleAuthService.addUser();
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDataDto]),
    __metadata("design:returntype", Promise)
], SimpleAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('adduser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SimpleAuthController.prototype, "addUser", null);
SimpleAuthController = __decorate([
    (0, common_1.Controller)('simpleAuth'),
    __metadata("design:paramtypes", [simpleAuth_service_1.SimpleAuthService])
], SimpleAuthController);
exports.SimpleAuthController = SimpleAuthController;
//# sourceMappingURL=simpleAuth.controller.js.map