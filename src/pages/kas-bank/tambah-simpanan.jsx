import { Alert, Button, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import apiContext from '../../configs/api'
import axios from 'axios'
import { useRouter } from 'next/router'

const TambahSimpanan = () => {
  const [namaSimpanan, setNamaSimpanan] = useState('')
  const authToken = localStorage.getItem('accessToken')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSimpan = async () => {
    try {
      const post = await axios({
        method: 'post',
        url: apiContext.baseUrl + '/tipe-simpanan/create',
        headers: {
          Authorization: 'Bearer ' + authToken
        },
        data: {
          nama_simpanan: namaSimpanan
        }
      }).then(res => {
        router.push('/pengaturan/simpanan/')
      })
    } catch (error) {
      console.log(error)
      if (error) setError(error.response.data.msg)
    }
  }

  return (
    <>
      <Paper sx={{ p: 5 }}>
        <Typography sx={{ fontSize: 20, mb: 5 }}>Tambah Tipe Simpanan Baru</Typography>
        {error && (
          <Alert severity='warning' sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Nama Simpanan</Typography>
          <TextField
            sx={{ ml: 5, width: 3 / 4 }}
            id='outlined-basic'
            onChange={e => setNamaSimpanan(e.target.value)}
            value={namaSimpanan}
            label='Nama Simpanan'
            variant='outlined'
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 3 }}>
          <Button variant='contained' onClick={handleSimpan}>
            Simpan
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default TambahSimpanan
