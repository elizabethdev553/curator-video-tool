import { Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../utils/api';
import Spinner from './layout/Spinner';

interface Assignment {
  key: string;
  video_title: string;
  video_channel_title: string;
  video_owner_handle: string;
  video_curator: string;
  video_createdAt: Date;
  video_checkedAt: Date;
  video_yt_id: string;
  video_nft_id: string;
  video_check_tag: string[];
  video_check_flag: boolean;
  video_check_description: string;
}

interface CuratorList {
  handle?: string;
}

export interface VideosProps {
  results: any;
}

const Videos: React.FC<VideosProps> = ({ results }: VideosProps) => {
  const [flag, setFlag] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(25);
  const navigate = useNavigate();

  const columns: ColumnsType<Assignment> = [
    {
      title: 'NO',
      key: 'key',
      width: '15px',
      dataIndex: 'key',
      render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
    },
    {
      title: 'video_id',
      dataIndex: 'key',
    },
    {
      title: 'video_title',
      dataIndex: 'video_title',
    },
    {
      title: 'video_media_id',
      dataIndex: 'video_media_id',
    },
    {
      title: 'video_owner_handle',
      dataIndex: 'video_owner_handle',
    },
    {
      title: 'video_channel_title',
      dataIndex: 'video_channel_title',
    },
    {
      title: 'video_createdAt',
      dataIndex: 'video_createdAt',
    },
    {
      title: 'video_ypp_id',
      dataIndex: 'video_yt_id',
    },
    {
      title: 'video_nft_id',
      dataIndex: 'video_nft_id',
    },
  ];
  async function uploadList(data: any) {
    try {
      const res = await api.post('/leader/upload', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setFlag(false);
      navigate('/video-list');
    } catch (err) {
      console.log('ERROR');
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    setFlag(true);
    if (results !== undefined && results.length > 0) uploadList(results);
  };

  if (flag === true) {
    return <Spinner />;
  }
  return (
    <Fragment>
      {results === undefined ? (
        <Spinner />
      ) : (
        <Fragment>
          <form className="form" onSubmit={onSubmit}>
            <Divider />

            <Table
              columns={columns}
              dataSource={results}
              rowKey={(obj) => obj.key}
              pagination={{
                onChange(current, pageSize) {
                  setPage(current);
                  setPaginationSize(pageSize);
                },
                defaultPageSize: 25,
                hideOnSinglePage: true,
                showSizeChanger: true,
              }}
            />

            <input type="submit" className="btn btn-primary" value="Save in DataBase" />
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Videos;
