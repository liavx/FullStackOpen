import { useState, forwardRef, useImperativeHandle } from 'react'


const Togglable = forwardRef((props,refs) => {
  const [visible, setVisible] = useState(false)
  const [remountId, setRemountId] = useState(0)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    if (visible) {
      setRemountId(id => id + 1)
    }
    setVisible(v => !v)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })


  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div key={remountId}>
          {props.children}
        </div>
        <button type="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable