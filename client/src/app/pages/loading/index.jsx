import React from 'react'
import PropTypes from 'prop-types'

import './loading.scss'

export default function Loading({ color, size, sizeUnit, full }) {
  const divStyle = { background: color, position: 'relative' }
  return (
    <div
      className={full === true ? 'ellipsis-spinner full' : 'ellipsis-spinner'}
      style={
        full === true ? {} : { width: size + sizeUnit, height: size + sizeUnit }
      }
    >
      <div style={divStyle} />
      <div style={divStyle} />
      <div style={divStyle} />
    </div>
  )
}

Loading.defaultProps = {
  size: 64,
  color: '#00bfff',
  sizeUnit: 'px',
  full: true,
}

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  sizeUnit: PropTypes.string,
  full: PropTypes.bool,
}
