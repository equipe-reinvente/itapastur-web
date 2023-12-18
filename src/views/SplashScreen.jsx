import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Paper, Box } from '@mui/material';
import ItapasturLogo from '../assets/itapastur.png'

export default function SplashScreen() {

  const { verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [])

  return (
    <Paper style={{ backgroundColor: "teal", width: '100vw', height: '100vh' }}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        component="img"
        alignSelf="center"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="Itapastur"
        src={ItapasturLogo}
      />
    </Paper>
  )
}
