const Logout = (props) => {
  const handleClick = async () => {
    const res = await fetch("/users/logout", {
      method: "POST"
    })
    props.handleLogout()
  }

  return (
    <button onClick={handleClick}>Logout</button>
  )
}

export default Logout
