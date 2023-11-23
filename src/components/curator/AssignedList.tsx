import { Divider, Select, Table, Tag, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Spinner from '../../components/layout/Spinner';
import api from '../../utils/api';
import { setDate } from '@/actions/admin';
import { connect, ConnectedProps } from 'react-redux';

const { Option } = Select;

interface Assignment {
  key: string;
  video_title: string;
  video_channel_title: string;
  video_owner_handle: string;
  video_curator: string;
  video_createdAt: Date;
  video_yt_id: string;
  video_nft_id: string;
  video_check_tag: string;
  video_check_flag: boolean;
  video_check_description: string;
  video_checkedAt: string;
  video_category: string;
  video_play:string;
  video_duplicate:string;
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
    title: 'UPLOAD TIME',
    dataIndex: 'video_createdAt',
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
    title: 'CURATOR',
    dataIndex: 'video_curator',
  },
  {
    title: 'ENTITY PALYS',
    dataIndex: 'video_play',
  },
  {
    title: 'CATEGORY',
    dataIndex: 'video_category',
  },
  {
    title: 'CHECK TAG',
    dataIndex: 'video_check_tag',
    render: (_, { video_check_tag, video_check_flag }) =>
      video_check_tag ? (
        <Tag color="volcano" key={video_check_tag}>
          {video_check_tag}
        </Tag>
      ) : video_check_flag ? (
        <Tag color="green">checked</Tag>
      ) : (
        ''
      ),
  },
  {
    title: 'DUPLICATE',
    dataIndex: 'video_duplicate',
  },

  {
    title: 'CHECKED TIME',
    dataIndex: 'video_checkedAt',
  },

  {
    title: 'COMMENT',
    dataIndex: 'video_check_description',
  },
];


const today = new Date(); 

const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0'); 

const TODAY = `20${year}-${month}-${day}`; 

const AssignedList = ({ auth: { user }, setDate }: any) => {
  const [assignment, setAssignment] = useState<Assignment[]>();
  const [selectList, setSelectList] = useState<Assignment>();
  const member_id: string = user.handle;
  useEffect(() => {
    getUnCheckedList(member_id, TODAY);
  }, []);

  async function getUnCheckedList(member_id: string, dateString:string) {
    try {
      const response = await api.get(`/curator/${member_id}/${dateString}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const taskTmp = response.data;
      setAssignment(taskTmp);
    } catch (error) {
      console.log(error, 'Fetch UnCheckedList Error');
    }
  }

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString);
    getUnCheckedList(member_id, dateString);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Assignment[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectList(selectedRows[0]);
    },
  };

  console.log(assignment, 'assginment');
  return (
    <section className="container">
      
        <Fragment>
          <h1 className="large text-primary">Curator Panel</h1>
          <Divider />
          <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} />
          <Table
            rowSelection={{
              type: 'radio',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={assignment}
          />
          {selectList ? (
            <Link to={`/curator-panel/check/${selectList.key}`} className="btn btn-primary">
              Check
            </Link>
          ) : (
            ''
          )}
        </Fragment>

    </section>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

const connector = connect(mapStateToProps, { setDate });

export default connector(AssignedList);
