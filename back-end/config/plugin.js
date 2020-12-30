'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // redis: {
  //   enable: true,
  //   package: "egg-redis",
  // },
  // io: {
  //   enable: true,
  //   package: "egg-socket.io",
  // },
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
