/**
 * 系统通用常量配置
 */
const keyMirror = (options) => _.reduce(options, (p, v) => (p[v] = `${v}`, p), {});

/**
 * 通用判断
 */
export const ENABLED = {
  YES: 'YES',
  NO: 'NO',
};
export const ENABLED_DESC = {
  [ENABLED.YES]: '是',
  [ENABLED.NO]: '否',
};

/**
 * 月份
 */
export const MONTHS = {
  Jan: '1月',
  Feb: '2月',
  Mar: '3月',
  Apr: '4月',
  May: '5月',
  Jun: '6月',
  Jul: '7月',
  Aug: '8月',
  Sep: '9月',
  Oct: '10月',
  Nov: '11月',
  Dec: '12月',
};

/**
 * 性别
 */
export const GENDER = {
  MALE: 1,         // 男性
  FEMALE: 2,     // 女性
};
export const GENDER_DESC = {
  [GENDER.MALE]: '男',
  [GENDER.FEMALE]: '女',
};

/**
 * 可编辑
 */
export const EDITABLE = {
  EDITABLE: 1,         // 可编辑
  UNEDITABLE: 0,     // 不可编辑
};
export const EDITABLE_DESC = {
  [EDITABLE.EDITABLE]: '可编辑',
  [EDITABLE.UNEDITABLE]: '不可编辑',
};

/**
 * 状态
 */
export const STATUS = {
  NOT_RESPONDING: 0,
  SUCCESS: 1,
  FAILURE: 2,
};
export const STATUS_DESC = {
  [STATUS.NOT_RESPONDING]: "未应答",
  [STATUS.SUCCESS]: "成功",
  [STATUS.FAILURE]: "失败",
};


/**
 * 数据请求返回码(错误类型)
 */
export const RESMSG = {
  DATABASE_EXCEPTION: -1,
  SUCCESS: 1,
  USERNAME_NOEXIST: 1001,
  PASSWORD_ERROR: 1002,
  NOLOGIN: 1003,
  UPDATE_FAIL: 1005,
  ERROR: 1006,
  AVAILABLE: 1100,
  UNAVAILABLE: 1101,
  PHONE_UNAVAILABLE: 1102,
  USERNAME_UNAVAILABLE: 1103,
  REGISTER_FAIL: 1104,
  NOAUTH: 401,
  NOT_FOUND: 404,
  INVALID: 4003,
  EXPIRE: 4001,
  FAIL: 4002
};
export const RESMSG_DESC = {
  [RESMSG.DATABASE_EXCEPTION]: '数据库异常或请求失败',
  [RESMSG.SUCCESS]: '成功',
  [RESMSG.USERNAME_NOEXIST]: '账号不存在',
  [RESMSG.PASSWORD_ERROR]: '密码错误',
  [RESMSG.UPDATE_FAIL]: '更新信息失败',
  [RESMSG.NOLOGIN]: '未登陆状态',
  [RESMSG.ERROR]: '系统错误',
  [RESMSG.AVAILABLE]: '账号手机都可用',
  [RESMSG.UNAVAILABLE]: '账号手机均不可用',
  [RESMSG.PHONE_UNAVAILABLE]: '手机号不可用',
  [RESMSG.USERNAME_UNAVAILABLE]: '账号不可用',
  [RESMSG.REGISTER_FAIL]: '注册失败',
  [RESMSG.NOAUTH]: '无操作权限',
  [RESMSG.NOT_FOUND]: '页面没找到',
  [RESMSG.INVALID]: 'Token无效',
  [RESMSG.EXPIRE]: 'Token过期',
  [RESMSG.FAIL]: '验证不通过'
};

/**
 * 完成值类型
 */
export const COMPLETION_VALUE = {
  EXPECT: 'expect',   // 预计
  REAL: 'fact',       // 实际
};
export const COMPLETION_VALUE_DESC = {
  [COMPLETION_VALUE.EXPECT]: '快报',
  [COMPLETION_VALUE.REAL]: '报告',
};

/**
 * 机构类型
 */
