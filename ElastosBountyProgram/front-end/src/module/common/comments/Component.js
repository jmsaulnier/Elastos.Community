import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { Col, Row, Icon, Input, Divider, Button, Spin } from 'antd'

import config from '@/config'
import './style.scss'
import store from '@/store';

export default class extends BaseComponent {

    // only wraps loading / renderMain
    ord_render () {
        return (
            this.renderMain()
        )
    }

    // header + main area
    renderMain() {
        return (
            <div className="c_Comments">
                {this.renderHeader()}
                {this.renderComments()}
            </div>
        )
    }

    renderHeader() {
        return <div className="l_banner">
            <div className="pull-left">
                Comments
            </div>
            <div className="pull-right right-align">

            </div>
            <div className="clearfix"/>
        </div>
    }

    renderComments() {
        //this.props.type - the type of model
        //take comments from store details

        const type = this.props.type
        const storeState = store.getState()
        const curDetail = storeState[type] && storeState[type].detail
        const comments = curDetail.comments || []

        return (
            <div>
                <Row>
                    <Col span={20} className="gridCol">
                        <Input name="comment"/>
                    </Col>
                    <Col span={4} className="gridCol">
                        <Button className="ant-btn-ebp pull-right" type="primary" size="small"
                            onClick={this.addComment.bind(this)}>
                            Post
                        </Button>
                    </Col>
                </Row>
                {
                    _.map(comments, (comment) => {
                        <Row>
                            <Col span={24} className="gridCol">
                                <h4>
                                    {comment.message}
                                </h4>
                            </Col>
                        </Row>
                    })
                }
            </div>
        )
    }

    addComment() {
        // TODO
    }
}
