import React from 'react'
import { isExternal } from '../../common/utils'
import './index.scss'
interface SvgIconProps {
  iconClass: string;
  className?: string;
}

function styleExternalIcon(iconClass: string) {
  return {
    mask: `url(${iconClass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`
  }
}
function iconName(iconClass: string) {
  return `#icon-${iconClass}`
}
function svgClass(className?: string) {
  if (className) {
    return 'svg-icon ' + className
  } else {
    return 'svg-icon'
  }
}
function SvgIcon(props: SvgIconProps) {
  const renderDom = isExternal(props.iconClass)
    ? <div style={styleExternalIcon(props.iconClass)} className="svg-external-icon svg-icon" />
    : (
      <svg className={svgClass(props.className)} aria-hidden="true">
        <use xlinkHref={iconName(props.iconClass)} />
      </svg>
    )
  return (
    <>
      {renderDom}
    </>
  )
}

export default SvgIcon