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
interface Assignment {
  key: string;
  video_title: string;
  video_media_id: string;
  video_owner_handle: string;
  video_curator: string;
  video_duplicate: string;
  video_check_tag: string;
  video_play: string;
  video_category: string;
  video_check_description: string;
}

type FieldType = {
  video_description?: string;
};

const initialState:any = {
  video_check_tag: 'None',
  video_category: 'D',
  video_play: 'Yes',
  video_duplicate: 'No',
  video_check_description: '',
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


  useEffect(() => {
    
    if (video) {
      const videoData = { ...initialState };
      for (const key in video) {
        if (key in videoData) videoData[key] = video[key];
      }

      setFormData(videoData);
    }
  }, [video]);
  const { video_check_tag, video_category, video_play, video_duplicate, video_check_description } = formData;

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    // const editing = video.video_check_flag ? true : false;
    e.preventDefault();

    saveDescriptionResult(formData, id);
  };

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
                  <select name="video_check_tag" value={video_check_tag} onChange={onChange}>
                    <option value="None">None</option>
                    <option value="Violence">Violence</option>
                    <option value="Porn">Porn</option>
                    <option value="Illegal">Illegal</option>
                  </select>
                  <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>

                <div className="form-group">
                  <select name="video_category" value={video_category} onChange={onChange}>
                  <option value="D">D</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                  <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>

                <div className="form-group">
                  <select name="video_play" value={video_play} onChange={onChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>

                <div className="form-group">
                  <select name="video_duplicate" value={video_duplicate} onChange={onChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="video_check_description"
                    value={video_check_description}
                    onChange={onChange}
                  />
                  <small className="form-text">Could be your own company or one you work for</small>
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
