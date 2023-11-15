// import './home.css';

import React, { useState } from 'react';
import { Divider, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import { Videos } from '@/components';

const today = new Date(); 

const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0'); 

const TODAY = `20${year}-${month}-${day}`; 

const Home = () => {
  const [date, setDate] = useState<string>(TODAY);

  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString);
    
    console.log(date, dateString, "HHHHHHHHHHHHHHHHHHHHH");
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Upload List</h1>
      <DatePicker onChange={onDatePickerChange} defaultValue={dayjs()} />
      <Videos filter_date={date} />
    </section>
  );
};

const mapStateToProps = (state:any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user:state.auth.user,
  selectDate:state.selectDate.date_select
});

export default connect(mapStateToProps, {  })(Home);