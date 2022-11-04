import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.orm = {
    type: 'mysql',
    host: '47.116.74.106',
    port: 3306,
    username: 'root',
    password: 'zhengsmartms',
    database: 'cool-admin',
    // synchronize: true,
    logging: true,
    // 字符集
    charset: 'utf8mb4',
    // 驱动
    driver: require('mysql2'),
  };

  config.logger = {
    coreLogger: {
      consoleLevel: 'INFO',
    },
  };

  return config;
};
