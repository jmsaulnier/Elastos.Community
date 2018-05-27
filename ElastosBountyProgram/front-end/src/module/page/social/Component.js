import React from 'react';
import StandardPage from '../StandardPage';
import Footer from '@/module/layout/Footer/Container'
import ContribForm from './formContribution/Container'
import moment from 'moment'

import './style.scss'

import { Col, Row, Icon, Form, Input, Button, Select } from 'antd'
const Option = Select.Option

export default class extends StandardPage {

    componentDidMount() {
        this.props.getSocialEvents()
    }

    componentWillUnmount() {
        this.props.reset()
    }

    ord_renderContent () {

        return (
            <div className="p_Social">
                <div className="ebp-header-divider">

                </div>
                <div className="ebp-page-title">
                    <h2>
                        Help Manage Events and Social Bounties
                    </h2>
                </div>
                <div className="ebp-page-desc d_rowGrey">
                    <p>
                        This program is for members interested in helping leaders organize events or take on
                        small tasks created by leaders to help promote Elastos to the community
                    </p>
                </div>
                <div className="ebp-page">
                    <Row className="d_rowTop">
                        <Col span={16} className="d_leftContainer d_box">
                            <div className="pull-left">
                                <h3>
                                    Events
                                </h3>
                            </div>
                            <div className="pull-right btnContainer">
                                <Select defaultValue="showHelp" style={{width: 300}} onChange={this.handleEventFilterChange.bind(this)}>
                                    <Option value="showHelp">Show Only Events Looking for Help</Option>
                                    <Option value="showAll">Show All</Option>
                                </Select>
                            </div>
                            <Row className="d_socialEventsContainer clearfix">
                                {this.props.all_tasks.map((task) => {
                                    return <Col key={task._id} md={{span:8}} lg={{span: 6}}>
                                        <div class="i_event">
                                            <h4>
                                                {task.name}
                                            </h4>
                                            <p className="event-date">
                                                {moment(task.date).format('MMM D, YYYY')}
                                            </p>
                                            <img src={'/assets/images/task_thumbs/' + task.thumbnail} />
                                        </div>
                                    </Col>
                                })}
                            </Row>
                            <Row className="d_socialEventsContainer">
                                {this.props.all_tasks.map((task) => {
                                    return <Col key={task._id} md={{span:8}} lg={{span: 6}}>
                                        <div class="i_event">
                                            <p>
                                                {_.truncate(task.description, {length: 100})}

                                                {task.description.length > 100 &&
                                                <a className="moreDetails"> more details</a>
                                                }
                                            </p>
                                        </div>
                                    </Col>
                                })}
                            </Row>
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h2>
                                Submit a Contribution
                            </h2>
                            <ContribForm />
                        </Col>
                    </Row>
                    <div className="horizGap">

                    </div>
                </div>
                <div className="ebp-page">
                    <Row>
                        <Col span={16} className="d_box">
                            <div>
                                <h3 className="pull-left">
                                    Available Tasks
                                </h3>
                                <div className="pull-right btnContainer">
                                    <Button onClick={this.createTaskLink.bind(this)}>
                                        Create Task
                                    </Button>
                                </div>
                            </div>
                            <div>

                            </div>
                        </Col>
                        <Col span={8} className="d_rightContainer d_box">
                            <h3>
                                My Tasks
                            </h3>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }

    async handleEventFilterChange(val) {

    }

    async createTaskLink() {
        this.props.history.push('/task-create')
    }
}
