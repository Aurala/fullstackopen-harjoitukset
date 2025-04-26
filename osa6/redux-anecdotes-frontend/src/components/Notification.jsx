import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => {
    console.log('Notification state:', state.notification);
    console.log('Notification type:', typeof state.notification);
    return state.notification
  })

  console.log('Notification message:', message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!message || message.trim().length == 0) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
