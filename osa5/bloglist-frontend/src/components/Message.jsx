import PropTypes from 'prop-types'

const Message = ({ message, isError }) => {
  if (!message) {
    return null
  }

  return (
    <div className={isError ? 'error' : 'success'}>
      {message}
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
}

export default Message
