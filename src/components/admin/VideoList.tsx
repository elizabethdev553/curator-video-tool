import type { DatePickerProps } from 'antd';
import { DatePicker, Divider, Pagination, Select, Table, Tag, Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { RadioChangeEvent } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useVideoCounts, useVideos } from '@/hooks';
import { connect, ConnectedProps } from 'react-redux';

import { getVideoList, setDate, getCuratorList,setFilter } from '../../actions/admin';
import Spinner from '../../components/layout/Spinner';
interface Assignment {
  key: string;
  video_title: string;
  video_channel_title: string;
  video_owner_handle: string;
  video_curator: string;
  video_createdAt: Date;
  video_yt_id: string;
  video_nft_id: string;
  video_check_tag: string[];
  video_check_flag: boolean;
  video_check_description: string;
}

interface CuratorList {
  handle?: string;
}

const columns: ColumnsType<Assignment> = [
  {
    title: 'ID',
    dataIndex: 'key',
  },
  {
    title: 'TITLE',
    dataIndex: 'video_title',
  },
  {
    title: 'CHANNEL NAME',
    dataIndex: 'video_channel_title',
  },
  {
    title: 'OWNER',
    dataIndex: 'video_owner_handle',
  },
  {
    title: 'CURATOR',
    dataIndex: 'video_curator',
  },
  {
    title: 'YT ID',
    dataIndex: 'video_yt_id',
  },
  {
    title: 'NFT ID',
    dataIndex: 'video_nft_id',
  },
  {
    title: 'UPLOAD TIME',
    dataIndex: 'video_createdAt',
  },
  {
    title: 'CHECK DESCRIPTION',
    dataIndex: 'video_check_description',
  },
  // {
  //   title: 'video_check_flag',
  //   dataIndex: 'video_check_flag',
  // },
  {
    title: 'CHECK TAG',
    dataIndex: 'video_check_tag',
    render: (_, { video_check_tag, video_check_flag }) => (
      <>
        {video_check_tag &&
          video_check_tag.map((tag) => {
            if (tag[0] != '')
              return (
                <Tag color="red" key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
          })}
        {video_check_flag && (
          <Tag color="green" key="checked">
            {' '}
            CHECKED
          </Tag>
        )}
      </>
    ),
  },
  // {
  //   title: 'date',
  //   dataIndex: 'date',
  // },
];

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;
const tmp= 1;
const VideoList = ({ getVideoList, setDate, setFilter, admin: { videos, loading, sel_date, filter_data } }: any) => {
  // const [date, setDate] = useState<string>(sel_date);
  // const [msg, setMsg] = useState(true);
  const [value, setValue] = useState(tmp);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    const filtertmp= e.target.value
    setFilter(filtertmp)
  };
  useEffect(() => {
    getVideoList(sel_date);
    console.log(sel_date);
  }, [sel_date]);
  console.log(videos, 'videos');

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString, 'datestring');
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

  const { data } = useVideoCounts(sel_date);

  return (
    <section className="container">
      <h1 className="large text-primary">Videos List</h1>
      <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} />
      QN Size: {data}
      <Divider />
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>All</Radio>
        <Radio value={2}>YPP</Radio>
        <Radio value={3}>NFT</Radio>
        <Radio value={4}>CHECKED</Radio>
      </Radio.Group>
      {loading === true || videos == null || !data ? (
        <Spinner />
      ) : (
        <Fragment>

          <Table columns={columns} dataSource={filter_data} />
          {data > videos.length ? (
            <Link to={`/from-qn/${sel_date}/${videos[0]?.video_createdAt}`} className="btn btn-primary">
              From QN
            </Link>
          ) : (
            ''
          )}
        </Fragment>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  admin: state.admin,
});

const connector = connect(mapStateToProps, { getVideoList, setDate,setFilter });

export default connector(VideoList);
