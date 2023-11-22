// import './home.css';

import type { DatePickerProps } from 'antd';
import { DatePicker,Divider } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import { Videos } from '@/components';
import { useVideos } from '@/hooks';
import Spinner from "../layout/Spinner"
import api from '../../utils/api'
let createdAt:String=''

const Home = () => {
  const { date, time } = useParams();

  if(date===undefined){
    return <>loading...</>
  }

  if(time == "undefined" || time ===undefined){
    createdAt = new Date(date).toISOString();
  }
  else{
    createdAt = time
  }

const endedAt = new Date(date+ "T23:59:59.999Z").toISOString();
  const { data, loading, error } = useVideos(createdAt, endedAt);
  
  if (loading) {
    <Spinner />
  }
  
  if (error) {
    return <div className="sub_panel loading">error</div>;
  }
  console.log(data, "data")

  return (
    <section className="container">
      <h1 className="large text-primary">Upload List</h1>
      {
      <Videos results={data} />
      }
    </section>
  );
};

export default Home