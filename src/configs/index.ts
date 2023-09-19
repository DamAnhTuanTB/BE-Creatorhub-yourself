export default () => ({
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URI,
  AWS: {
    PRIVATE_KEY: process.env.AWS_PRIVATE_KEY,
    CDN: process.env.AWS_CDN,
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  },
  S3: {
    BUCKET: process.env.S3_BUCKET,
    REGION: process.env.S3_REGION,
  },
});
