const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  video_title: {
    type: String,
    required: true
  },
  video_media_id: {
    type: String,
    required: true
  },
  video_channel_title: {
    type: String,
  },
  video_yt_id:{
    type:String,
  },
  video_nft_id:{
    type:String,
  },
  
  video_owner_handle: {
    type: String,
    required: true
  },
  video_curator:{
    type: String,
    default:''
  },
  video_check_flag:{
    type: Boolean,
    default:false
  },
  video_check_description:{
    type: String,
    default:''
  },
  video_check_tag:{
    type: Array,
  },
  // avatar: {
  //   type: String
  // },
  video_createdAt: {
    type: Date,
    reqired:true
  },

  video_checkedAt: {
    type: Date,
  }
});

module.exports = mongoose.model('video', VideoSchema);
