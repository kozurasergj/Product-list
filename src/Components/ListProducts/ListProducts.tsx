import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import React, { useEffect, useState } from 'react';
import { Table, Typography, Input, InputNumber, Popconfirm, Form } from 'antd';
import { Card } from '@/interface/interfaces';

const { Link } = Typography;

interface EditableCellProps<T> {
  editing: boolean;
  dataIndex: number | string;
  title: string;
  inputType: 'text' | 'number';
  record: T;
  index: number;
  children: React.ReactNode;
}

const EditableCell = <T extends object>({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: EditableCellProps<T>) => {
  const getInput = () => {
    if (inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please input ${title}!`
            },
            {
              pattern: /^[a-zA-Z0-9$.]{1,20}$/,
              message: "Error: Invalid string format. Only English letters, digits, '$' symbol, and dot '.' are allowed. The length should be between 1 and 20 characters."
            },
          ]}
        >
          {getInput()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ListProducts = () => {
  const products = useSelector((state: any) => state.reducerCard.cards);
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    setData(products)
  }, [products])

  const [form] = Form.useForm();
  const [data, setData] = useState(products || []);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const updateData = (newData: any) => {
    return {
      type: 'UPDATE_DATA',
      payload: newData,
    };
  };

  const save = async (id: number) => {
    try {
      ++id;
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        dispatch(updateData(newData));
        setEditingKey('');
      } else {
        const newRow = { id: id.toString(), ...row };
        newData.unshift(newRow);
        dispatch(updateData(newData));
        setEditingKey('');
      }
    } catch (err) {
      console.log('Validate Failed:', err);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '15%',
      editable: true,
    },
    {
      title: 'Count',
      dataIndex: 'count',
      width: '15%',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Link>Cancel</Link>
            </Popconfirm>
          </span>
        ) : (
          <Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const tableData = data?.map((item: any, index: number) => ({ ...item, key: index.toString() }));

  const paginationConfig = {
    pageSize: 5,
  };

  return (
    <Form form={form} component={false}>
      <Table
        style={{ marginBottom: '30px' }}
        bordered
        dataSource={tableData}
        columns={mergedColumns}
        pagination={paginationConfig}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </Form>
  );
};

export default ListProducts;
