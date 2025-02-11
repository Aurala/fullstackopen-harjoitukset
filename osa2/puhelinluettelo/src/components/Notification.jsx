// Component for displaying success messages

const Notification = ({ notification }) => {
    if (notification.message === '') {
      return null
    }
  
    return (
      <div className={notification.error ? 'error' : 'success'}>
        {notification.message}
      </div>
    )
  }

  export default Notification
