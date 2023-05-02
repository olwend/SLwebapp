export default {
    MAX_ATTACHMENT_SIZE:20000000,
    s3: {
        BUCKET: process.env.REACT_APP_S3_BUCKET_NAME,
        REGION: process.env.REACT_APP_S3_DEFAULT_REGION
    },
    apiGateway: {
        REGION: process.env.REACT_APP_AWS_DEFAULT_REGION,
        URL: process.env.REACT_APP_GATEWAY_URL,
        X_API_KEY: process.env.REACT_APP_GATEWAY_KEY
    },
    slsApi: {
        URL: process.env.REACT_APP_SLS_API_URL
    },
    cognito: {
        REGION: process.env.REACT_APP_COGNITO_AWS_DEFAULT_REGION,
        USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID
    },
    CLUSTER_NAME: process.env.REACT_APP_ECS_CLUSTER_NAME,
    SUBNET: process.env.REACT_APP_ECS_SUBNET,
    ZONEID: process.env.REACT_APP_ROUTE53_ZONEID,
    CAPTCHA_SITE_KEY: process.env.REACT_APP_CAPTCHA_SITE_KEY
};

