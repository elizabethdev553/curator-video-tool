import type { DatePickerProps } from 'antd';
import { DatePicker, Divider, Pagination, Select, Table, Tag, Radio,Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { RadioChangeEvent } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CsvDownloadButton from 'react-json-to-csv';

import { useVideoCounts, useVideos } from '@/hooks';
import { connect, ConnectedProps } from 'react-redux';

import { getVideoList, setDate, getCuratorList, setFilter, sendVideoList } from '../../actions/admin';
import Spinner from '../../components/layout/Spinner';
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
    title: 'CHECKED TIME',
    dataIndex: 'video_checkedAt',
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

type PropsFromRedux = ConnectedProps<typeof connector>;
const tmp = 1;
const VideoList = ({
  getVideoList,
  setDate,
  sendVideoList,
  getCuratorList,
  setFilter,
  curator: { curators },
  admin: { all_num, ypp_num, nft_num, check_num, videos, loading, sel_date, filter_data },
}: any) => {

  const [value, setValue] = useState(tmp);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [curator, setCurator] = useState<CuratorList>();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    const filtertmp = e.target.value;
    setFilter(filtertmp);
  };

  useEffect(() => {
    getCuratorList();
  }, []);

  useEffect(() => {
    getVideoList(sel_date);

  }, [sel_date]);

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: Assignment[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

  };

  const onCuratorChange = (value: CuratorList) => {
    setCurator(value);
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
    if (curator !== undefined && curator) {
      sendVideoList(selectedRowKeys, curator);
    }
  };
  const { data } = useVideoCounts(sel_date);
  return (
    <section className="container">
      <h1 className="large text-primary">Videos List</h1>
      <Divider />
      
      <Row>

      <Col span={3}><DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} /></Col>
      <Col span={3}>QN Size: {data}</Col>
      <Col span={3}>All Data: {all_num}</Col>
      <Col span={3}>Ypp Data: {ypp_num}</Col>
      <Col span={3}>Nft Data: {nft_num}</Col>
      <Col span={3}>Checked Data: {check_num}</Col>
      </Row>
      {/* <Col span={3}>  </Col> */}
      <Divider />
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>All</Radio>
        <Radio value={2}>YPP</Radio>
        <Radio value={5}>NON YPP</Radio>
        <Radio value={3}>NFT</Radio>
        <Radio value={6}>NON NFT</Radio>
        <Radio value={4}>CHECKED</Radio>
        <Radio value={7}>NOT CHECKED</Radio>
      </Radio.Group>
      <Divider />
      {loading === true || videos == null || !data ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* <CsvDownloadButton data={filter_data} headers={Object.keys(filter_data[0])} /> */}

          <form className="form" onSubmit={onSubmit}>
            {data > videos.length ? (
              <Link to={`/from-qn/${sel_date}/${videos[0]?.video_createdAt}`} className="btn btn-primary">
                From QN
              </Link>
            ) : (
              ''
            )}
            <Select
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onCuratorChange}
              options={curators?.map((item: CuratorList) => {
                return { value: item.handle, label: item.handle };
              })}
            />
            <input type="submit" className="btn btn-primary" value="Send" />
            <Table columns={columns} dataSource={filter_data} rowSelection={rowSelection} />
          </form>
        </Fragment>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  admin: state.admin,
  curator: state.curator,
  auth: state.auth,
});

const connector = connect(mapStateToProps, { getVideoList, sendVideoList, getCuratorList, setDate, setFilter });

export default connector(VideoList);
