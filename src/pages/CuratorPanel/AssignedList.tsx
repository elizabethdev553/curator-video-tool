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
}

interface CuratorList {
  handle?: String;
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
];
let member_id: String = 'goldwolf';
const CuratorPanel = () => {
  const [assignment, setAssignment] = useState<Assignment[]>();
  // const [curatorList, setCuratorList] = useState<CuratorList[]>();
  const [selectList, setSelectList] = useState<Assignment>();
  const [msg, setMsg] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  useEffect(() => {
    getUnCheckedList(member_id);
  }, [msg]);

  async function getUnCheckedList(member_id: String) {
    try {
      const response = await axios.get(`http://localhost:5000/api/curator/${member_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const taskTmp = response.data;
      setAssignment(taskTmp);
      // Do something with the user data
    } catch (error) {
      console.log(error, 'Fetch UnCheckedList Error');
    }
  }
console.log(selectList)
  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Assignment[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys([]);
      setSelectList(selectedRows[0]);
    },
  };

  // const onSubmit = (e: any) => {
  //   e.preventDefault();
  //   if(selectList!==undefined && selectList.length > 0  )
  //   console.log(selectList, "WWWWWWWWWWW")
  // };

  async function sendVideoList(selectList: Assignment[], curator: CuratorList) {
    try {
      let data = { selectList, curator };
      const response = await axios.post('http://localhost:5000/api/leader/assignment/send-video-list', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sendVideoListResponse = response.data;
      setMsg(sendVideoListResponse.Success);
    } catch (error) {
      console.log(error, 'Fetch CuratorList Error');
    }
  }

  return (
    <section className="container">
      {assignment == undefined || assignment.length < 1 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Curator Panel</h1>
          <Divider />
          {/* <form className="form" onSubmit={onSubmit}> */}
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
            
          {/* </form> */}
        </Fragment>
      )}
    </section>
  );
};

export default CuratorPanel;
