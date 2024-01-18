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
import apiContext from '../../../../configs/api'
import { Box } from '@mui/system'
import Simpan from './createSimpanan'
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
      <Paper sx={{ p: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            width: 1 / 2,
            marginBottom: 5
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 300 }} aria-label='simple table'>
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
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: 1 / 2,
            marginBottom: 5
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 300 }} aria-label='simple table'>
              <TableHead>
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
        {/* <Box
          sx={{
            display: 'flex',
            width: 1 / 3,
            maxWidth: 1 / 3
          }}
        >
          <Box sx={{ width: 1 / 3 }}>
            <Typography sx={{ mr: 5 }}>Name</Typography>
            <Typography sx={{ mr: 5 }}>No Anggota</Typography>
            <Typography sx={{ mr: 5 }}>No Hp</Typography>
          </Box>
          <Box sx={{ width: 2 / 3 }}>
            <Typography>: {data.name}</Typography>
            <Typography>: {data.no_anggota}</Typography>
            <Typography>: {data.phone_number}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: 1 / 3,
            maxWidth: 1 / 3
          }}
        >
          <Box sx={{ width: 1 / 3 }}>
            <Typography sx={{ mr: 5 }}>Email</Typography>
            <Typography sx={{ mr: 5 }}>No Anggota</Typography>
            <Typography sx={{ mr: 5 }}>Terdaftar pada</Typography>
          </Box>
          <Box sx={{ width: 2 / 3 }}>
            <Typography>: {data.email}</Typography>
            <Typography>: {data.address}</Typography>
            <Typography>: {data.createdAt}</Typography>
          </Box>
        </Box> */}
      </Paper>

      <Typography sx={{ fontSize: 20, mt: 5 }}>Buka Simpanan</Typography>

      <Simpan data={data} />
    </>
  )
}

export default Page
