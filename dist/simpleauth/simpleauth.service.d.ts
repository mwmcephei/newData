import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
export declare class SimpleAuthService {
    private userModel;
    constructor(userModel: Model<User>);
    login(username: any, password: any): Promise<boolean>;
    addUser(): Promise<void>;
}
