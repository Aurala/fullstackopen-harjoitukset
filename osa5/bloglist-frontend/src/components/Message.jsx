// Component for displaying error/status messages

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

  export default Message
