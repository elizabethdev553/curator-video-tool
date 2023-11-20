import { useEffect, useState } from 'react';
import { Divider, Table, Popconfirm, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import api from '../../utils/api';
import { Link } from 'react-router-dom';
interface CuratorType {
  key: string;
  memberId: string;
  handle: string;
  email: string;
}

const CuratorList = () => {
  const [curatorList, setCuratorList] = useState<CuratorType[]>([]);
  const [page, setPage] = useState(1);

  const [paginationSize, setPaginationSize] = useState(25); //your current default pagination size 25
  useEffect(() => {
    getCuratorList();
  }, []);

  const columns: ColumnsType<CuratorType> = [
    {
      title: '#',
      key: 'key',
      width: '20px',
      dataIndex:"key",
      render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
    },
    {
      title: 'memberId',
      dataIndex: 'memberId',
    },
    {
      title: 'handle',
      dataIndex: 'handle',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record: { email: string }) =>
      curatorList.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.email)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key: string) => {
    // const newData = curatorList.filter((item) => item.key !== key);
    console.log(key, "key")
    // setCuratorList(newData);
  };
  
  async function getCuratorList() {
    try {
      const response = await api.get('/leader/curator-list', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const checkedListTmp = response.data;

      console.log(checkedListTmp, 'checkedList');
      setCuratorList(checkedListTmp);
      // Do something with the user data
    } catch (error) {
      console.log(error, 'Fetch UnCheckedList Error');
    }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Curators List</h1>
      <Link to="/register" className="btn btn-primary">Add a Curator</Link>
      <Divider />
      <Table
        rowKey={obj => obj.email}
        pagination={{
          onChange(current, pageSize) {
            setPage(current);
            setPaginationSize(pageSize);
          },
          defaultPageSize: 25,
          hideOnSinglePage: true,
          showSizeChanger: true,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {console.log(event, "event")}, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        columns={columns}
        dataSource={curatorList}
      />
    </section>
  );
};

export default CuratorList;
