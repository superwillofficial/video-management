"use strict";

const Controller = require("egg").Controller;
const _ = require("lodash");

const { success, failure, successWithPage } = require("../result");
const { getUUID, filterOptional, filterAttribute, parsePageIntoNumber } = require("../util/util");
const { PAGE_INFO } = require("../util/config");

class VideoInfoController extends Controller {
  async createVideoInfo() {
    const { ctx } = this;
    const defaultData = {
      // id 设为空, 让数据库自增
      // id: getUUID("create_videoInfo"),
    };
    const data = Object.assign(defaultData, ctx.request.body);
    const rule = {
      // id: 'string',
      categoryId: 'number',
      video: 'string',
      title: 'string',
      status: 'optional/status',
      memo: 'optional/string',
    };
    // 过滤规则
    const filterRule = filterOptional(rule, data);
    // 过滤数据
    const filterData = filterAttribute(filterRule, data);
    try {
      ctx.validate(filterRule, filterData);
      const result = await ctx.service.videoInfo.createVideoInfo(
        filterData
      );
      ctx.body = success(result);
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }
  async updateVideoInfo() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    const rule = {
      categoryId: 'optional/number',
      video: 'optional/string',
      title: 'optional/string',
      status: 'optional/status',
      memo: 'optional/string',
    };
    // 过滤规则
    const filterRule = filterOptional(rule, data);
    // 过滤数据
    const filterData = filterAttribute(filterRule, data);
    try {
      ctx.validate(filterRule, filterData);
      const result = await ctx.service.videoInfo.updateVideoInfo(
        id,
        filterData
      );
      ctx.body = success(result);
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }
  async deleteVideoInfo() {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      const result = await ctx.service.videoInfo.deleteVideoInfo(id);
      ctx.body = success(result);
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }
  async listVideoInfo() {
    const { ctx } = this;
    const defaultData = {
      ...PAGE_INFO,
    };
    const data = parsePageIntoNumber({ ...defaultData, ...ctx.request.query });
    const rule = {
      id: 'optional/string',
      status: 'optional/status',
      title: 'optional/string',
      categoryId: "optional/string",
      pageIndex: "optional/number",
      pageSize: "optional/number",
    };
    // 过滤规则
    const filterRule = filterOptional(rule, data);
    // 过滤数据
    const filterData = filterAttribute(filterRule, data);
    try {
      ctx.validate(filterRule, filterData);
      const pageInfo = {
        pageIndex: filterData.pageIndex,
        pageSize: filterData.pageSize,
      };
      _.unset(filterData, "pageIndex");
      _.unset(filterData, "pageSize");
      const result = await ctx.service.videoInfo.listVideoInfo(
        filterData,
        pageInfo
      );
      ctx.body = successWithPage(result);
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }
}

module.exports = VideoInfoController;
