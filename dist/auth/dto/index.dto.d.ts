export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class ForgetPasswordDto {
    email: string;
    redirectUrl: string;
}
export declare class CreateNewPasswordDto {
    token: string;
    password: string;
}
export declare class GetAgainVerifyUser {
    email: string;
    redirectUrl: string;
}
export declare class GenerateNewTokenDto {
    refreshToken: string;
}
