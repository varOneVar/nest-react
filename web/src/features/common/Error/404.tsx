import React from 'react'
import style from './404.module.scss'
import { useHistory } from 'react-router'
import classNames from 'classnames';
import { Button, Typography } from 'antd'
const { Title, Paragraph, Text } = Typography;

const btnstyle = classNames(['text-center', style['btn-wrapper']])

function Error404 () {
  const history = useHistory()
  const goHome = () => {
    history.replace('/')
  }
  return (
    <div className={style.wrapper}>
      <Typography>
        <Title className="text-center">404</Title>
        <Title level={4} className="text-center">很抱歉，您要访问的页面不存在！</Title>
        <Paragraph className={style['btn-wrapper']}>
          <Text strong>温馨提示：</Text>
          <br />
          <Text>请检查您访问的网址是否正确</Text>
          <br />
          <Text>如有任何意见或建议，请及时反馈给我们。</Text>
        </Paragraph>
      </Typography>
      <div className={btnstyle}>
      <Button type="primary" onClick={goHome}>返回首页</Button>
      </div>
    </div>
  )
}

export default Error404