import { useState } from 'react'
import { Modal, Icon, Input, Button } from 'ii-ui'
import { connect } from 'dva'

import './index.less'

const TABLE_NAME_SPACE = 'BasedataAssetsTableView'

const CategoryModel = (props) => {
  const { firstlevelList = [], secondlevelList = [], createFirstItem, updateFirstItem, createSecondItem, updateSecondItem, fetchFirstlevelList, fetchSecondlevelList }  = props
  const { visible, onCancel } = props
  const [editFirst, setEditFirst] = useState(false)
  const [editSecond, setEditSecond] = useState(false)
  const [firstsName, setFirstsName] = useState()
  const [secondsName, setSecondsName] = useState()

  const addCategory = (type) => {
    console.log(type, 'type')
    type === 1 ? setEditFirst(true) : setEditSecond(true)
  }
  const save = (type) => {
    type === 1 ?
    createFirstItem({asset_firsts_name: firstsName}).then(() => {
      setEditFirst(false)
      fetchFirstlevelList({page:1, size: 100})
    })
    :
    createSecondItem({asset_seconds_name: secondsName}).then(() => {
      setEditSecond(false)
      fetchSecondlevelList({page:1, size: 100})
    })
  }
  const deleteItem = (item, type) => {
    console.log(item, 'item')
    type === 1 ?
    updateFirstItem({is_deleted: true, ...item}).then(() => {
      fetchFirstlevelList({page:1, size: 100})
    })
    :
    updateSecondItem({is_deleted: true, ...item}).then(() => {
      fetchSecondlevelList({page:1, size: 100})
    })
  }
  return (
    <Modal
			title='类别管理'
      visible={visible}
      footer={null}
      onCancel={() => onCancel()}
		>
      <div className='category-model'>
        <div>
          <div>一级类别：</div>
          <div className='con'>
            {
              firstlevelList.map((item) => {
                return (
                  <div className='item' key={item.asset_firsts_id}>
                    <span className='mr10'>{item.asset_firsts_name}</span>
                    <div className='icon-box' onClick={() => deleteItem(item, 1)}>
                      <Icon icon='icon-jia' size='12' style={{color: '#B3B7C3'}}></Icon>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {
            editFirst ?
            <div className='save'>
              <Input style={{width: 200, marginRight: 10}} value={firstsName} onChange={(e) => setFirstsName(e.target.value)}/>
              <Button onClick={() => setEditFirst(false)}>取消</Button>
              <Button type='primary'onClick={() => save(1)} disabled={!firstsName}>保存</Button>
            </div>
            :
            <div className='add' onClick={() => addCategory(1)}>
              <Icon icon='icon-jia' size='12' style={{color: '#B3B7C3'}}></Icon>
              <span className='ml10'>新建类别</span>
            </div>
          }
        </div>
        <div>
          <div>二级类别：</div>
          <div className='con'>
            {
              secondlevelList.map((item) => {
                return (
                  <div className='item' key={item.asset_seconds_id}>
                    <span className='mr10'>{item.asset_seconds_name}</span>
                    <div className='icon-box' onClick={() => deleteItem(item, 2)}>
                      <Icon icon='icon-jia' size='12' style={{color: '#B3B7C3'}}></Icon>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {
            editSecond ?
            <div className='save'>
              <Input style={{width: 200, marginRight: 10}} value={secondsName} onChange={(e) => setSecondsName(e.target.value)}/>
              <Button onClick={() => setEditSecond(false)}>取消</Button>
              <Button type='primary' onClick={() => save(1)} disabled={!secondsName}>保存</Button>
            </div>
            :
            <div className='add' onClick={() => addCategory(2)}>
              <Icon icon='icon-jia' size='12' style={{color: '#B3B7C3'}}></Icon>
              <span className='ml10'>新建类别</span>
            </div>
          }
        </div>
      </div>
    </Modal>
  )
}
const mapState = state => {
  const { firstlevelList, secondlevelList } = state[TABLE_NAME_SPACE] || {}
  return {
    firstlevelList,
    secondlevelList
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  createFirstItem: payload => dispatch({ type: `${TABLE_NAME_SPACE}/createFirstItem`, payload }),
  updateFirstItem: payload => dispatch({ type: `${TABLE_NAME_SPACE}/updateFirstItem`, payload }),
  createSecondItem: payload => dispatch({ type: `${TABLE_NAME_SPACE}/createSecondItem`, payload }),
  updateSecondItem: payload => dispatch({ type: `${TABLE_NAME_SPACE}/updateSecondItem`, payload }),
  fetchFirstlevelList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchFirstlevelList`, payload: params }),
  fetchSecondlevelList: (params = {}) => dispatch({ type: `${TABLE_NAME_SPACE}/fetchSecondlevelList`, payload: params })
})
export default connect(mapState, mapDispatchToProps)(CategoryModel)