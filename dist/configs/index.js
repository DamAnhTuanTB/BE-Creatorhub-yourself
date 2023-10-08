"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    MONGO_URL: process.env.MONGO_URI,
    AWS: {
        PRIVATE_KEY: process.env.AWS_SECRET_PRIVATE_KEY,
        CDN: process.env.AWS_SECRET_CDN,
        ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    },
    S3: {
        BUCKET: process.env.S3_SECRET_BUCKET,
        REGION: process.env.S3_SECRET_REGION,
    },
    MAIL: {
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_USER: process.env.MAIL_USER,
        MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    },
    PAYMENT: {
        STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_ENDPOINT_SECRET: process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET,
    },
    GOOGLE_OAUTH: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    },
    FACEBOOK_OAUTH: {
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
        CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL
    },
});
//# sourceMappingURL=index.js.map