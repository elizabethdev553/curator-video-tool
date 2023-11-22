import type { DatePickerProps } from 'antd';
import { DatePicker,Divider, Tag, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Fragment,useEffect, useState } from 'react';

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

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [];
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

];

const today = new Date(); 

const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0'); 

const TODAY = `20${year}-${month}-${day}`; 

const Assignment = () => {
  const [assignment, setAssignment] = useState<Assignment[]>();
  const [curatorList, setCuratorList] = useState<CuratorList[]>();
  const [selectList, setSelectList] = useState<Assignment[]>();
  const [curator, setCurator] = useState<CuratorList>();
  const [msg, setMsg] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [date, setDate] = useState<string>(TODAY);
  useEffect(() => {
    getUnCheckedList(date);
    getCuratorList();
  }, [msg, date]);

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  async function getUnCheckedList(date:string) {
    try {
      const response = await axios.get(`http://localhost:5000/api/leader/assignment/${date}`, {
        headers: {
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
      const response = await axios.get('http://localhost:5000/api/leader/curator-list', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const curatorListTmp = response.data;
      setCuratorList(curatorListTmp);
    } catch (error) {
      console.log(error, 'Fetch CuratorList Error');
    }
  }

  const onChange = (value: CuratorList) => {
    setCurator(value);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[],selectedRows: Assignment[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectList(selectedRows);
  };

  const rowSelection: TableRowSelection<Assignment> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (selectList !== undefined && curator !== undefined && selectList.length > 0 && curator){
      setMsg(true);
      sendVideoList(selectList, curator);
    }
  };

  async function sendVideoList(selectList: Assignment[], curator: CuratorList) {
    try {
      const data = { selectList, curator };
      const response = await axios.post('http://localhost:5000/api/leader/assignment/send-video-list', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sendVideoListResponse = response.data;
      setMsg(false);
    } catch (error) {
      console.log(error, 'Fetch CuratorList Error');
    }
  }
  

  return (
    <section className="container">
      <h1 className="large text-primary">Assignment</h1>
      <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} />
      {assignment == undefined  ? (
        <Spinner />
      ) : (
        <Fragment>
          <form className="form" onSubmit={onSubmit}>
            <Divider />

            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={assignment}
            />

            <Select
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              options={curatorList?.map((item: CuratorList) => {
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
