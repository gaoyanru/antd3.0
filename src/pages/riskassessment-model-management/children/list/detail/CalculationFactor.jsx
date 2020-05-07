import { useState } from 'react'
// import { Button, Table, Input } from 'ii-ui'
import { Form, Button, Table, Input } from 'antd'

import './index.less'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =  <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CalculationFactor = (props) => {
  // const [form] = Form.useForm()
  const initData = [
    {id: '1', name: '1111', age: '11', address: '1111111'},
    {id: '2', name: '2222', age: '12', address: '222222'},
    {id: '3', name: '3333', age: '13', address: '33333'}
  ]
  const { form } = props
  const [editingKey, setEditingKey] = useState('')
  const [data, setData] = useState(initData) // 初始数据

  const isEditing = (record) => record.id === editingKey

  const edit = (record) => {
    console.log(record, 'record')
    // form.setFieldsValue({ name: '', age: '', address: '', ...record });  
    setEditingKey(record.id);
  }
  const save = async (id) => {
    try {
      const row = form.validateFields()

      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
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
  const deleteItem = () => {
    console.log('11')
  }
  const columns = [{
    title: '序号',
    dataIndex: '',
    editable: true,
    render: (text, record, index) => {
      return (
        <span>{index + 1}</span>
      )
    }
  }, {
    title: '计算因子',
    dataIndex: 'name',
    editable: true,
  }, {
    title: '计算因子代号',
    dataIndex: 'age',
    editable: true,
  }, {
    title: '取值范围',
    dataIndex: 'address',
    editable: true,
  }, {
    title: '操作',
    dataIndex: '',
    render: (text, record, index) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <a href="javascript:;" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
            保存
          </a>
        </span>
      ) : (
        <span>
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </a>
          <a disabled={editingKey !== ''} onClick={() => deleteItem(record)}>
            删除
          </a>
        </span>
      )
    }
  }]

  const mergedColumns = columns.map(col => {
    console.log(col, 'col')
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAdd = () => {
    console.log('添加')
  }
  return (
    <div className='calculation-factor'>
      <div className='top'>
        <div className='table-title'>计算因子</div>
        <Button className='button' type='primary' onClick={() => handleAdd()}>计算因子</Button>
      </div>
      <Form form={form}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
  )
}
export default Form.create()(CalculationFactor)