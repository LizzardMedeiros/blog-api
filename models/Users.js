// Aqui declaro a função que irá interagir com a tabela User
module.exports = (sequelize, dataTypes) => {
  // Aqui defino os campos que irei utilizar
  const user = sequelize.define('User', {
    // campos
    displayName: dataTypes.STRING,
    email: dataTypes.STRING,
    password: dataTypes.STRING,
    image: dataTypes.STRING,
  });

  user.associate = (model) => {
    user.hasMany(model.Post, { foreignKey: 'userId', as: 'posts' });
  };

  return user;
};
