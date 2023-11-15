import { Button, Card, Col, Divider, Form, Input, Row,Select, Table } from 'antd';
import React, { useState } from 'react';

const flag = false;
const View = () => {
  // const { council, setCouncil } = useSelectedCouncil();
  const [key, setkey] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const handleButtonClick = () => {
    // let video = <video controls src="https://distributor.adovrn.xyz/distributor/api/v1/assets/${key}" />;
    setShowVideo(true);
  };

  return (
    <section className="view_video">
      <Row>
        <Col>
          <Input
            type="text"
            placeholder="Input video id"
            onChange={(e) => {
              setkey(e.target.value);
            }}
            value={key}
            id="key"
          ></Input>
        </Col>
        <Col>
          <Button type="primary" className="btn btn-primary" onClick={handleButtonClick}>
            Ok
          </Button>
        </Col>
      </Row>

      <Row>
        {showVideo && (
          <video
            src={`https://distributor.adovrn.xyz/distributor/api/v1/assets/${key}`}
            controls
          ></video>
        )}
      </Row>
    </section>
  );
};
export default View;
