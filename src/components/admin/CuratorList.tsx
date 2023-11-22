import { useEffect, useState } from 'react';
import { Divider, Table, Popconfirm, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';


import { useVideoCounts, useVideos } from '@/hooks';
import { connect, ConnectedProps } from 'react-redux';
import { getCuratorList,delCurator } from '@/actions/admin';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
type PropsFromRedux = ConnectedProps<typeof connector>;
interface CuratorType {
  key: string;
  memberId: string;
  handle: string;
  email: string;
}

const CuratorList = ({getCuratorList,delCurator, curator:{curators}}:any) => {
  const [page, setPage] = useState(1);

  const [paginationSize, setPaginationSize] = useState(25); //your current default pagination size 25
  useEffect(() => {
    getCuratorList();
  }, [getCuratorList]);

  console.log(curators, "CURators")
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
      curators.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.email)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = (key: React.Key) => {
    delCurator(key);
  };
  
  
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
        columns={columns}
        dataSource={curators}
      />
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  curator: state.curator,
});

const connector = connect(mapStateToProps, { getCuratorList,delCurator });

export default connector(CuratorList);
