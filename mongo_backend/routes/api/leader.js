const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Member = require('../../models/Member');
const Video = require('../../models/Video');

router.get('/video-list/:date', async (req, res) => {
  try {
    const date= req.params.date
    const dateGt= new Date(date)
    const dateLt= new Date(date + "T23:59:59.999Z")
    const video_lists = await Video.find({ video_createdAt: { $gte: dateGt, $lt: dateLt } })
    .sort({
      video_createdAt: -1
    })

    if (!video_lists) {
      return res.status(400).json({ msg: 'There is no videos or you already assigned.' });
    }

    res.json(video_lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/assignment/:date', async (req, res) => {
  try {
    const date= req.params.date
    const dateGt= new Date(date)
    const dateLt= new Date(date + "T23:59:59.999Z")
    // console.log(dateGt, dateLt, "welcome")
    const video_lists = await Video.find({ video_createdAt: { $gte: dateGt, $lt: dateLt },video_yt_id:null, video_check_flag: false})

    if (!video_lists) {
      return res.status(400).json({ msg: 'There is no videos or you already assigned.' });
    }

    res.json(video_lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/checked-list', async (req, res) => {
  try {
    const video_lists = await Video.find({video_check_flag:true})

    if (!video_lists) {
      return res.status(400).json({ msg: 'There is no checked videos.' });
    }

    res.json(video_lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/upload', async (req, res) => {
  try {
    // const tmp = JSON.parse(req.body.tmp)
    await Promise.all(req.body.map(async (item) => {
      let tmp = await Video.findOne({ key: item.key });
      if(!tmp){
        const newVideo = new Video({
          key: item.key,
          video_title: item.video_title,
          video_media_id: item.video_media_id,
          video_owner_handle: item.video_owner_handle,
          video_channel_title: item.video_channel_title,
          video_createdAt: item.video_createdAt,
          video_yt_id:item.video_yt_id,
          video_nft_id:item.video_nft_id
        });
        const savedVideo = await newVideo.save();
      }
    }));
    res.json({ success: "you saved videos successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/curator-list',
  auth,
  // check('video_title', 'video_title is required').notEmpty(),
  // check('video_link', 'video_link is required').notEmpty(),
  // check('video_owner_handle', 'video_owner_handle is required').notEmpty(),
  // check('key', 'key is required').notEmpty(),
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      req.body.map(item=>{
// console.log(item, "TIME")
        const newVideo = new Video({
          key: item.key,
          video_title: item.video_title,
          video_link: item.video_link,
          video_owner_handle: item.video_owner_handle,
          video_channel_id: item.video_channel_id,  
          video_createdAt: item.video_createdAt,  
        });
  
        const savedVideo = newVideo.save();
      })

      res.json({success:"you saved videos successfully."});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/curator-list', async (req, res) => {
  try {
    // console.log("WELBOME")
    let memberListTmp = await Member.find({handle:{$ne:'goldwolf'}});

    if (!memberListTmp) {
      return res.status(400).json({ msg: 'There is no member for this group' });
    }

    res.json(memberListTmp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.delete('/curator-list/:id', async (req, res) => {
  try {
    const email=req.params.id;
    let member = await Member.findOne({email:email});

    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }

    await member.remove();

    res.json({ msg: 'Member removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/assignment/send-video-list', async (req, res) => {
  try {
    await Promise.all(req.body.selectList.map(async (item) => {
      const filter = { key: item };
      const update = { $set: { video_curator: req.body.curator } };
      await Video.updateOne(filter, update);
    }));

    res.json({Success:"Success"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;