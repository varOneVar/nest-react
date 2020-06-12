import React, { useCallback } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import style from './login.module.scss'
import { API__login } from '../../../common/api/work'
import { useDispatch } from 'react-redux'
import { saveUserInfo } from './store/action-creators'
import StorageJs from '../../../common/utils/storage'
const storage = new StorageJs('login_')

const Login = (props: formWithRouterProps) => {
  console.log(props)
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch()
  const dispatchUserInfo = useCallback((data: User.userType) => dispatch(saveUserInfo(data)), [dispatch])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      const { username, pwd, remember } = values
      if (!err) {
        if (pwd.length < 6) {
          message.error('密码最少6位')
          return
        }
        const { data: { code, msg, data } } = await API__login({ username, pwd })
        console.log(code, msg, data)
        if (code === '0') {
          message.success('登录成功！')
          const roles = remember ? ['admin'] : ['normal']
          const state = { username, pwd, roles, logger: true }
          dispatchUserInfo(state)
          storage.session.set('userinfo', state)
          props.history.replace('/')
        } else {
          message.error(msg)
        }
      }
    });
  };
  return (
    <div className={style.wrapper}>
      <img className={style.logo} src={require('./logo.png')} alt="logo" />
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('pwd', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>权限登录</Checkbox>)}
          <Button type="primary" block htmlType="submit" className="login-form-button">
            登 录
          </Button>
          <Link to="/registry" replace>立即注册!</Link>
        </Form.Item>
      </Form>
    </div>
  )
}
export default Form.create({ name: 'login_' })(withRouter(Login));