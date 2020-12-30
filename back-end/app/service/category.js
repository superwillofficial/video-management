"use strict";

const Service = require("egg").Service;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class CategoryService extends Service {
  async createCategory(body) {
    const { ctx } = this;
    const category = await ctx.model.Category.create(body);
    return category;
  }

  async updateCategory(id, params) {
    const { ctx } = this;
    const category = await ctx.model.Category.update(params, {
      where: { id },
    });
    return category;
  }

  async deleteCategory(id) {
    const { ctx } = this;
    const category = await ctx.model.Category.destroy({
      where: { id },
    });
    return category;
  }

  async listCategory(params, pageInfo) {
    const { ctx } = this;

    // 模糊查询使用
    const categoryFilter = params.category ? 
      { category: { $like: `%${params.category}%` } } : {};
    const paramsFilter = { ...params, ...categoryFilter };

    const { count, rows } = await ctx.model.Category.findAndCountAll({
      where: paramsFilter,
      limit: pageInfo.pageSize,
      offset: pageInfo.pageSize * (pageInfo.pageIndex - 1),
      raw: true,
    });
    return {
      data: rows,
      pageInfo: { 
        ...pageInfo,
        count
      }
    };
  }

  async treeListCategory() {
    const { ctx } = this;
    const category = await ctx.model.Category.findAll({
      // where: { ...params },
      raw: true,
    });
    return category;
  }
}

module.exports = CategoryService;
