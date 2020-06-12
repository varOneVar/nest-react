import React, { useCallback } from 'react'
import { Form, Icon, Input, Button,  message } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import style from './login.module.scss'
import { API__registry } from '../../../common/api/work'
import { useDispatch } from 'react-redux'
import { saveUserInfo } from './store/action-creators'
import StorageJs from '../../../common/utils/storage'
const storage = new StorageJs('login_')

const Registry = (props: formWithRouterProps) => {
  const { getFieldDecorator } = props.form;

  const dispatch = useDispatch()
  const dispatchUserInfo = useCallback((data:User.userType) => dispatch(saveUserInfo(data)), [dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      console.log(values, err)
      const { username, pwd } = values
      if (!err) {
        if (pwd.length < 6) {
          message.error('密码最少6位')
          return
        }
        const { data: { code, msg, data } } = await API__registry({ username, pwd })
        console.log(code, msg, data)
        if (code === '0') {
          message.success('注册成功！')
          dispatchUserInfo({ username, pwd })
          storage.session.set('userinfo', { username, pwd })
          props.history.replace('/')
        } else {
          message.error(msg)
        }
      }
    });
  };
  return (
    <div className={style.wrapper}>
      <img className={style.logo} src={require('./logo.png')} alt="logo"/>
      <Form onSubmit={ handleSubmit } className="login-form">
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
          <Button type="primary" block htmlType="submit" className="login-form-button">
            注 册
          </Button>
          <Link to="/login" replace>返回登录</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create({ name: 'registry_' })(withRouter(Registry));