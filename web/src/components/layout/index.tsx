import React from 'react'
import FooterBar from './component/footerBar'
import { useHistory } from 'react-router-dom'

function Layout(props: any) {
  const history = useHistory()
  console.log(77777777777)
  return (
    <div>
      <p onClick={() => history.replace('/err500')}>layout</p>
      {props.children}
      <FooterBar />
    </div>
  )
}
export default Layout