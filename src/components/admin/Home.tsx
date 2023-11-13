import './home.css';

import React from 'react';
import { Col, Row } from 'react-bootstrap';

import {
  Channels,
  CouncilSelect,
  // Memberships,
  Videos,
} from '@/components';
import { useSelectedCouncil } from '@/store';

export default function Home() {
  const { council, setCouncil } = useSelectedCouncil();

  return (
    <div style={{ backgroundColor: 'black' }} className='view_video'>
      <h1 className='text-white'>Joystream Council Voter Dashboard</h1>
      <hr className='text-white' />
      <CouncilSelect council={council} onChange={setCouncil} />
      <hr style={{ height: '3px', color: 'white' }} />
      <Row>
        <Col md={6}>
          <Channels />
        </Col>
        <Col md={6}>
          <Videos />
        </Col>
      
      </Row>
    
    </div>
  );
}
