import { Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiContext from '../../configs/api'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { ButtonsTonalJSXCode } from 'src/views/components/buttons/ButtonsSourceCode'

const TipeSimpanan = () => {
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(apiContext.baseUrl + '/rekening/all', {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
        .then(res => {
          setData(res.data.rekening)
        })
        .catch(err => {
          console.log(err)
        })
    }

    fetchData()
  }, [])

  const convertRupiah = require('rupiah-format')

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3, alignItems: 'center' }}>
        <Typography sx={{ fontSize: 20 }}>Rekening</Typography>
        <Button variant='outlined' onClick={() => router.push('/pengaturan/simpanan/tambah-simpanan')}>
          Tambah Rekening
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((data, index) => (
          <Paper
            key={index}
            sx={{
              m: 3,
              p: 5,
              width: '48%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 15 }}>{data.kode_akun}</Typography>
              <Typography sx={{ fontSize: 20, my: 2 }}>{data.nama_rekening}</Typography>
              <Typography sx={{ fontSize: 15 }}>{data.deskripsi}</Typography>
            </Box>
            <Typography sx={{ fontSize: 18 }}>{convertRupiah.convert(data.balance)}</Typography>
          </Paper>
        ))}
      </Box>
    </>
  )
}

export default TipeSimpanan
