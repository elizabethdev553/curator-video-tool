import { Divider, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useEffect, useState } from 'react';

import api from '../../utils/api'

interface VideoDetail {

  key: string;
  video_title: string;
  video_link: string;
  video_owner_handle: string;
  video_curator: string;
  video_check_description: string;
  video_check_tag:string[]|undefined;
  video_check_flag:boolean
}

const columns: ColumnsType<VideoDetail> = [
  {
    title: 'ID',
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
  // {
  //   title: 'video_check_flag',
  //   dataIndex: 'video_check_flag',
  // },
  {
    title: 'video_check_tag',
    dataIndex: 'video_check_tag',
    render: (_, { video_check_tag,video_check_flag }) => (
      <>
        {video_check_tag &&
          video_check_tag.map((tag) => {
            if(tag[0]!='')
            return (
              <Tag color="red" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
        {video_check_flag&& <Tag color="green" key='checked'> CHECKED</Tag>}
      </>
    ),
  },
  
];

const CheckedList=()=> {

  const [checkedList, setCheckedList] = useState<VideoDetail[]>()

  useEffect(() => {
    getCheckedList();
  }, []);

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





