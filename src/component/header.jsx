import React from 'react'

export default function header({setIsAdding}) {
  return (
    <div>
     <header>
      <h1>Form</h1>
      <div style={{marginTop: '30px', marginBottom: '18px'}}>
        <button onClick={() => setIsAdding(true)} className='round-button'>Add Button</button>
      </div>
     </header>
    </div>
  )
}
