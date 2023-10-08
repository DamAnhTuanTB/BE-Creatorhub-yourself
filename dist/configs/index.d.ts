declare const _default: () => {
    MONGO_URL: string;
    AWS: {
        PRIVATE_KEY: string;
        CDN: string;
        ACCESS_KEY: string;
    };
    S3: {
        BUCKET: string;
        REGION: string;
    };
    MAIL: {
        MAIL_HOST: string;
        MAIL_USER: string;
        MAIL_PASSWORD: string;
    };
    PAYMENT: {
        STRIPE_PUBLIC_KEY: string;
        STRIPE_SECRET_KEY: string;
        STRIPE_WEBHOOK_ENDPOINT_SECRET: string;
    };
    GOOGLE_OAUTH: {
        GOOGLE_CLIENT_ID: string;
        GOOGLE_SECRET: string;
        CALLBACK_URL: string;
    };
    FACEBOOK_OAUTH: {
        FACEBOOK_APP_ID: string;
        FACEBOOK_APP_SECRET: string;
        CALLBACK_URL: string;
    };
};
export default _default;
