import { QueryTypeUseDto } from './dto/index.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(user: any): Promise<{
        data: any;
    }>;
    useCredits(query: QueryTypeUseDto, userId: string): Promise<{
        message: string;
    }>;
}
