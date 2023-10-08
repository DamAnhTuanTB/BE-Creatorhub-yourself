export declare enum TypeUseEnum {
    AI_ART = "AI_ART",
    ENHANCE = "ENHANCE",
    REMOVE_BACKGROUND = "REMOVE_BACKGROUND",
    CROP = "CROP"
}
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    redirectUrl: string;
}
export declare class QueryTypeUseDto {
    type: TypeUseEnum;
}
