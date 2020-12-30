"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post("/category", controller.category.createCategory);
  router.put("/category/:id", controller.category.updateCategory);
  router.delete("/category/:id", controller.category.deleteCategory);
  router.get("/category/list", controller.category.listCategory);
  router.get("/category/treeList", controller.category.treeListCategory);

  router.post("/videoInfo", controller.videoInfo.createVideoInfo);
  router.put("/videoInfo/:id", controller.videoInfo.updateVideoInfo);
  router.delete("/videoInfo/:id", controller.videoInfo.deleteVideoInfo);
  router.get("/videoInfo/list", controller.videoInfo.listVideoInfo);
};