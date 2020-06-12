import React, { useEffect } from 'react'
import { API_uploadImg } from '../../../common/api/work'

async function uploadImage() {
  try {
    const res = await API_uploadImg()
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
function Collect() {
  useEffect(() => {
    uploadImage()
  }, [])
  return (
    <div>Collect</div>
  )
}

export default Collect