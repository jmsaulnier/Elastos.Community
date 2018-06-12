import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import TaskCreateForm from '@/module/form/TaskCreateForm/Container'
import { Col, Row, Popconfirm, Divider, Button, Spin } from 'antd'

import TaskPublicDetail from './detail/Container'

import {TASK_STATUS} from '@/constant'

import './style.scss'

/**
 * This has 3 views
 *
 * 1. Public
 * 2. Admin
 * 3. Edit
 *
 */
export default class extends BaseComponent {

    renderMain() {
        return (
            <div className="c_TaskDetail">
                {this.props.page === 'ADMIN' ? this.renderAdminHeader() : this.renderHeader()}
                {this.state.editing ? this.renderEditForm() : this.renderDetail()}
            </div>
        )
    }

    renderEditForm() {
        return <div className="form-wrapper">
            <TaskCreateForm existingTask={this.props.task} page={this.props.page} switchEditMode={this.switchEditMode.bind(this)}/>
        </div>
    }

    renderDetail() {
        if (this.props.page === 'ADMIN') {
            return this.renderAdminDetail()
        } else {
            return <TaskPublicDetail task={this.props.task} page={this.props.page}/>
        }
    }

    renderAdminHeader() {
        return <div className="l_banner">
            <div className="pull-left">
                Status: <span className="status">{this.props.task.status}</span>
                {this.props.task.status === TASK_STATUS.CREATED &&
                <span className="help-text">&nbsp; - this task does not require approval</span>
                }
                {this.props.task.status === TASK_STATUS.PENDING &&
                <span className="help-text">&nbsp; - this task is awaiting approval</span>
                }
                {this.props.task.status === TASK_STATUS.APPROVED && this.props.task.approvedBy &&
                <span className="help-text">&nbsp; - this task is approved by {this.props.task.approvedBy.username}</span>
                }
            </div>
            <div className="pull-right right-align">
                {!this.state.editing && this.props.task.status === TASK_STATUS.PENDING &&
                <Popconfirm title="Are you sure you want to approve this task?" placement="left" okText="Yes" onConfirm={this.approveTask.bind(this)}>
                    <Button type="primary">Approve</Button>
                </Popconfirm>
                }
                {/*this.state.editing && <Button onClick={this.resetEdit.bind(this)}>Reset</Button>*/}
                <Button onClick={this.switchEditMode.bind(this)}>
                    {this.state.editing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <div className="clearfix"/>
        </div>
    }

    renderHeader() {

        const isTaskOwner = this.props.current_user_id === this.props.task.createdBy._id

        return <div className="l_banner">
            <div className="pull-left">
                Status: <span className="status">{this.props.task.status}</span>

                {this.props.task.status === TASK_STATUS.PENDING &&
                <span className="help-text">&nbsp; - this task is awaiting approval by council</span>
                }
                {this.props.task.status === TASK_STATUS.ASSIGNED &&
                <span className="help-text">&nbsp; - this task is active</span>
                }
                {this.props.task.status === TASK_STATUS.SUBMITTED &&
                <span className="help-text">&nbsp; - you have submitted this task, pending owner approval</span>
                }
                {[TASK_STATUS.APPROVED, TASK_STATUS.CREATED].includes(this.props.task.status) && isTaskOwner &&
                <span className="help-text">&nbsp; -
                    Please accept applicants up to the max accepted number
                </span>
                }
            </div>
            <div className="pull-right right-align">
                {this.props.task.status === TASK_STATUS.ASSIGNED && isTaskOwner &&
                <Popconfirm title="Are you sure you want to mark this task as complete?" placement="left" okText="Yes" onConfirm={this.acceptAsComplete.bind(this)}>
                    <Button>Accept as Complete</Button>
                </Popconfirm>
                }
                {this.props.task.status === TASK_STATUS.ASSIGNED && !isTaskOwner &&
                <Popconfirm title="Are you sure you want to mark this task as complete?" placement="left" okText="Yes" onConfirm={this.markAsComplete.bind(this)}>
                    <Button>Submit as Complete</Button>
                </Popconfirm>
                }
                {[TASK_STATUS.APPROVED, TASK_STATUS.CREATED].includes(this.props.task.status) && isTaskOwner &&
                <Popconfirm title="Are you sure you want to start this task with the current applicants?" placement="left" okText="Yes" onConfirm={this.forceStart.bind(this)}>
                    <Button>Force Start</Button>
                </Popconfirm>
                }
                {this.props.task.status !== TASK_STATUS.SUCCESS && isTaskOwner &&
                <Button onClick={this.switchEditMode.bind(this)}>
                    {this.state.editing ? 'Cancel' : 'Edit'}
                </Button>
                }
            </div>
            <div className="clearfix"/>
        </div>

    }

    renderAdminDetail() {

        return (
            <div>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        <h4>
                            Task Name
                        </h4>
                    </Col>
                    <Col span={16} className="gridCol">
                        <h3>
                            {this.props.task.name}
                        </h3>
                    </Col>
                </Row>
                <Row>
                <Col span={8} className="gridCol right-align">
                Community
                </Col>
                <Col span={16} className="gridCol">
                    {this.getCommunityDisp()}
                </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Organizer
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.task.createdBy.username}
                    </Col>
                </Row>
                <Row>
                <Col span={8} className="gridCol right-align">
                    Category
                    </Col>
                <Col span={16} className="gridCol">
                    {this.props.task.category}
                </Col>
                </Row>
                <Row>
                    <Col span={8} className="gridCol right-align">
                        Type
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.task.type}
                    </Col>
                </Row>
                <Row>
                <Col span={8} className="gridCol right-align">
                    Description
                    </Col>
                <Col span={16} className="gridCol">
                    <p>
                        {this.props.task.description ?
                            this.props.task.description :
                            <span className="no-info">no description</span>
                        }
                    </p>
                </Col>
                </Row>

                <Divider>ELA Requested</Divider>

                <Row>
                <Col span={8} className="gridCol right-align">
                    Upfront
                    </Col>
                <Col span={16} className="gridCol">
                    {this.props.task.rewardUpfront.ela / 1000}
                </Col>
                </Row>

                <Row>
                    <Col span={8} className="gridCol right-align">
                        Reward
                    </Col>
                    <Col span={16} className="gridCol">
                        {this.props.task.reward.ela / 1000}
                    </Col>
                </Row>

                <Divider>Attachments</Divider>
            </div>
        )
    }

    ord_render () {

        return (_.isEmpty(this.props.task) || this.props.task.loading ?
            <div class="center"><Spin size="large" /></div> :
            this.renderMain()
        )
    }

    // TODO: DRY - move to helper
    getCommunityDisp() {
        let str = ''
        if (this.props.task.communityParent) {
            str += this.props.task.communityParent.name + '/'
        }
        if (this.props.task.community) {
            str += this.props.task.community.name
        }

        return str
    }

    async approveTask() {
        const taskId = this.props.task._id
        await this.props.approveTask(taskId)

    }

    async acceptAsComplete() {
        const taskId = this.props.task._id
        await this.props.acceptAsCompleteTask(taskId)
    }

    async markAsComplete() {
        const taskId = this.props.task._id
        await this.props.completeTask(taskId)
    }

    async forceStart() {
        const taskId = this.props.task._id
        await this.props.forceStart(taskId)
    }

    async saveTask() {

    }

    async resetEdit() {

    }

    switchEditMode() {
        this.setState({editing: !this.state.editing})
    }

}
