export declare enum SortDateEnum {
    DECREASE = "DECREASE",
    INCREASE = "INCREASE",
    DEFAULT = "DEFAULT"
}
export declare class CreateStoreDto {
    url: string;
    config: any;
}
export declare class QueryGetListStoreDto {
    page: number;
    limit: number;
    sortDate: SortDateEnum;
}
export declare class QueryDeleteStoreDto {
    idArr: string[];
}
