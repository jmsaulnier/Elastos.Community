import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import {
    Form,
    Input,
    Button,
    Select
} from 'antd'
import {SUBMISSION_TYPE} from '@/constant'

const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

class C extends BaseComponent {
    ord_states() {
        return {
            loading: false
        }
    }

    handleSubmit (e) {
        e.preventDefault()

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({ loading: true });

                const createParams = {...values}

                await this.props.create(createParams);

                this.setState({loading: false});
                this.props.history.push('/profile/submissions');
            }
        })
    }

    getInputProps () {
        const {getFieldDecorator} = this.props.form;

        const input_el = (
            <Input size="large"/>
        )

        const title_fn = getFieldDecorator('title', {
            rules: [{required: true, message: 'Title is required'}],
            initialValue: ''
        })

        const type_fn = getFieldDecorator('type', {
            rules: [{required: true, message: 'Please select an issue type'}],
            initialValue: this.state.issueType || SUBMISSION_TYPE.BUG
        })
        const type_el = (
            <Select
                onChange={(val) => this.setState({type: val})}>
                <Option value={SUBMISSION_TYPE.BUG}>Bug</Option>
                <Option value={SUBMISSION_TYPE.SECURITY_ISSUE}>Security Issue</Option>
                <Option value={SUBMISSION_TYPE.SUGGESTION}>Suggestion</Option>
                <Option value={SUBMISSION_TYPE.ADD_COMMUNITY}>Add Community</Option>
                <Option value={SUBMISSION_TYPE.OTHER}>Other</Option>
            </Select>
        )

        const description_fn = getFieldDecorator('description', {
            rules: [
                {required: true, message: 'You must have a description'},
                {max: 4096, message: 'Task description too long'}
            ],
            initialValue: ''
        })
        const description_el = (
            <TextArea rows={6}></TextArea>
        )

        return {
            title: title_fn(input_el),
            type: type_fn(type_el),
            description: description_fn(description_el)
        }
    }

    ord_render () {
        const p = this.getInputProps()

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12}
            }
        }

        return (
            <div className="c_userEditFormContainer">

                <Form onSubmit={this.handleSubmit.bind(this)} className="d_taskCreateForm">
                    <div>
                        <FormItem label="Type" {...formItemLayout}>
                            {p.type}
                        </FormItem>
                        <FormItem label="Title" {...formItemLayout}>
                            {p.title}
                        </FormItem>
                        <FormItem label="Description" {...formItemLayout}>
                            {p.description}
                        </FormItem>
                        <FormItem wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 12, offset: 8}}}>
                            <Button loading={this.state.loading} type="ebp" htmlType="submit" className="d_btn">
                                Create Issue
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(C)
