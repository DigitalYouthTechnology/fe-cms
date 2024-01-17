import {
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
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
      <Paper sx={{ p: 5, display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            width: 1,
            marginBottom: 5,
          }}
        >
          <TableContainer> 
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Nama Anggota</TableCell>
                <TableCell>: {data.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>No Anggota</TableCell>
                <TableCell>: {data.no_anggota}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>No Hp</TableCell>
                <TableCell>: {data.phone_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>: {data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Alamat</TableCell>
                <TableCell>: {data.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Terdaftar Pada</TableCell>
                <TableCell>: {dateFormat(data.createdAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          </TableContainer>
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
            sx={{ mb: 2,  }}
            variant='contained'
            color='primary'
            onClick={() => router.push('/anggota/simpanan/create-simpanan/' + id_user)}
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
