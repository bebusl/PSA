const bcrypt = require("bcrypt");
const { createSchema } = require("../../helpers");

const schema = createSchema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    hashedPassword: String,
  },
  {
    timestamps: false,
  }
);

schema.virtual("password").set(function (password) {
  this.hashedPassword = bcrypt.hashSync(password, 12);
});

schema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

module.exports = schema;
