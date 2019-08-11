import PropTypes from 'prop-types'

export default {
  column: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  error: PropTypes.string
}
