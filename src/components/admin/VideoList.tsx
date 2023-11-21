import type { DatePickerProps } from 'antd';
import { DatePicker, Divider, Pagination, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import Spinner from '../../components/layout/Spinner';
import { useVideoCounts,useVideos } from '@/hooks';

import api from '../../utils/api'

interface Assignment {
  key: string;
  video_title: string;
  video_channel_title: string;
  video_owner_handle: string;
  video_curator: string;
  video_createdAt: Date;
}

interface CuratorList {
  handle?: string;
}

const columns: ColumnsType<Assignment> = [
  {
    title: 'video_id',
    dataIndex: 'key',
  },
  {
    title: 'video_title',
    dataIndex: 'video_title',
  },
  {
    title: 'video_channel_title',
    dataIndex: 'video_channel_title',
  },
  {
    title: 'video_owner_handle',
    dataIndex: 'video_owner_handle',
  },
  {
    title: 'video_curator',
    dataIndex: 'video_curator',
  },
  {
    title: 'video_createdAt',
    dataIndex: 'video_createdAt',
  },
];

const today = new Date();

const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const TODAY = `20${year}-${month}-${day}`;

const VideoList = () => {
  const [assignment, setAssignment] = useState<Assignment[]>();
  const [msg, setMsg] = useState('');
  const [date, setDate] = useState<string>(TODAY);
  useEffect(() => {
    getVideoList(date);
  }, [msg, date]);

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  async function getVideoList(date: string) {
    try {
      const response = await axios.get(`http://localhost:5000/api/leader/video-list/${date}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const assignmentList = response.data;
      setAssignment(assignmentList);
      // Do something with the user data
    } catch (error) {
      console.log(error, 'Fetch UnCheckedList Error');
    }
  }


  // const onSubmit = (e: any) => {
  //   e.preventDefault();
   
  //     const {data, loading, error} = useVideos(date);
  //     if(loading || error){

  //     }
  //     else{
  //       uploadList(data)
  //     }

  // };


  // async function uploadList(data: any) {
  //   try {
  //     console.log(data, "YYYYYYYYYYYYYYYYY")
  //     const res = await api.post('/leader/upload', data, {
  //       headers: {
  //         'Content-Type': 'application/json',
        
  //       },
  //     });
  //     const sendVideoListResponse = res.data;
  //     setMsg(sendVideoListResponse.Success);
     
  //   } catch (err) {
     
  //     console.log('ERROR');
  //   }
  // }

  const { data, loading, error } = useVideoCounts(date);

  if (loading) {
    <Spinner />;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Videos List</h1>
      <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} />
      QN Size: {data}
      {assignment == undefined || data==undefined ? (
        <Spinner />
      ) : (
        <Fragment>
            <Divider />

            <Table columns={columns} dataSource={assignment} />
            {data > assignment.length ? <Link to={`/from-qn/${date}/${assignment[0]?.video_createdAt}`} className="btn btn-primary">From QN</Link> : ''}
        </Fragment>
      )}
    </section>
  );
};

export default VideoList;
