import React from 'react'
import PropTypes from 'prop-types'

export default function Stack(props) {
  return <p>{props.text}</p>
}

Stack.propTypes = {
  text: PropTypes.string,
}

Stack.defaultProps = {
  text: 'Clean ReactJS App!',
}
