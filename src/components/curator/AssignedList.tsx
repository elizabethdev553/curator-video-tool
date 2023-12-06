import { Divider, Select, Table, Tag, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';

// import Spinner from '../../components/layout/Spinner';
import api from '../../utils/api';
// import { setDate } from '@/actions/admin';
import { connect, ConnectedProps } from 'react-redux';
import { getUnCheckedList } from '@/actions/curator';
import { Spinner } from 'react-bootstrap';
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
  video_play: string;
  video_duplicate: string;
  video_check_comment:string
}

// const today = new Date();

// const year = String(today.getFullYear()).slice(-2);
// const month = String(today.getMonth() + 1).padStart(2, '0');
// const day = String(today.getDate()).padStart(2, '0');

// const TODAY = `20${year}-${month}-${day}`;

const AssignedList = ({ auth: { user }, getUnCheckedList, curator: { videos } }: any) => {
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const columns: ColumnsType<Assignment> = [
    {
      title: 'NO',
      key: 'key',
      width: '15px',
      dataIndex: 'key',
      render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
    },
    {
      title: 'TITLE',
      dataIndex: 'video_title',
    },
    {
      title: 'ID',
      dataIndex: 'key',
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
      title: 'YPP',
      dataIndex: 'video_yt_id',
    },
    {
      title: 'NFT',
      dataIndex: 'video_nft_id',
    },
    {
      title: 'CURATOR',
      dataIndex: 'video_curator',
    },
    {
      title: 'ENTITY PLAYS',
      dataIndex: 'video_play',
    },
    {
      title: 'CATEGORY',
      dataIndex: 'video_category',
    },
    {
      title: 'TOXIC CONTENT',
      dataIndex: 'video_check_tag',
      render: (_, { video_check_tag, video_check_flag }) =>
        video_check_tag!='None' ? (
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
      render: (_, { video_check_description, video_check_comment }) =>
      video_check_description!='other' ? video_check_description:video_check_comment
    },
  ];

  const [assignment, setAssignment] = useState<Assignment[]>();
  const [selectList, setSelectList] = useState<Assignment>();
  const member_id: string = user.handle;
  useEffect(() => {
    getUnCheckedList(member_id);
  }, []);

  // async function getUnCheckedList(member_id: string) {
  //   try {
  //     const response = await api.get(`/curator/${member_id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const taskTmp = response.data;
  //     setAssignment(taskTmp);
  //   } catch (error) {
  //     console.log(error, 'Fetch UnCheckedList Error');
  //   }
  // }

  // const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   setDate(dateString);
  //   getUnCheckedList(member_id);
  // };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Assignment[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectList(selectedRows[0]);
    },
  };

  let tmp: any = '';
  if (!videos.length) {
    tmp = <Spinner />;
  } else {
    tmp = (
      <Table
        rowKey={(obj) => obj.key}
        pagination={{
          onChange(current, pageSize) {
            setPage(current);
            setPaginationSize(pageSize);
          },
          defaultPageSize: 10,
          hideOnSinglePage: true,
          showSizeChanger: true,
          position: ['topRight', 'bottomRight']
        }}
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        bordered
        columns={columns}
        dataSource={videos}
        scroll={{ x: 1700 }}
      />
    );
  }
  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Curator Panel</h1>
        <Divider />
        {/* <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} /> */}
        {tmp}
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
  curator: state.curator,
});

const connector = connect(mapStateToProps, { getUnCheckedList });

export default connector(AssignedList);
