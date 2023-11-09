import React, { useEffect, useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import type { ColumnsType } from 'antd/es/table';
import { Divider, Table, Select, Button, Card, Form, Input, Col, Row } from 'antd';

const { TextArea } = Input;

import Spinner from '../layout/Spinner';
import { View } from '../../pages'

interface Assignment {
  key: string;
  video_title: string;
  video_link: string;
  video_owner_handle: string;
  video_curator: string;
}

type FieldType = {
  description?: string;
};

const VideoCheck = () => {
  const [videoDetail, setVideoDetail] = useState<Assignment>();
  const { id } = useParams();

  useEffect(() => {
    getVideoDetail(id);
  }, [id]);

  console.log(videoDetail, 'SSSSSSSSSSSSS');
  async function getVideoDetail(video_id: String | undefined) {
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

  const onSubmit = (e: any) => {
    e.preventDefault();
    // if(selectList!==undefined && curator !== undefined && selectList.length>0 && curator )
    // sendVideoList(selectList, curator);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // descriptionResult(valus);

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
              <Col span={12}>
                <Card title="Video Detail" extra={<a href="#">More</a>} style={{ textAlign: 'left' }}>
                  <p>Video ID: {videoDetail.key}</p>
                  <p>Video Curator: {videoDetail.video_curator}</p>
                  <p>Video Link: {videoDetail.video_link}</p>
                  <p>Video Owner: {videoDetail.video_owner_handle}</p>
                  <p>Video Title: {videoDetail.video_title}</p>
                </Card>

                <Form.Item<FieldType>
                  label="description"
                  name="description"
                  rules={[{ required: true, message: 'Please input your description!' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                  <Button size="large" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
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
