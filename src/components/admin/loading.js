import React from 'react'
import { dataList } from './dataList';

const Loading = () => {
  return (

    <div className="loader-custom">
    <div className="loader-container-inner">
      <div className="text-center">
      <div className="loader">Loading...</div>
        <h6 className="mt-2">{dataList.please_wait}</h6>
      </div>{" "}
    </div>
  </div>
    
  )
}
export default Loading