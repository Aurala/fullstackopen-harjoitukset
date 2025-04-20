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

export default LoggedInUser
