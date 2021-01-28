// Aqui declaro a função que irá interagir com a tabela Posts
module.exports = (sequelize, dataTypes) => {
  // Aqui defino os campos que irei utilizar
  const post = sequelize.define('Post', {
    title: dataTypes.STRING,
    content: dataTypes.STRING,
    userId: dataTypes.INTEGER,
    published: dataTypes.DATE,
    updated: dataTypes.DATE,
  }, { timestamps: false });

  post.associate = (model) => {
    post.belongsTo(model.User, { foreignKey: 'userId', as: 'user' });
  };

  return post;
};
