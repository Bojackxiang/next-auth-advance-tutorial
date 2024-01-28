import { auth } from '@/auth'
import React from 'react'

const SettingPage = async () => {
  const session = await auth()
  
  return (
    <div>
      setting page
    </div>
  )
}

export default SettingPage
