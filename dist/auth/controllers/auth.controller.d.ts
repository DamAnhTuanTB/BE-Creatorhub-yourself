import { CreateUserDto } from '../../user/dto/index.dto';
import { UserService } from '../../user/user.service';
import { AuthService } from '../services/auth.service';
import { CreateNewPasswordDto, ForgetPasswordDto, GenerateNewTokenDto, GetAgainVerifyUser, LoginUserDto } from '../dto/index.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(user: CreateUserDto, loginUser: LoginUserDto): Promise<{
        token: string;
        refreshToken: string;
    }>;
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    verifyUser(token: string): Promise<{
        message: string;
    }>;
    getAgainVerifyUser(query: GetAgainVerifyUser): Promise<{
        message: string;
    }>;
    createNewPassword(body: CreateNewPasswordDto): Promise<{
        message: string;
    }>;
    forgetPassword(body: ForgetPasswordDto): Promise<{
        message: string;
    }>;
    generateNewToken(body: GenerateNewTokenDto): Promise<{
        token: string;
        refreshToken: string;
    }>;
}
