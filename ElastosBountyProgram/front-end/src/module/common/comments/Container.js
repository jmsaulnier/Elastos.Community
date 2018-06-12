import {createContainer} from "@/util"
import Component from './Component'
import CommentService from '@/service/CommentService'
import {message} from 'antd'

export default createContainer(Component, (state) => {
    return {
        ...state
    }
}, () => {

    const commentService = new CommentService()

    return {
        async postComment(type, comment) {
            return commentService.postComment(type, comment)
        },

        async get(type, parentId) {
            return commentService.get(type, parentId)
        }
    }
})
