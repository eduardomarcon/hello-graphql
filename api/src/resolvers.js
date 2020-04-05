const User = require("./User");

module.exports = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id)
  },

  Mutation: {
    createUser: (_, { name, email }) => User.create({ name, email }),
    updateUser: (_, { id, name, email }) =>
      User.findByIdAndUpdate(id, { name, email }),
    deleteUser: (_, { id }) => User.findByIdAndRemove(id)
  }
};
