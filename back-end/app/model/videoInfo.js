module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const VideoInfo = app.model.define(
    "videoInfo",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      categoryId: {
        type: INTEGER,
        references: { model: app.model.Category, key: "id" },
      },
      video: {
        type: STRING
      },
      title: {
        type: STRING
      },
      status: { type: INTEGER, defaultValue: 0 },
      memo: STRING,
      createTime: { type: DATE, defaultValue: new Date() },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return VideoInfo;
}
