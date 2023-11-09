import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import {
  Channels,
  CouncilSelect,
  // Memberships,
  Videos,
} from '@/components';
import './view.css';
import { useSelectedCouncil } from '@/store';

let flag = false;
const View=()=> {
  // const { council, setCouncil } = useSelectedCouncil();
  const [key, setkey] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  
  const handleButtonClick = () => {
  let  video =<video controls src="https://distributor.adovrn.xyz/distributor/api/v1/assets/${key}" />
  setShowVideo(true);
  };

  return (
    <div style={{ backgroundColor: 'black' }} className='view-video'>
      <h1>Video Check Panel</h1>
      <input
        type="text"
        placeholder="Input video id"
        onChange={(e) => {setkey(e.target.value)}}
        value={key}
        id="key"
        
      ></input>
      <button type="button" className="btn btn-primary" onClick={handleButtonClick}>
        Ok
      </button>
      <Row className='justify-content-center'>
      {showVideo && <video style={{ width: '800px', height: '600px' }} src={`https://distributor.adovrn.xyz/distributor/api/v1/assets/${key}`} controls></video>}
      </Row>
    </div>
  );
}
export default View