export const ORGNAIZATION_TYPE = {
  BRANCH: 1,                         // 分行
  KEY_MIDDLE_CENTER_BRANCH: 2,       // 重点中支
  SINGLE_ROW_CENTER_BRANCH: 3,       // 单列中支
  OTHER_CENTER_BRANCH: 4,            // 其他中支
  BUSINESS_HEADQUARTERS: 5,          // 业务总部一组
  SUB_BRANCH: 6,                     // 支行
  BUSINESS_HEADQUARTERS_TOW: 7,      // 业务总部二组
};
export const ORGNAIZATION_TYPE_DESC = {
  [ORGNAIZATION_TYPE.BRANCH]: '分行',                            // 分行
  [ORGNAIZATION_TYPE.KEY_MIDDLE_CENTER_BRANCH]: '重点中支',       // 重点中支
  [ORGNAIZATION_TYPE.SINGLE_ROW_CENTER_BRANCH]: '单列中支',       // 单列中支
  [ORGNAIZATION_TYPE.OTHER_CENTER_BRANCH]: '其他中支',            // 其他中支
  [ORGNAIZATION_TYPE.BUSINESS_HEADQUARTERS]: '业务总部一组',        // 业务总部一组
  [ORGNAIZATION_TYPE.SUB_BRANCH]: '支行',                        // 支行
  [ORGNAIZATION_TYPE.BUSINESS_HEADQUARTERS_TOW]: '业务总部二组',    // 业务总部二组
};

// 银行部门层级
export const ORGNAIZATION_LEVEL = {
  BRANCH: 1,
  CENTRAL: 2,
  SUB_BRANCH: 3,
};
export const ORGNAIZATION_LEVEL_DESC = {
  [ORGNAIZATION_LEVEL.BRANCH]: "分行",
  [ORGNAIZATION_LEVEL.CENTRAL]: "中心支行/业务部",
  [ORGNAIZATION_LEVEL.SUB_BRANCH]: "支行/社区支行/其他部门",
};

// 可见数据类型
export const VISIBLE_TYPE = {
  GROUP: 1,
  SELF: 2,
};

export const VISIBLE_TYPE_DESC = {
  [VISIBLE_TYPE.GROUP]: "本组及下属分组",
  [VISIBLE_TYPE.SELF]: "仅见本人",
};

/**
 * 完成进度/结果生成类型
 */
export const RESULT_GENERATION_TYPE = {
  EXPECT: 1,
  FACT: 2,
};
export const RESULT_GENERATION_TYPE_DESC = {
  [RESULT_GENERATION_TYPE.EXPECT]: "快报",
  [RESULT_GENERATION_TYPE.FACT]: "报告"
};
export const PROGRESS_TYPE_DESC = {
  [RESULT_GENERATION_TYPE.EXPECT]: "快报",
  [RESULT_GENERATION_TYPE.FACT]: "报告"
};


/**
 * 权限类型
 */
export const AUTH_TYPE = {
  CLASS: 'class',
  PAGE: 'page',
  API: 'api',
  BTN: 'btn'
};
export const AUTH_TYPE_DESC = {
  [AUTH_TYPE.CLASS]: '一级模块',
  [AUTH_TYPE.PAGE]: '页面',
  [AUTH_TYPE.API]: 'api',
  [AUTH_TYPE.BTN]: '按钮',
};

/**
 * ----------------------------------------
 * 以下为聚会社交业务服务数据库设计中的常量设定
 */
/**
 * 活动类型
 */
export const ACTIVITY_TYPE = {
  OTHER: '00',
  BUSINESS: '01',
  SOCIAL: '02',
};
export const ACTIVITY_TYPE_DESC = {
  [ACTIVITY_TYPE.OTHER]: '其他(未分类)',
  [ACTIVITY_TYPE.BUSINESS]: '商务局',
  [ACTIVITY_TYPE.SOCIAL]: '社交局',
};

/**
 * 活动(局)状态
 */
