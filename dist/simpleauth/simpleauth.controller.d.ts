import { SimpleAuthService } from './simpleAuth.service';
export declare class UserDataDto {
    username: string;
    password: string;
}
export declare class SimpleAuthController {
    private SimpleAuthService;
    constructor(SimpleAuthService: SimpleAuthService);
    login(userData: UserDataDto): Promise<{
        login: boolean;
    }>;
    addUser(): Promise<void>;
}
