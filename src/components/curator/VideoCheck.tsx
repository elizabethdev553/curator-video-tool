import { Button, Card, Col, Divider, Form, Input, Row, Select, Table, Checkbox, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import VideoPanel from './VideoPanel';
const { Option } = Select;
const { TextArea } = Input;
import api from '../../utils/api';
import { saveDescriptionResult, getVideoDetail } from '../../actions/curator';

const initialState: any = {
  video_check_tag: 'None',
  video_category: 'C',
  video_play: 'Yes',
  video_duplicate: 'No',
  video_check_description: '',
  video_check_comment: '',
};

const VideoCheck = ({ saveDescriptionResult, getVideoDetail, curator: { videos, video } }: any) => {
  const { id } = useParams();

  const temp: any = {};
  if (videos.length) {
    videos.map((item: any, key: number) => {
      if (item.key == id) {
        temp.current = key;
        temp.before = key >= 1 ? videos[key - 1].key : 0;
        temp.next = key < videos.length - 1 ? videos[key + 1].key : 0;
      }
    });
  }

  useEffect(() => {
    getVideoDetail(id);
  }, [id]);

  const [formData, setFormData] = useState(initialState);
  const [comment, setComment] = useState(false);
  useEffect(() => {
    if (video) {
      const videoData = { ...initialState };
      for (const key in video) {
        if (key in videoData) videoData[key] = video[key];
      }

      setFormData(videoData);
    }
  }, [video]);
  const { video_check_tag, video_category, video_play, video_duplicate, video_check_description, video_check_comment } = formData;

  const onChange = (e: any) => {
    // if(e.target.value!="other"){
    //   // setComment(false)
      setFormData({ ...formData, [e.target.name]: e.target.value })
    //   console.log(e.target.value, "value")
    // }else{
    //   setComment(true)
      // setFormData({...formData, [e.target.name]:e.target.value})
      // console.log(e.target.value, "other")
    // }

  };

  const onSubmit = (e: any) => {
    // const editing = video.video_check_flag ? true : false;
    e.preventDefault();

    console.log(formData, "DDDDDDDDDDD")
     saveDescriptionResult(formData, id);
  };
  // let Temp:any=''
  // if(comment==true){
  //   Temp = (<textarea name="video_check_comment" value={video_check_comment} onChange={onChange} />)
  // }

  return (
    <section className="container">
      {video == undefined ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Video Check</h1>
          <Row>
            <Col xs={24} xl={8} style={{ paddingRight: '40px', paddingLeft: '20px' }}>
              <Card title="Video Detail" style={{ textAlign: 'left' }}>
                <p>
                  <b>Video ID:</b> {video.key}
                </p>
                <p>
                  <b>Video Curator:</b> {video.video_curator}
                </p>
                <p>
                  <b>Video Link:</b>
                  {video.video_media_id}
                </p>
                <p>
                  <b>Video Owner:</b> {video.video_owner_handle}
                </p>
                <p>
                  <b>Video Title:</b> {video.video_title}
                </p>
              </Card>
              <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                  <small className="form-text">Video Category:</small>
                  <select name="video_category" value={video_category} onChange={onChange}>
                    <option value="C">C</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="Toxic">Toxic Content</option>
                  </select>
                </div>
                <div className="form-group">
                  <small className="form-text">Toxic Content:</small>
                  <select name="video_check_tag" value={video_check_tag} onChange={onChange}>
                    <option value="None">None</option>
                    <option value="Violence">Violence</option>
                    <option value="Porn">Porn</option>
                    <option value="Illegal">Illegal</option>
                  </select>
                </div>

                <div className="form-group">
                  <small className="form-text">Entity Plays:</small>
                  <select name="video_play" value={video_play} onChange={onChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <small className="form-text">Duplicate:</small>
                  <select name="video_duplicate" value={video_duplicate} onChange={onChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                   
                </div>
                <div className="form-group">
                  <small className="form-text">Comment:</small>
                  <select name="video_check_description" value={video_check_description} onChange={onChange}>
                    <option value="Copy music video.">Copy music video.</option>
                    <option value="Copy video from Animation/Cartoon movies.">Copy video from Animation/Cartoon movies.</option>
                    <option value="Copy video from Cinemas/Tv series.">Copy video from Cinemas/Tv series.</option>
                    <option value="Copy video from Games.">Copy video from Games.</option>
                    <option value="Copy video from other social medias.">Copy video from other social medias.</option>
                    <option value="Copy video from YouTube.">Copy video from YouTube.</option>
                    <option value="Good quality video.">Good quality video.</option>
                    <option value="Interesting video.">Interesting video.</option>
                    <option value="Low quality video.">Low quality video.</option>
                    <option value="Low resolution video.">Low resolution video.</option>
                    <option value="Stock video.">Stock video.</option>
                    <option value="Video about Joystream.">Video about Joystream.</option>
                    <option value="Video from creators Youtube channel but not YPP.">Video from creators Youtube channel but not YPP.</option>
                    <option value="Video hasn't finished uploading yet.">Video hasn't finished uploading yet.</option>
                    <option value="Video is in blackscreen.">Video is in blackscreen.</option>
                    <option value="Video is loading slowly.">Video is loading slowly.</option>
                    <option value="Video is unavailable.">Video is unavailable.</option>
                    <option value="other">Other.</option>
                  </select>
                </div>
                <div className="form-group">
                <small className="form-text">If comment: 'other', please insert the description.</small>
                  <textarea name="video_check_comment" rows={3} value={video_check_comment} onChange={onChange} />
                </div>
                
                
                <input type="submit" className="btn btn-primary my-1" />
                {temp.before != 0 ? (
                  <Link to={`/curator-panel/check/${temp?.before}`} className="btn btn-primary">
                    Before
                  </Link>
                ) : (
                  ''
                )}
                {temp.next != 0 ? (
                  <Link to={`/curator-panel/check/${temp?.next}`} className="btn btn-primary">
                    Next
                  </Link>
                ) : (
                  ''
                )}
              </form>
            </Col>
            <Col xs={24} xl={16}>
              <VideoPanel results={video.video_media_id} />
            </Col>
          </Row>
        </Fragment>
      )}
    </section>
  );
};
const mapStateToProps = (state: any) => ({
  curator: state.curator,
  // curator: state.curator,
  // auth: state.auth,
});

const connector = connect(mapStateToProps, { saveDescriptionResult, getVideoDetail });

export default connector(VideoCheck);