export const ACTIVITY_STATUS = {
  INITIAL: '0',
  CONFIRMED: '1',
  PUBLISHED: '2',
  START_MONEY_COLLECTION: '3',
  FINISH_MONEY_COLLECTION: '4',
  GROUP_SUCCESS: '5',
  ACTIVITY_BEGIN: '6',
  GROUP_FAIL: '-1',
};
export const ACTIVITY_STATUS_DESC = {
  [ACTIVITY_STATUS.INITIAL]: '初始/待确认',
  [ACTIVITY_STATUS.CONFIRMED]: '已确认/待发布',
  [ACTIVITY_STATUS.PUBLISHED]: '已发布/招募中',
  [ACTIVITY_STATUS.START_MONEY_COLLECTION]: '开始收款',
  [ACTIVITY_STATUS.FINISH_MONEY_COLLECTION]: '完成收款',
  [ACTIVITY_STATUS.GROUP_SUCCESS]: '组局成功',
  [ACTIVITY_STATUS.ACTIVITY_BEGIN]: '活动开始',
  [ACTIVITY_STATUS.GROUP_FAIL]: '组局失败',
};

/**
 * 活动创建模式
 */
export const ACTIVITY_CREATE_MODE = {
  ACTIVE: '01',
  INVITED: '02',
};
export const ACTIVITY_CREATE_MODE_DESC = {
  [ACTIVITY_CREATE_MODE.ACTIVE]: '局长主动创建',
  [ACTIVITY_CREATE_MODE.INVITED]: '局长受邀被动创建',
};

/**
 * 付款形式
 */
export const PAYMENT_FORM = {
  FREE: 0,
  PAY_BY_CREATOR: 1,
  GO_DUTCH: 2,
  BOYS_GO_DUTCH: 3,
};
export const PAYMENT_FORM_DESC = {
  [PAYMENT_FORM.FREE]: '免费',
  [PAYMENT_FORM.PAY_BY_CREATOR]: '局长请客',
  [PAYMENT_FORM.GO_DUTCH]: 'AA',
  [PAYMENT_FORM.BOYS_GO_DUTCH]: '男生AA',
};

/**
 * 用户参与活动方式
 */
export const USER_PART_MODE = {
  OTHER: '00',
  INITIATE: '01',
  PLAN: '02',
  SERVICE_PROVIDING: '03',
  PARTICIPATION: '04',
};
export const USER_PART_MODE_DESC = {
  [USER_PART_MODE.OTHER]: '其他(未分类)',
  [USER_PART_MODE.INITIATE]: '发局',
  [USER_PART_MODE.PLAN]: '策划',
  [USER_PART_MODE.SERVICE_PROVIDING]: '提供服务',
  [USER_PART_MODE.PARTICIPATION]: '普通参与',
};

/**
 * 审核状态
 */
export const REVIEW_STATUS = {
  PENDING: '0',
  PASSED: '1',
  UNPASSED: '-1',
};
export const REVIEW_STATUS_DESC = {
  [REVIEW_STATUS.PENDING]: '待审核',
  [REVIEW_STATUS.PASSED]: '审核通过',
  [REVIEW_STATUS.UNPASSED]: '审核不通过',
};

/**
 * 交易渠道编码
 */
export const TRANS_CHANNEL_CODE = {
  ALIPAY: '0001',
  WECHATPAY: '0002',
  UNIONPAY: '0003',
  OFFLINE: '9998',
  OTHER: '9999',
};
export const TRANS_CHANNEL_CODE_DESC = {
  [TRANS_CHANNEL_CODE.ALIPAY]: '支付宝',
  [TRANS_CHANNEL_CODE.WECHATPAY]: '微信',
  [TRANS_CHANNEL_CODE.UNIONPAY]: '云闪付',
  [TRANS_CHANNEL_CODE.OFFLINE]: '线下',
  [TRANS_CHANNEL_CODE.OTHER]: '其他',
};

/**
 * 订单状态
 */
export const ORDER_STATUS = {
  TO_BE_PAID: '0',
  PAYING: '1',
  PAYMENT_SUCCESSFUL: '2',
  REFUNDING: '3',
  REFUND_SUCCESSFUL: '4',
  PAYMENT_FAILED: '-1',
  REFUND_FAILED: '-2',
};
export const ORDER_STATUS_DESC = {
  [ORDER_STATUS.TO_BE_PAID]: '待支付',
  [ORDER_STATUS.PAYING]: '支付中',
  [ORDER_STATUS.PAYMENT_SUCCESSFUL]: '支付成功',
  [ORDER_STATUS.REFUNDING]: '退款中',
  [ORDER_STATUS.REFUND_SUCCESSFUL]: '退款成功',
  [ORDER_STATUS.PAYMENT_FAILED]: '支付失败',
  [ORDER_STATUS.REFUND_FAILED]: '退款失败',
};

