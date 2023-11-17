import type { DatePickerProps } from 'antd';
import { DatePicker,Divider, Pagination, Select, Table } from 'antd';
// import { useSelectedCouncil } from '@/store';
// import { isDefined } from '@/types';
import type { ColumnsType } from 'antd/es/table';
import Spinner from './layout/Spinner';
import type { TableRowSelection } from 'antd/es/table/interface';
import axios from 'axios';
import React, { Fragment,useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../utils/api'

interface Assignment {
  key: string;
  video_title: string;
  video_link: string;
  video_owner_handle: string;
  video_curator: string;
  video_createdAt: string;
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
    title: 'video_id',
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
    title: 'video_createdAt',
    dataIndex: 'video_createdAt',
  },
];

export interface VideosProps {
  results: any;
}

const Videos: React.FC<VideosProps> = ({ results }: VideosProps) => {
  const navigate = useNavigate();
 
  async function uploadList(data: any) {
    try {
      console.log(data, "YYYYYYYYYYYYYYYYY")
      // const tmp = JSON.stringify(data);
      const res = await api.post('/leader/upload', data, {
        headers: {
          'Content-Type': 'application/json',
        
        },
      });
      console.log(res.data, 'RESPONSE');
      navigate('/assignment');
     
    } catch (err) {
     
      console.log('ERROR');
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (results !== undefined && results.length > 0) uploadList(results);
  };

  return (
    <Fragment>
      {results === undefined ? (
        <Spinner />
      ) : (
        <Fragment>
          <form className="form" onSubmit={onSubmit}>
            <Divider />

            <Table  columns={columns} dataSource={results}  />

       <input type="submit" className="btn btn-primary" value="Save in DataBase" />
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Videos;
