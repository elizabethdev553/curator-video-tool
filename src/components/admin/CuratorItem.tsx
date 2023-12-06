import { useEffect, useState,Fragment } from 'react';
import { Divider, Table, Popconfirm, Button, Tag, Form, Select, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useVideoCounts, useVideos } from '@/hooks';
import { connect, ConnectedProps } from 'react-redux';
import { delCurator, setAuthority } from '@/actions/admin';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
const { Option } = Select;
type PropsFromRedux = ConnectedProps<typeof connector>;
interface CuratorType {
  key: string;
  handle: string;
  email: string;
  authority: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: CuratorType;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,

  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Select>
            <Option value="curator">curator</Option>
            <Option value="admin">admin</Option>
            <Option value="guest">guest</Option>
          </Select>
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CuratorItem = ({ result,setAuthority,delCurator }: any) => {
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [data, setData] = useState(result);
  const [editingKey, setEditingKey] = useState<any>('');
  
// console.log(result,"result")
// console.log(data,"data")
  const isEditing = (record: CuratorType) => record.email === editingKey;

  const edit = (record: Partial<CuratorType> & { key: React.Key }) => {
    // console.log(record, "record")
    form.setFieldsValue({ ...record });
    setEditingKey(record.email);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as CuratorType;

      const newData = data;

      const index = newData.findIndex((item:any) => key === item.email);
      // console.log(index, "index")
      if (index > -1) {
        const item = newData[index];
        // console.log(item, "item", newData[0])
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setAuthority(newData, newData[index]);
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const [paginationSize, setPaginationSize] = useState(10);


  const columns = [
    {
      title: '#',
      key: 'key',
      width: '20px',
      dataIndex: 'key',
      render: (text: string, record: any, index: number) => (page - 1) * paginationSize + index + 1,
    },
    {
      title: 'handle',
      dataIndex: 'handle',
    },
    {
      title: 'authority',
      dataIndex: 'authority',
      editable: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Delete',
      dataIndex: 'Delete',
      render: (_:any, record: { email: string }) =>
        result.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.email)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        ) : null,
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      render: (_: any, record: CuratorType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.email)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const handleDelete = (key: React.Key) => {
    delCurator(key);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: CuratorType) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Fragment>
      
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey={(obj) => obj.email}
          pagination={{
            onChange(current, pageSize) {
              setPage(current);
              setPaginationSize(pageSize);
            },
            defaultPageSize: 10,
            hideOnSinglePage: true,
            showSizeChanger: true,
          }}
          // rowSelection={rowSelection}
          columns={mergedColumns}
          rowClassName="editable-row"
          dataSource={result}
        />
      </Form>
      </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  curator: state.curator,
});

const connector = connect(mapStateToProps, {setAuthority, delCurator });

export default connector(CuratorItem);
