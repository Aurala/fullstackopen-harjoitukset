import PropTypes from 'prop-types'

const LoggedInUser = ({ name, handleLogout }) => {
  if (!name) {
    return null
  }

  return (
    <p>
      {name} logged in
      &nbsp;&nbsp;
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

LoggedInUser.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default LoggedInUser
