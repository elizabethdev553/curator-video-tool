import React, { useEffect, useState, Fragment } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import type { ColumnsType } from 'antd/es/table';
import { Divider, Table, Select } from 'antd';
const { Option } = Select;

import Spinner from '../layout/Spinner';

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
let member_id: String = 'goldwolf';
const CuratorPanel = () => {
  const [assignment, setAssignment] = useState<Assignment[]>();
  const [selectList, setSelectList] = useState<Assignment>();
  useEffect(() => {
    getUnCheckedList(member_id);
  }, []);

  console.log(assignment, "assingment")
  async function getUnCheckedList(member_id: String) {
    try {
      const response = await axios.get(`http://localhost:5000/api/curator/${member_id}`, {
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
    <section className="container-fluid">
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

export default CuratorPanel;
