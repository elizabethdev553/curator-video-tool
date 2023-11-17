import { Button, Card, Col, Divider, Form, Input, Row, Select, Table,Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../../components/layout/Spinner';
import View from './View';

const { TextArea } = Input;

interface Assignment {
  key: string;
  video_title: string;
  video_link: string;
  video_owner_handle: string;
  video_curator: string;
}

type FieldType = {
  description?: string;
  remember?:boolean
};

const VideoCheck = () => {
  const [videoDetail, setVideoDetail] = useState<Assignment>();
  const [msg, setMsg] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getVideoDetail(id);
  }, [id]);

  async function getVideoDetail(video_id: string | undefined) {
    try {
      const response = await axios.get(`http://localhost:5000/api/curator/check/${video_id}`, {
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

  async function saveDescriptionResult(description: string, video_id: string | undefined) {
    const data = { description, video_id };
    try {
      const response = await axios.post('http://localhost:5000/api/curator/check/description', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sendVideoListResponse = response.data;
      setMsg(sendVideoListResponse.Success);
    } catch (error) {
      console.log(error, 'Fetch Description Error');
    }
  }

  const onFinish = (values: any) => {
    saveDescriptionResult(values.description, id);
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Divider />

            <Row>
              <Col span={10}>
                <Card title="Video Detail" extra={<a href="#">More</a>} style={{ textAlign: 'left' }}>
                  <p><b>Video ID:</b> {videoDetail.key}</p>
                  <p><b>Video Curator:</b> {videoDetail.video_curator}</p>
                  <p><b>Video Link:</b>{videoDetail.video_link}</p>
                  <p><b>Video Owner:</b> {videoDetail.video_owner_handle}</p>
                  <p><b>Video Title:</b> {videoDetail.video_title}</p>
                </Card>

                <Form.Item<FieldType>
                  label="description"
                  name="description"
                  // rules={[{ required: true, message: 'Please input your description!' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                  <Checkbox>Check</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button size="large" htmlType="submit">
                    Save
                  </Button>
                  <Link to="/curator-panel" className="btn btn-primary">
                    Close
                  </Link>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={12}>
                <View />
              </Col>
            </Row>
          </Form>
        </Fragment>
      )}
    </section>
  );
};

export default VideoCheck;
