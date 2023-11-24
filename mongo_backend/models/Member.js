const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  authority:{
    type:String,
    default:'guest'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('member', MemberSchema);
