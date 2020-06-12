import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import './footerBar.scss'
import SvgIcon from '../../svgIcon'

const barList = [{
  name: '推荐',
  path: '/home/recommend',
  icon: 'recommend-default',
  activerIcon: 'recommend-checked'
}, {
  name: '馆藏',
  path: '/home/collect',
  icon: 'collect-default',
  activerIcon: 'collect-checked'
}, {
  name: '动态',
  path: '/home/dynamic',
  icon: 'dynamic-default',
  activerIcon: 'dynamic-checked'
}, {
  name: '我的',
  path: '/home/mine',
  icon: 'mine-default',
  activerIcon: 'mine-checked'
}]

function FooterBar() {
  const match = useRouteMatch()
  // const params = useParams()
  return (
    <footer className="footer-bar flex-sa-c">
      {
        barList.map(v => (
          <div
            key={v.path}
            className="footer-bar__item flex1 text-center"
          >
            <SvgIcon iconClass={match.path === v.path ? v.activerIcon : v.icon} />
            <NavLink
              className="footer-bar__item--normal"
              activeClassName="footer-bar__item--active"
              exact
              to={v.path}
            >
              <p className="text-center">{v.name}</p>
            </NavLink>
          </div>
        ))
      }
    </footer>
  )
}
export default FooterBar