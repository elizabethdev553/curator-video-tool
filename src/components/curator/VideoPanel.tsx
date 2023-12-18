import './view.css'

import { Button, Card, Col, Divider, Form, Input, Row,Select, Table } from 'antd';
import React, { useState } from 'react';

const flag = false;
export interface VideosProps {
  results: any;
}
const VideoPanel : React.FC<VideosProps> = ({ results }: VideosProps) => {
 
  return (
    <section className="view_video">
      <Row>
        {(
          <video
            src={`https://dwg.joystream.name/distributor/api/v1/assets/${results}`}
            controls
            width="100%" height="620px"
            style={{borderRadius:'12px'}}
          ></video>
        )}
      </Row>
    </section>
  );
};
export default VideoPanel;
