const _ = require("lodash");

// const getUUID = function (pre, userId) {
//   //生成规则：前缀+时间戳+随机数+userId
//   const timeStamp = new Date().getTime().toString();
//   const randomNumber = Math.ceil(Math.random() * 10).toString();
//   const uuid = pre + timeStamp + randomNumber + userId;
//   return uuid;
// };

const getUUID = function (pre) {
  //生成规则：前缀+时间戳+随机数
  const timeStamp = new Date().getTime().toString().slice(-7);
  const randomNumber = Math.ceil(Math.random() * 1000).toString();
  const uuid = timeStamp + randomNumber;
  return parseInt(uuid, 10);
};

/**
 * 过滤规则
 * noPass不是外部传入
 */
const filterOptional = (rule, data) => {
  const result = {};
  for (let i in rule) {
    const splitStr = _.split(rule[i], "/", 2);
    switch (splitStr[0]) {
      case "optional":
        if (splitStr[1] && data[i]) {
          result[i] = splitStr[1];
        }
        break;
      case "noPass":
        break;
      default:
        result[i] = splitStr[0];
        break;
    }
  }
  return result;
};

/**
 * 过滤目的数据中，源数据没有的属性
 * @param {object} rule
 * @param {object} data
 */
const filterAttribute = (rule, data) => {
  const obj = {};
  for (let i in rule) {
    obj[i] = data[i];
  }
  return obj;
};

/**
 * 将数据中的 pageIndex & pageSize 转为 Number
 * @param {object} data
 */
const parsePageIntoNumber = data => {
  data['pageIndex'] = parseInt(data['pageIndex'], 10);
  data['pageSize'] = parseInt(data['pageSize'], 10);
  return data;
}

/**
 * 生成树
 * @param {object} array
 */
const tree = (items, id = 0, link = 'parentId') => 
  items
    .filter(item => item[link] == id)
    .map(item => ({ ...item, children: tree(items, item.id) }));

module.exports = {
  getUUID,
  filterOptional,
  filterAttribute,
  parsePageIntoNumber,
  tree,
};
