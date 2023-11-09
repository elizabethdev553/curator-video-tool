import React, { useEffect, useState, Fragment, ChangeEvent } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Avatar, Checkbox, List, Space, Button, Radio, Divider, Table, Select } from 'antd';
const { Option } = Select;
import axios from 'axios';

import type { ColumnsType } from 'antd/es/table';

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
    // render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'video_title',
    dataIndex: 'video_title',
    // render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'video_link',
    dataIndex: 'video_link',
    // render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'video_owner_handle',
    dataIndex: 'video_owner_handle',
    // render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'video_curator',
    dataIndex: 'video_curator',
    // render: (text: string) => <a>{text}</a>,
  },
];

const Assignment = () => {
  const [assignment, setAssignment] = useState<Assignment[]>();
  const [curatorList, setCuratorList] = useState<CuratorList[]>();
  const [selectList, setSelectList] = useState<Assignment[]>();
  const [curator, setCurator] = useState<CuratorList>();
  const [msg, setMsg] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  useEffect(() => {
    getUnCheckedList();
    getCuratorList();
  }, [msg]);

  async function getUnCheckedList() {
    try {
      const response = await axios.get('http://localhost:5000/api/assignment', {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
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

  async function getCuratorList() {
    try {
      const response = await axios.get('http://localhost:5000/api/assignment/curator-list', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const curatorListTmp = response.data;
      setCuratorList(curatorListTmp);
      // Do something with the user data
    } catch (error) {
      console.log(error, 'Fetch CuratorList Error');
    }
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onChange = (value: CuratorList) => {
    console.log(`selected ${value}`);
    setCurator(value);
  };
  
  
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Assignment[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectList(selectedRows);
    },
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  
  const onSubmit = (e: any) => {
    e.preventDefault();
    setSelectedRowKeys([]);
    if(selectList!==undefined && curator !== undefined && selectList.length>0 && curator )
    sendVideoList(selectList, curator);
  console.log('HHHHHHHHHHHHHHHH')
  };

  async function sendVideoList(selectList:Assignment[], curator:CuratorList) {
    try {
      let data = {selectList, curator}
      const response = await axios.post('http://localhost:5000/api/assignment/send-video-list', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sendVideoListResponse = response.data;
      setMsg(sendVideoListResponse.Success)
    } catch (error) {
      console.log(error, 'Fetch CuratorList Error');
    }
  }

  console.log(assignment, 'Assignment');

 
  return (
    <section className="container">
      {assignment==undefined || assignment.length < 1 || curatorList === undefined ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Assignment</h1>
          <form className="form" onSubmit={onSubmit}>
            <Divider />

            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={assignment}
            />

            <Select
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              options={curatorList.map((item: CuratorList) => {
                return { value: item.handle, label: item.handle };
              })}
            />

            <input type="submit" className="btn btn-primary" value="Send" />
          </form>
        </Fragment>
      )}
    </section>
  );
};

export default Assignment;
