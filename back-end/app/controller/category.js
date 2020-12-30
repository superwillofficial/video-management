"use strict";

const Controller = require("egg").Controller;
const _ = require("lodash");

const { success, failure, successWithPage } = require("../result");
const { getUUID, filterOptional, filterAttribute, tree, parsePageIntoNumber } = require("../util/util");
const { PAGE_INFO } = require("../util/config");

class CategoryController extends Controller {
  async createCategory() {
    const { ctx } = this;
    const defaultData = {
      // id 设为空, 让数据库自增
      // id: getUUID("create_category"),
    };
    const data = Object.assign(defaultData, ctx.request.body);
    const rule = {
      // id: 'number',
      category: 'string',
      parentId: 'optional/number',
    };
    // 过滤规则
    const filterRule = filterOptional(rule, data);
    // 过滤数据
    const filterData = filterAttribute(filterRule, data);
    try {
      ctx.validate(filterRule, filterData);
      const result = await ctx.service.category.createCategory(
        filterData
      );
      ctx.body = success(result);
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }

  async updateCategory() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    const rule = {
      category: 'string',
      parentId: 'number',
    };
    // 过滤规则
    const filterRule = filterOptional(rule, data);
    // 过滤数据
    const filterData = filterAttribute(filterRule, data);
    try {
      ctx.validate(filterRule, filterData);
      const result = await ctx.service.category.updateCategory(
        id,
        filterData
      );
      ctx.body = success(result);
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }

  async deleteCategory() {
    const { ctx } = this;
    const id = ctx.params.id;
    try{
      const result = await ctx.service.category.deleteCategory(id);
      ctx.body = success(result);
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }

  async listCategory() {
    const { ctx } = this;
    const defaultData = {
      ...PAGE_INFO,
    };
    const data = parsePageIntoNumber({ ...defaultData, ...ctx.request.query });
    const rule = {
      id: 'optional/string',
      category: 'optional/string',
      parentId: 'optional/string',
      pageIndex: "optional/number",
      pageSize: "optional/number",
    };
    // 过滤规则
    const filterRule = filterOptional(rule, data);
    // 过滤数据
    const filterData = filterAttribute(filterRule, data);
    try{
      ctx.validate(filterRule, filterData);
      const pageInfo = {
        pageIndex: filterData.pageIndex,
        pageSize: filterData.pageSize,
      };
      _.unset(filterData, "pageIndex");
      _.unset(filterData, "pageSize");
      const result = await ctx.service.category.listCategory(
        filterData,
        pageInfo
      );
      ctx.body = successWithPage(result);
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }

  async treeListCategory() {
    const { ctx } = this;
    const data = ctx.request.query;
    const rule = {
      id: 'optional/string',
    };
    // 过滤规则
    const filterRule = filterOptional(rule, data);
    // 过滤数据
    const filterData = filterAttribute(filterRule, data);
    try {
      ctx.validate(filterRule, filterData);
      const result = await ctx.service.category.treeListCategory();
      ctx.body = success(tree(result));
    } catch (error) {
      this.logger.error(error);
      ctx.body = failure(String(error));
    }
  }
}

module.exports = CategoryController;
