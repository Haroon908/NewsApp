import React from 'react'
import loading from './loading.gif'


const Spinner = () => {

  return (
    <div className='text-center'>
      <img alt='' src={loading}></img>
    </div>
  )
}

export default Spinner