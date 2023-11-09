import React, { useEffect } from 'react';
import { Avatar, Checkbox, List, Radio, Space, Button } from 'antd';
// import { uploadList } from '../../actions/CuratorList';

const data = [
  {
    video_title: 'Title 1',
    key: '1400',
    video_link: 'https://nodelefrog.store/distributor/api/v1/assets/675456',
    video_owner_handle: 'contributor1',
    video_channel_id: 'dev1',
    video_createdAt: '20223-11-5'
  },
  {
    video_title: 'Title 2',
    key: '1414',
    video_link: 'https://nodelefrog.store/distributor/api/v1/assets/675456',
    video_owner_handle: 'contributor2',
    video_channel_id: 'dev1',
    video_createdAt: '20223-11-4'
  },
  {
    video_title: 'Title 3',
    key: '5600',
    video_link: 'https://nodelefrog.store/distributor/api/v1/assets/675456',
    video_owner_handle: 'contributor3',
    video_channel_id: 'dev2',
    video_createdAt: '20223-11-5'
  },
  {
    video_title: 'Title 4',
    key: '9824',
    video_link: 'https://nodelefrog.store/distributor/api/v1/assets/675456',
    video_owner_handle: 'contributor4',
    video_channel_id: 'dev3',
    video_createdAt: '20223-11-5'
  }
];
const CheckedList=()=> {

  const onSubmit = () => {
    console.log("sdfffffff");
    // uploadList(data);
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Checked List</h1>
      <form className="form" onSubmit={onSubmit}>
        <List
          pagination={{ position: 'bottom', align: 'center' }}
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <Checkbox />
              <List.Item.Meta
                title={item.video_title}
                description={
                  <a target="_blank" href={item.video_link}>
                    {item.video_link}
                  </a>
                }
              />
            </List.Item>
          )}
        />

        <input type="submit" className="btn btn-primary" value="Send" />
        
      </form>
    </section>
  )
}

export default CheckedList





