const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    }
  }
);

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;
