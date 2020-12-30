module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Category = app.model.define(
    "category",
    {
      id: { type: STRING, primaryKey: true, autoIncrement: true },
      category: STRING,
      parentId: STRING,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Category;
}