/**
 * 退款状态
 */
export const REFUND_STATUS = {
  TO_BE_REFUNDED: '0',
  REFUNDING: '3',
  REFUND_SUCCESSFUL: '4',
  REFUND_FAILED: '4',
};
export const REFUND_STATUS_DESC = {
  [REFUND_STATUS.TO_BE_REFUNDED]: '待退款',
  [REFUND_STATUS.REFUNDING]: '退款中',
  [REFUND_STATUS.REFUND_SUCCESSFUL]: '退款成功',
  [REFUND_STATUS.REFUND_FAILED]: '退款失败',
};

/**
 * 活动标签类型
 */
export const ACTIVITY_TAG_TYPE = {
  OTHER: '00',
};
export const ACTIVITY_TAG_TYPE_DESC = {
  [ACTIVITY_TAG_TYPE.OTHER]: '其他(未分类)'
};

/**
 * 活动主题标签类型
 */
export const ACTIVITY_THEME_TAG_TYPE = {
  OTHER: '00',
};
export const ACTIVITY_THEME_TAG_TYPE_DESC = {
  [ACTIVITY_THEME_TAG_TYPE.OTHER]: '其他(未分类)'
};

/**
 * 活动行程标签类型
 */
export const PROJECT_TAG_TYPE = {
  OTHER: '00',
};
export const PROJECT_TAG_TYPE_DESC = {
  [PROJECT_TAG_TYPE.OTHER]: '其他(未分类)'
};

/**
 * 评论标签类型
 */
export const COMMENT_TAG_TYPE = {
  OTHER: '00',
  STARTER: '01',
  PLANNER: '02',
  SERVANT: '03',
  PARTICIPANT: '04',
  ACTIVITY: '05',
};
export const COMMENT_TAG_TYPE_DESC = {
  [COMMENT_TAG_TYPE.OTHER]: '其他(未分类)',
  [COMMENT_TAG_TYPE.STARTER]: '发局者',
  [COMMENT_TAG_TYPE.PLANNER]: '策划者',
  [COMMENT_TAG_TYPE.SERVANT]: '服务者',
  [COMMENT_TAG_TYPE.PARTICIPANT]: '参与者',
  [COMMENT_TAG_TYPE.ACTIVITY]: '活动',
};

/**
 * 兴趣爱好标签类型
 */
export const HOBBIT_TAG_TYPE = {
  OTHER: '00',
  SPORTS: '01',
  TECHNOLOGY: '02'
};
export const HOBBIT_TAG_TYPE_DESC = {
  [HOBBIT_TAG_TYPE.OTHER]: '其他(未分类)',
  [HOBBIT_TAG_TYPE.SPORTS]: '体育',
  [HOBBIT_TAG_TYPE.TECHNOLOGY]: '科技',
};

/**
 * 饮食倾向标签类型
 */
export const DIET_PREFER_TAG_TYPE = {
  OTHER: '00',
  CANTONESE: '01',
  SICHUAN: '02'
};
export const DIET_PREFER_TAG_TYPE_DESC = {
  [DIET_PREFER_TAG_TYPE.OTHER]: '其他(未分类)',
  [DIET_PREFER_TAG_TYPE.CANTONESE]: '粤菜',
  [DIET_PREFER_TAG_TYPE.SICHUAN]: '川菜',
};

/**
 * 性格标签类型
 */
export const CHARACTER_TAG_TYPE = {
  OTHER: '00',
};
export const CHARACTER_TAG_TYPE_DESC = {
  [CHARACTER_TAG_TYPE.OTHER]: '其他(未分类)'
};

/**
 * 是否热门
 */
export const IS_HOT = {
  NO: 0,
  YES: 1,
};
export const IS_HOT_DESC = {
  [IS_HOT.NO]: '否',
  [IS_HOT.YES]: '是',
};

/**
 * 发布状态
 */
export const PUBLIC_STATUS = {
  NO: '0',
  YES: '1',
};
export const PUBLIC_STATUS_DESC = {
  [PUBLIC_STATUS.NO]: '待发布',
  [PUBLIC_STATUS.YES]: '已发布',
};
