export declare const formatedResponse: (data: any) => any;
export declare const getFileName: (path: string) => string;
export declare const getFileExtension: (path: any) => any;
export declare const getParamsPagination: (args: PagingParms) => {
    skip: number;
    limit: number;
    page: number;
};
export declare const makePaging: <T>(items: T, totalItems: number, params: PagingParms) => PaginResponse<T>;
export declare const handleError: (error: any) => never;
export declare const numberCreditUse: {
    AI_ART: number;
    ENHANCE: number;
    REMOVE_BACKGROUND: number;
    CROP: number;
};
export type GoogleUser = {
    email: string;
    firstName: string;
    lastName: string;
    picture?: string;
    accessToken: string;
    refreshToken?: string;
    paltform: string;
    userType: string;
};
