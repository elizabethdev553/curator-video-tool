import { Button, Card, Col, Divider, Form, Input, Row, Select, Table, Checkbox, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import VideoPanel from './VideoPanel';
import type { SelectProps } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import api from '../../utils/api';
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

const VideoCheck = ({ curator: { videos } }: any) => {
  const navigate = useNavigate();
  const [videoDetail, setVideoDetail] = useState<Assignment>();
  const [msg, setMsg] = useState('');
  const { id } = useParams();

  const temp: any = {};
  if (videos.length) {
    console.log(videos, 'video_detail');
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

  async function getVideoDetail(video_id: string | undefined) {
    try {
      console.log(video_id, 'video');
      const response = await api.get(`curator/detail/${video_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const videoDetailTmp = response.data;
      setVideoDetail(videoDetailTmp);
      // Do something with the user data
    } catch (error) {
      console.log(error, 'Fetch UnCheckedList Error');
    }
  }

  async function saveDescriptionResult(
    value: any,
    id: any
    // description: string | undefined,
    // video_tabs: string | undefined,
    // video_category: string,
    // video_id: string | undefined
  ) {
    try {
      const data = value;
      data.video_id = id;
      const response = await api.post('/curator/check/description', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sendVideoListResponse = response.data;
      setMsg(sendVideoListResponse.Success);
      navigate('/assigned-list');
    } catch (error) {
      console.log(error, 'Fetch Description Error');
    }
  }

  const onFinish = (values: any) => {
    console.log(values, 'values');
    // if (values.check === true) console.log(values, 'values');
    saveDescriptionResult(values, id);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  let next: any = '';
  let before: any = '';

  return (
    <section className="container">
      {videoDetail == undefined ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Video Check</h1>
          <Form
            layout="vertical"
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={9} style={{ paddingRight: '40px', paddingLeft: '20px' }}>
                <Card title="Video Detail" style={{ textAlign: 'left' }}>
                  <p>
                    <b>Video ID:</b> {videoDetail.key}
                  </p>
                  <p>
                    <b>Video Curator:</b> {videoDetail.video_curator}
                  </p>
                  <p>
                    <b>Video Link:</b>
                    {videoDetail.video_media_id}
                  </p>
                  <p>
                    <b>Video Owner:</b> {videoDetail.video_owner_handle}
                  </p>
                  <p>
                    <b>Video Title:</b> {videoDetail.video_title}
                  </p>
                </Card>

                <Form.Item<FieldType>
                  label="Description"
                  name="video_description"
                  style={{ marginTop: '30px', maxWidth: '100%' }}
                >
                  <TextArea rows={5} defaultValue={videoDetail.video_check_description} />
                </Form.Item>
                <Form.Item name="video_tag" label="If this video was fake, check:">
                  <Select placeholder="Select the list:" defaultValue={videoDetail.video_check_tag}>
                    <Option value="None">None</Option>
                    <Option value="Violence">Violence</Option>
                    <Option value="Porn">Porn</Option>
                    <Option value="Illegal">Illegal</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="video_category" label="Category Level:">
                  <Select defaultValue={videoDetail.video_category}>
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="video_play"
                  label="Entity Play:"
                  rules={[{ required: true, message: 'Please select this!' }]}
                >
                  <Select defaultValue={videoDetail.video_play}>
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="video_duplicate" label="Video Duplicate:">
                  <Select defaultValue={videoDetail.video_duplicate}>
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button size="large" htmlType="submit">
                    Save
                  </Button>
                  {temp.next != 0 ? (
                    <Link to={`/curator-panel/check/${temp?.next}`} className="btn btn-primary">
                      Next
                    </Link>
                  ) : (
                    ''
                  )}
                  {temp.before != 0 ? (
                    <Link to={`/curator-panel/check/${temp?.before}`} className="btn btn-primary">
                      Before
                    </Link>
                  ) : (
                    ''
                  )}
                </Form.Item>
              </Col>
              <Col span={15}>
                <VideoPanel results={videoDetail.video_media_id} />
              </Col>
            </Row>
          </Form>
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

const connector = connect(mapStateToProps, {});

export default connector(VideoCheck);
