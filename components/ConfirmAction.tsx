import React, { useState } from 'react'

const ConfirmAction = () => { 
  const [showConfirm, setShowCompleted] = useState<boolean>(false);

  return (
    <div className='confirmAction'>
        {/* <button onClick={() => resetState()}>Confirm</button>
        <button onClick={() => resetState()}>Cancel</button> */}
      
    </div>
  )
}

export default ConfirmAction