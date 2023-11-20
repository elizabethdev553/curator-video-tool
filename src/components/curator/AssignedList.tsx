import { Divider, Select,Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { Fragment,useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import Spinner from '../../components/layout/Spinner';
import api from '../../utils/api'

const { Option } = Select;

interface Assignment {
  key: string;
  video_title: string;
  video_link: string;
  video_owner_handle: string;
  video_curator: string;
  video_check_flag:boolean;
  video_check_description:string
}

const columns: ColumnsType<Assignment> = [
  {
    title: 'key',
    dataIndex: 'key',
  },
  {
    title: 'video_title',
    dataIndex: 'video_title',
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
  {
    title: 'video_check_description',
    dataIndex: 'video_check_description',
  },
];

interface AuthProps {
  auth: {
    isAuthenticated: boolean;
    user:any
  };
}

const AssignedList:React.FC<AuthProps> = ({auth}) => {
  const [assignment, setAssignment] = useState<Assignment[]>();
  const [selectList, setSelectList] = useState<Assignment>();
  const member_id: string = auth.user.handle;
  useEffect(() => {
    getUnCheckedList(member_id);
  }, []);

  async function getUnCheckedList(member_id: string) {
    try {
      const response = await api.get(`/curator/${member_id}`, {
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


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Assignment[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectList(selectedRows[0]);
    },
  };

  return (
    <section className="container">
      {assignment == undefined || assignment.length < 1 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Curator Panel</h1>
          <Divider />
      
            <Table
              rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={assignment}
            />
            {selectList? <Link to={`/curator-panel/check/${selectList.key}`} className="btn btn-primary">Check</Link>
            : ''}
            
        </Fragment>
      )}
    </section>
  );
};

export default AssignedList;
