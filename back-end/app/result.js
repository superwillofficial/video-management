const success = (data) => {
  return {
    code: 0,
    message: "请求成功",
    data: data,
  };
};

const successWithPage = (result) => {
  return {
    code: 0,
    message: "请求成功",
    data: result.data,
    pageInfo: result.pageInfo,
  };
};

const failure = (error) => {
  return {
    code: 1,
    message: "请求失败",
    error: error,
  };
};

module.exports = {
  success,
  failure,
  successWithPage,
};
