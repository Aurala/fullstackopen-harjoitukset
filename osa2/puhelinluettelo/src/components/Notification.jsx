// Component for displaying success messages

const Notification = ({ message }) => {
    if (message === '') {
      return null
    }
  
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  export default Notification
