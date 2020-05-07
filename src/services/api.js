import request from 'ii-utils/request'

export const fetchModelsList = ({keywords, page, size}) => request.get(`/ra-basedata-model-algorithms?keywords=${keywords}&page=${page}&size=${size}`)
