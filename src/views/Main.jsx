import React, { useContext, useEffect } from 'react'
import Button from '@mui/material/Button'
import { AuthContext } from '../contexts/AuthContext'

export default function Main() {

  const { logout, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [])


  return (
    <>
      <div>Main</div>
      <Button variant="text" onClick={logout} color="primary">

      </Button>
    </>
  )
}
