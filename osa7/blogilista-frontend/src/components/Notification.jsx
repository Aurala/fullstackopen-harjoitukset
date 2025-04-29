import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification
  })

  console.log('Notification:', notification)

  const style = {
    border: 'solid',
    padding: '10px 10px 10px 10px',
    marginBottom: '10px',
    borderWidth: 1,
  }

  if (!notification || !notification.message) {
    return null
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
