import request from 'ii-utils/request'

const PAGE_SIZE = 20

export const fetchList = ({ page = 0, pageSize = PAGE_SIZE}) => request.post('/project/list', { page, pageSize })

export const fetchItem = ({ id = 0 }) => request.post(`/project/${id}`)

export const deleteItem = ({ id = 0 }) => request.delete(`/project/${id}`)

export const updateItem = ({ id = 0, ...rest }) => request.post('/project/update', {
  ...rest,
  id,
})

export const createItem = (data) => request.post('/project/save', data)
