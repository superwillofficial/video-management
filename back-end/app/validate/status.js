const _ = require("lodash");

const { PUBLIC_STATUS } = require("../util/enum");

module.exports = app => {
  let { validator } = app;

  validator.addRule('status', (rule, value) => {
    for (const i in PUBLIC_STATUS) {
      if (PUBLIC_STATUS[i] === value) {
        return true;
      }
    }
    throw new Error('状态值只能为 0 或 1');
  });
};
