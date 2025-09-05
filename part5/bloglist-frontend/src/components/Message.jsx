const Message = ({ message }) => {

  if (message === null) {
    return null
  }
  return (
    <div className="notification show">
      {message}
    </div>
  )
}

export default Message