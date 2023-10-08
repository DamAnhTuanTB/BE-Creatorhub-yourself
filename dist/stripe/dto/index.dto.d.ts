export declare enum TypePriceEnum {
    MAIN = "main",
    SALE25 = "sale25",
    SALE50 = "sale50"
}
export declare class CreateOrderDto {
    priceId: string;
    redirectUrl: string;
}
export declare class QueryGetListPriceDto {
    type: TypePriceEnum;
}
