import BaseService from '../model/BaseService'
import _ from 'lodash'
import {api_request} from '@/util'


export default class extends BaseService {
    async postComment(type, commentData) {
        const redux = this.store.getRedux(type)
        const rs = await api_request({
            path: `/${type}/comment`,
            method: 'post',
            data: commentData,
        })
        const curDetail = this.store.getState()[type] && this.store.getState()[type].detail;

        if (!curDetail) {
            return;
        }

        curDetail.comments = curDetail.comments || [];
        curDetail.comments.push(commentData);

        this.dispatch(redux.actions.detail_update(curDetail))

        return rs
    }

    async get(type, parentId) {
        const redux = this.store.getRedux(type)

        this.dispatch(redux.actions.loading_update(true))

        const result = await api_request({
            path: `/${type}/${parentId}`,
            method: 'get',
        })

        this.dispatch(redux.actions.loading_update(false))

        if (result) {
            this.dispatch(redux.actions.detail_update(result))
            return result
        }
    }
}
