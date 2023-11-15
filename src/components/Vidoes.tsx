import React, { useState, useEffect, Fragment } from 'react';
import { Divider, Table, Select, Pagination, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { useVideos } from '@/hooks';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
// import { useSelectedCouncil } from '@/store';
// import { isDefined } from '@/types';
import type { ColumnsType } from 'antd/es/table';



// import Spinner from '../../components/layout/Spinner';
import type { TableRowSelection } from 'antd/es/table/interface';
interface Assignment {
  key: string;
  video_title: string;
  video_link: string;
  video_owner_handle: string;
  video_curator: string;
  video_createdAt: string;
}

interface CuratorList {
  handle?: String;
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
  filter_date: string;
}
let result:any = []


const Videos:React.FC<VideosProps> = () => {
  // const date = filter_date
  const navigate = useNavigate();
  
 
  const { data, loading, error } = useVideos(date);

  if (loading) {
    return <div className="sub_panel loading">loading...</div>;
  }

  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  if(data!==undefined && data.videos.length>0){

    data.videos.map((item:any)=>{
      let temp: any= {}
      temp.key = item["media"]["id"];
      temp.video_title = item["title"];
      temp.video_link = item["media"]["id"];
      temp.video_owner_handle = item["channel"]["ownerMember"]["handle"];
      temp.video_createdAt = item["createdAt"];
      result.push(temp)
  })
  console.log(result)
  }


  async function uploadList(data:any) {
    try {
      const res = await axios.post('http://localhost:5000/api/leader/upload', data);
      
      console.log(res.data, "RESPONSE")
      navigate("/assignment")
      // dispatch({
        //   type: USER_LOADED,
        //   payload: res.data
        // });
      } catch (err) {
      // dispatch({
      //   type: AUTH_ERROR
      // });
      console.log( "ERROR")
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
   console.log(date, "Date")
    if (result !== undefined && result.length > 0 )
    uploadList(result);
  };

  return (
    <Fragment>
      {result === undefined || result.length < 1 ? (
        <div>a;lsdkjfa;sldkjf;asldkjfa;dsolkjfa;sdlkjfas;ldkjf</div>
      ) : (
        <Fragment>
          <form className="form" onSubmit={onSubmit}>
            <Divider />

            <Table  columns={columns} dataSource={result} />

            <input type="submit" className="btn btn-primary" value="Save in DataBase" />
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Videos;
