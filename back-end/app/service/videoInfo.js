"use strict";

const Service = require("egg").Service;
const Sequelize = require("sequelize");

class VideoInfoService extends Service {
  async createVideoInfo(body) {
    const { ctx } = this;
    const videoInfo = await ctx.model.VideoInfo.create(body);
    return videoInfo;
  }

  async updateVideoInfo(id, params) {
    const { ctx } = this;
    const videoInfo = await ctx.model.VideoInfo.update(params, {
      where: { id },
    });
    return videoInfo;
  }

  async deleteVideoInfo(id) {
    const { ctx } = this;
    const videoInfo = await ctx.model.VideoInfo.destroy({
      where: { id },
    });
    return videoInfo;
  }

  async listVideoInfo(params, pageInfo) {
    const { ctx } = this;

    // 模糊查询使用
    const titleFilter = params.title ?
      { title: { $like: `%${params.title}%` } } : {};
    const paramsFilter = { ...params, ...titleFilter };

    const { count, rows } = await ctx.model.VideoInfo.findAndCountAll({
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
}

module.exports = VideoInfoService;
