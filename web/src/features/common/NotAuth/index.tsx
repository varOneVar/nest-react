import React from 'react'
import { useHistory } from 'react-router-dom'

function NotAuth() {
  const history = useHistory()
  return (
    <div>
      <p onClick={() => history.replace('/login')}>no auth</p>
    </div>
  )
}

export default NotAuth