import { Button, Card, Col, Divider, Form, Input, Row, Select, Table, Checkbox, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
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
}

type FieldType = {
  video_description?: string;
};

const VideoCheck = () => {
  const navigate = useNavigate();
  const [videoDetail, setVideoDetail] = useState<Assignment>();
  const [msg, setMsg] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getVideoDetail(id);
  }, [id]);

  async function getVideoDetail(video_id: string | undefined) {
    try {
      const response = await api.get(`/curator/${video_id}`, {
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

  async function saveDescriptionResult(value:any, id:any
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

            <Row>
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
                  <TextArea rows={5} />
                </Form.Item>
                <Form.Item name="video_tag" label="If this video was fake, check:">
                  <Select placeholder="Select the list:">
                    <Option value="Violence">Violence</Option>
                    <Option value="Porn">Porn</Option>
                    <Option value="Illegal">Illegal</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="video_category" label="Category Level:">
                  <Select placeholder="Please select favourite colors">
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="video_play" label="Entity Play:" hasFeedback
                rules={[{ required: true, message: 'Please select this!' }]}>
                  <Select placeholder="Please select favourite colors">
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item name="video_duplicate" label="Video Duplicate:">
                  <Select placeholder="Please select favourite colors">
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button size="large" htmlType="submit">
                    Save
                  </Button>
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

export default VideoCheck;
