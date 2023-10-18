const mongoose = require("mongoose");
const { format } = require("date-fns");

const notionSchema = new mongoose.Schema({
  notionText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (date) {
      return format(date, "MM-dd-yyyy HH:mm:ss");
    },
  },
  userName: {
    type: String,
    required: true,
  },
  reactions: {
    type: [String],
  },
});
