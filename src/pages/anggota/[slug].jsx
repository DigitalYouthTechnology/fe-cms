import { Button, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import apiContext from '../../configs/api'
import { Box } from '@mui/system'
import dateFormat, { masks } from 'dateformat'

const Page = () => {
  const router = useRouter()
  const id_user = router.query.slug
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(apiContext.baseUrl + '/user/' + id_user, {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
        .then(res => {
          setData(res.data.user)
          console.log(data)
        })
    }
    fetchUser()
  }, [id_user])

  return (
    <>
      <Typography sx={{ fontSize: 20, fontWeight: 900 }}>Info Akun</Typography>
      <Paper sx={{ p: 5, display: 'flex', alignItems: 'start' }}>
        <Box
          sx={{
            display: 'flex',
            width: 1
          }}
        >
          <Box sx={{ width: 1 / 3 }}>
            <Typography sx={{ mr: 5, my: 2 }}>Nama Anggota</Typography>
            <Typography sx={{ mr: 5, my: 2 }}>No Anggota</Typography>
            <Typography sx={{ mr: 5, my: 2 }}>No Hp</Typography>
            <Typography sx={{ mr: 5, my: 2 }}>Email</Typography>
            <Typography sx={{ mr: 5, my: 2 }}>No Anggota</Typography>
            <Typography sx={{ mr: 5, my: 2 }}>Terdaftar pada</Typography>
          </Box>
          <Box sx={{ width: 2 / 3 }}>
            <Typography sx={{ my: 2 }}>: {data.name}</Typography>
            <Typography sx={{ my: 2 }}>: {data.no_anggota}</Typography>
            <Typography sx={{ my: 2 }}>: {data.phone_number}</Typography>
            <Typography sx={{ my: 2 }}>: {data.email}</Typography>
            <Typography sx={{ my: 2 }}>: {data.address}</Typography>
            <Typography sx={{ my: 2 }}>: {dateFormat(data.createdAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 1 / 2,
            justifyContent: 'space-between'
          }}
        >
          <Button
            sx={{ mb: 2 }}
            variant='contained'
            color='primary'
            onClick={() => router.push('/anggota/create-simpanan/' + id_user)}
          >
            Buka Simpanan
          </Button>
          <Button
            sx={{ mb: 2 }}
            variant='contained'
            color='primary'
            onClick={() => router.push('/anggota/simpanan/' + id_user)}
          >
            Data Simpanan
          </Button>
          <Button sx={{ mb: 2 }} variant='contained' color='primary'>
            Edit Profil
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default Page
