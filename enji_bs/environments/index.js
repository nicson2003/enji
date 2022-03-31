const envList = {
  dev: {
    ENVIRONMENTS: 'Development',
    HTTP_PORT: 4001,
    HTTPS_PORT: 5001,
    GREETING_MESSAGE: 'API Running In Development Environment',
    API_WORKS_MESSAGE: 'Development API Works!!!',
    DB_USERNAME: 'db username',
    DB_PASSWORD: 'db password',
    DB_CONNECTION_STR: 'db connection string',
    JWT_SECRET_KEY: 'mysecrettoken',
  },
  sit: {
    ENVIRONMENTS: 'SIT',
    HTTP_PORT: 4002,
    HTTPS_PORT: 5002,
    GREETING_MESSAGE: 'API Running In SiT Environment',
    API_WORKS_MESSAGE: 'SiT API Works!!!',
    DB_USERNAME: 'db username',
    DB_PASSWORD: 'db password',
    DB_CONNECTION_STR: 'db connection string',
    JWT_SECRET_KEY: 'mysecrettoken',
  },
  prod: {
    ENVIRONMENTS: 'PRODUCTION',
    HTTP_PORT: 4003,
    HTTPS_PORT: 5003,
    GREETING_MESSAGE: 'API Running In Production Environment',
    API_WORKS_MESSAGE: 'Production API Works!!!',
    DB_USERNAME: 'db username',
    DB_PASSWORD: 'db password',
    DB_CONNECTION_STR: 'db connection string',
    JWT_SECRET_KEY: 'mysecrettoken',
  },
};

const app_env = process.env.API_ENV;
module.exports = {
  getEnvironmentVariables: function () {
    return envList[app_env] || envList.dev;
  },
};
