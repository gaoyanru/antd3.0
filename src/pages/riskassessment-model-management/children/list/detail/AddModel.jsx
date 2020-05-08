import { useState, useRef } from 'react'
// import { Button, Table, Input } from 'ii-ui'
import { Form, Button, Table, Input } from 'antd'

import './index.less'

const EditableCell = (form) => (props) => {
  const {
    editing,
    dataIndex,
    title,
    index,
    record,
    children,
    ...restProps
  } = props
  const inputNode =  <Input />
  return (
    <td {...restProps}>
      {editing && dataIndex ? (
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
          {form.getFieldDecorator(`${dataIndex}`, {
            initialValue: record[dataIndex]
          })(inputNode)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

let tempIndex = 0

const AddModel = (props) => {
  // const [form] = Form.useForm()
  const initData = [
    {key: '1', id: '1', name: '1111', age: '11', address: '1111111', time: ''},
    {key: '2', id: '2', name: '2222', age: '12', address: '222222', time: ''},
    {key: '3', id: '3', name: '3333', age: '13', address: '33333', time: ''}
  ]
  const { form } = props
  const [editingKey, setEditingKey] = useState('')
  const [data, setData] = useState(initData) // 初始数据

  const isEditing = (record) => record.key === editingKey
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
      title: '算法名称',
      dataIndex: 'name',
      editable: true,
    }, {
      title: '计算因子代号',
      dataIndex: 'age',
      editable: true,
    }, {
      title: '计算因子',
      dataIndex: 'address',
      editable: true,
    }, {
      title: '创建时间',
      dataIndex: 'time',
      editable: true,
    }, {
      title: '操作',
      dataIndex: '',
      align: 'center',
      render: (text, record, index) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a href="javascript:;" onClick={() => save(index)} style={{ marginRight: 8 }}>
              保存
            </a>
          </span>
        ) : (
          <span>
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
              编辑
            </a>
            &nbsp;&nbsp;
            <a disabled={editingKey !== ''} onClick={() => deleteItem(index)}>
              删除
            </a>
          </span>
        )
      }
    }]
  const edit = (record) => {
    // form.setFieldsValue({ name: '', age: '', address: '', ...record });  
    setEditingKey(record.key);
  }
  const save = async (index) => {
    try {
      const row = form.validateFields((err, values) => {
        const newData = [...data];
        if (index > -1) {
          newData[index] = {
            ...newData[index],
            ...values
          }
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      })
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const deleteItem = (index) => {
    data.splice(index, 1);
    setData([...data]);
  }

  const mergedColumns = columns.map((col, index) => {
    if (!col.editable) {
      return col;
    }
    col.onCell = (record) => ({
      index,
      record,
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    })
    return {
      ...col
    }
  });
  const EditableCellRef =  useRef(EditableCell(form));
  const handleAdd = () => {
    tempIndex += 1
    const newData = data.concat([{
      key: `add-key-${tempIndex}`
    }]);
    setData(newData);
  }
  console.log(data, 'data')
  return (
    <div className='calculation-factor'>
      <div className='top'>
        <div className='table-title'>算法</div>
        <Button className='button' type='primary' onClick={() => handleAdd()}>添加</Button>
      </div>
      <Form form={form}>
        <Table
          rowKey={(record, index) => {
            return record.id || record.key || index
          }}
          components={{
            body: {
              cell: EditableCellRef.current,
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
export default Form.create()(AddModel)