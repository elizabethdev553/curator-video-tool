import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import type { ColumnsType } from 'antd/es/table';
import { Divider, Table, Select } from 'antd';
import api from '../../utils/api'
// import Spinner from '../../components/layout/Spinner';

interface VideoDetail {

  key: string;
  video_title: string;
  video_link: string;
  video_owner_handle: string;
  video_curator: string;
  video_check_description: string;
}

const columns: ColumnsType<VideoDetail> = [
  {
    title: 'key',
    dataIndex: 'key',
  },
  {
    title: 'video_title',
    dataIndex: 'video_title',
  },
  {
    title: 'video_link',
    dataIndex: 'video_link',
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
    title: 'video_check_description',
    dataIndex: 'video_check_description',
  },
];

const CheckedList=()=> {

  const [checkedList, setCheckedList] = useState<VideoDetail[]>()

  useEffect(() => {
    getCheckedList();
  }, []);

  console.log(checkedList, "CheckedList")

  async function getCheckedList() {
    try {
      const response = await api.get('/leader/checked-list', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const checkedListTmp = response.data;
      setCheckedList(checkedListTmp);
      // Do something with the user data
    } catch (error) {
      console.log(error, 'Fetch UnCheckedList Error');
    }
  }


  return (
    <section className="container">
      <h1 className="large text-primary">Checked List</h1>
      <Divider />
      
      <Table
        
        columns={columns}
        dataSource={checkedList}
      />
    </section>
  )
}

export default CheckedList





