import { useEffect, useState } from 'react';
import { Divider, Table, Popconfirm, Button, Tag, Form, Select, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useVideoCounts, useVideos } from '@/hooks';
import { connect, ConnectedProps } from 'react-redux';
import { getMemberList } from '@/actions/admin';
import { Link } from 'react-router-dom';
import CuratorItem from './CuratorItem';
import Spinner from '../layout/Spinner';
type PropsFromRedux = ConnectedProps<typeof connector>;



const CuratorList = ({ getMemberList, curator: { curators } }: any) => {

  useEffect(() => {
    getMemberList();
  }, [getMemberList]);

  let curatorlist:any=''
  if(curators.length==0){
   curatorlist = (<Spinner/>)
  }
  else{
    // console.log(curators, "curators")
    curatorlist = (<CuratorItem result = {curators}></CuratorItem>)
  }

    return (
    <section className="container">
      <h1 className="large text-primary">Curators List</h1>

      <Divider />
      {curatorlist}
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  curator: state.curator,
});

const connector = connect(mapStateToProps, { getMemberList });

export default connector(CuratorList);
