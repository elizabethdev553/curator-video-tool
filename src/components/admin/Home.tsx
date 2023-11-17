// import './home.css';

import type { DatePickerProps } from 'antd';
import { DatePicker,Divider } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect,useState } from 'react';

import { Videos } from '@/components';
import { useVideos } from '@/hooks';
import Spinner from "../layout/Spinner"
import api from '../../utils/api'

const today = new Date(); 

const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0'); 

const TODAY = `20${year}-${month}-${day}`; 

const Home = () => {
  const [date, setDate] = useState<string>(TODAY);

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString);
  };
  
  
  const { data, loading, error } = useVideos(date);

    if (loading) {
      <Spinner />
    }
  
    if (error) {
      return <div className="sub_panel loading">error</div>;
    }

  return (
    <section className="container">
      <h1 className="large text-primary">Upload List</h1>
      <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} />
      {
      <Videos results={data} />
      }
    </section>
  );
};
export default Home