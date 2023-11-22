import type { DatePickerProps } from 'antd';
import { DatePicker, Divider, Pagination, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import { useVideoCounts,useVideos } from '@/hooks';
import { connect, ConnectedProps } from 'react-redux';

import {getVideoList} from '../../actions/admin'
import Spinner from '../../components/layout/Spinner';
interface Assignment {
  key: string;
  video_title: string;
  video_channel_title: string;
  video_owner_handle: string;
  video_curator: string;
  video_createdAt: Date;
  video_yt_id:string;
  video_nft_id:string
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
    title: 'video_yt_id',
    dataIndex: 'video_yt_id',
  },
  {
    title: 'video_nft_id',
    dataIndex: 'video_nft_id',
  },
  {
    title: 'video_createdAt',
    dataIndex: 'video_createdAt',
  },
];
console.log(dayjs(), "dayjs")

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux 

const VideoList = ({ getVideoList, admin: { videos, loading, sel_date } }:any) => {
  const [date, setDate] = useState<string>(sel_date);
  // const [msg, setMsg] = useState(true);
  useEffect(() => {
    getVideoList(date);
    console.log(date)
  }, [date]);
  console.log(videos, "videos")

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };


  // async function getVideoList(date: string) {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/leader/video-list/${date}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const assignmentList = response.data;
  //     setAssignment(assignmentList);
  //     // Do something with the user data
  //   } catch (error) {
  //     console.log(error, 'Fetch UnCheckedList Error');
  //   }
  // }


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

  const { data } = useVideoCounts(date);

 
  return (
    <section className="container">
      <h1 className="large text-primary">Videos List</h1>
      <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} />
      QN Size: {data}
      {loading===true || videos==null||!data ? (
        <Spinner />
      ) : ( 
        <Fragment>
            <Divider />

            <Table columns={columns} dataSource={videos} />
            {data > videos.length ? <Link to={`/from-qn/${date}/${videos[0]?.video_createdAt}`} className="btn btn-primary">From QN</Link> : ''}
        </Fragment>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  admin:state.admin
});

const connector = connect(mapStateToProps, { getVideoList });

export default connector(VideoList);
