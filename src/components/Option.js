import React from 'react'

const Option = ({ opt, selected, handleSubmit }) => {
    
  return (
    <button style={{cursor: selected ? 'not-allowed': 'pointer'}} disabled={selected} className="answer" onClick={handleSubmit}>{opt.option}</button>
  )
}

export default Option