const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },

  email: {
    type: String,
    required: [true, "Please provide a email"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false, // change the default behavior at the schema.calls via field selection as '+password'
    minlength: 6,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  type: String,
});

//register route
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//login route
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//json web token (JWT) for register
UserSchema.methods.getSignedToken = function () {
  return bcrypt.JsonWebTokenError.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

//reset jeson web token
UserSchema.methods.getRestPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
