/* eslint valid-jsdoc: "off" */

"use strict";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1606113811362_5897";

  // add your middleware config here
  // config.middleware = ["interceptToken"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      dialect: "mysql",
      host: "192.168.31.197",
      password: "123",
      port: 3306,
      database: "videoInfo",
      operatorsAliases: {
        $like: Op.like,
      }
    },
    // io: {
    //   namespace: {
    //     "/": {
    //       connectionMiddleware: ["auth"],
    //       packetMiddleware: ["filter"],
    //     },
    //   },
    // },
    // redis: {
    //   client: {
    //     port: 6379,
    //     host: "192.168.31.190",
    //     password: "emsoft",
    //     db: 1,
    //   },
    // },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
        ctoken: false,
      },
      domainWhiteList: ['*']
    },
    cors: {
      origin:'*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
