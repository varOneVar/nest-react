import React from 'react'
import { useHistory } from 'react-router-dom'

function Erro500() {
  const history = useHistory()
  return (
    <div>
      <p onClick={() => history.replace('/login')}>500登录</p>
      <p onClick={() => history.replace('/')}>首页</p>
    </div>
  )
}

export default Erro500