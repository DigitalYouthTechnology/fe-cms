import { Button, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import apiContext from '../../../configs/api'
import { Box } from '@mui/system'
import dateFormat, { masks } from 'dateformat'

const Page = () => {
  const router = useRouter()
  const id_user = router.query.slug
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')
  const [simpanan, setSimpanan] = useState([])

  const getSimpanan = async () => {
    await axios
      .get(apiContext.baseUrl + '/simpanan/user/' + id_user, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
      .then(res => {
        setSimpanan(res.data.simpanan)
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

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
    getSimpanan()
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
            justifyContent: 'space-between',
            my: 3
          }}
        >
          <Button
            sx={{ mb: 2 }}
            variant='contained'
            color='primary'
            onClick={() => router.push('/anggota/create-simpanan/' + id_user)}
          >
            Simpanan Baru
          </Button>
        </Box>
      </Paper>

      <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap' }}>
        {simpanan.map((simp, idx) => {
          return idx % 2 == 0 ? (
            <Paper key={simp.id} sx={{ p: 5, width: '49.3%', mr: 2, my:3 }}>
              <Typography>{simp.simpanan.nama_simpanan}</Typography>
              <hr />
              <SimpananDetail simp={simp} />
            </Paper>
          ) : (
            <Paper key={simp.id} sx={{ p: 5, width: '49.3%', ml: 2, my:3 }}>
              <Typography>{simp.simpanan.nama_simpanan}</Typography>
              <hr />
              <SimpananDetail simp={simp} />
            </Paper>
          )
        })}
      </Box>
    </>
  )
}

const SimpananDetail = props => {
  const router = useRouter()
  const id_user = router.query.slug
  const { simp } = props

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
        <Typography>Kode Akun</Typography>
        <Typography>{simp.kode}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
        <Typography>Nominal</Typography>
        <Typography>{simp.saldo_setelah}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
        <Typography>Deskripsi Terakhir</Typography>
        <Typography>{simp.deskripsi}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
        <Typography>Transaksi Terakhir</Typography>
        <Typography>{dateFormat(simp.updateAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Button
          variant='contained'
          sx={{ mx: 2 }}
          color='primary'
          onClick={() => router.push('/anggota/tarik-simpanan/' + id_user)}
        >
          Tarik Simpanan
        </Button>
        <Button
          variant='contained'
          sx={{ mx: 2 }}
          color='primary'
          onClick={() => router.push('/anggota/tarik-simpanan/' + id_user)}
        >
          Riwayat Simpanan
        </Button>
      </Box>
    </>
  )
}

export default Page
