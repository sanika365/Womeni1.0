import React, { useEffect, useSyncExternalStore } from 'react'

import { useRouter } from 'next/router';
const Myaccount = () => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
    },[router.query])
  return (
    <div>
      
    </div>
  )
}

export default Myaccount
