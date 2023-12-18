import { Button, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import apiContext from '../../../configs/api'
import { Box } from '@mui/system'

const Page = () => {
  const router = useRouter()
  const id_user = router.query.slug
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')
  const [selectedSimpanan, setSelectedSimpanan] = useState(0)
  const [nominal, setNominal] = useState(0)
  const [deskripsi, setDeskripsi] = useState('')
  const convertRupiah = require('rupiah-format')

  useEffect(() => {
    const getSimpanan = async () => {
      await axios
        .get(apiContext.baseUrl + '/simpanan/user/' + id_user, {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
        .then(res => {
          setData(res.data.simpanan)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    getSimpanan()
  }, [id_user])

  console.log(data)

  const handleTarik = async () => {
    if (!nominal || !deskripsi || !selectedSimpanan) {
      alert('data tidak lengkap')
    }

    const save = {
      user_id: data[0].user_id,
      tipe_simpanan: selectedSimpanan,
      nominal: nominal,
      deskripsi: deskripsi,
      tipe_transaksi: 'kredit'
    }

    await axios({
      method: 'post',
      url: apiContext.baseUrl + '/simpanan/update',
      headers: {
        Authorization: 'Bearer ' + authToken
      },
      data: save
    })
      .then(res => {
        router.push('/anggota/simpanan/' + data[0].user_id)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <Typography sx={{ fontSize: 20, mt: 5 }}>Tarik Simpanan</Typography>
      <Paper sx={{ p: 5, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>
            Jenis Simpanan
          </Typography>
          <Select
            sx={{ ml: 5, width: 3 / 4 }}
            value={selectedSimpanan}
            onChange={e => setSelectedSimpanan(e.target.value)}
          >
            {data.length == 0 ? (
              <MenuItem value={0}>Null</MenuItem>
            ) : (
              <MenuItem value={0}>Pilih tipe simpanan</MenuItem>
            )}
            {data.map(tipe => {
              return (
                <MenuItem key={tipe.id} value={tipe.simpanan.kode_akun}>
                  {tipe.simpanan.nama_simpanan} - {convertRupiah.convert(tipe.saldo_setelah)}
                </MenuItem>
              )
            })}
          </Select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Nominal</Typography>
          <TextField
            sx={{ ml: 5, width: 3 / 4 }}
            type='number'
            onChange={e => setNominal(e.target.value)}
            defaultValue={nominal}
            id='outlined-basic'
            label='Nominal'
            variant='outlined'
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>
            Metode Pembayaran
          </Typography>
          <TextField sx={{ ml: 5, width: 3 / 4 }} id='outlined-basic' label='Metode Pembayaran' variant='outlined' />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Deskripsi</Typography>
          <TextField
            sx={{ ml: 5, width: 3 / 4 }}
            id='outlined-basic'
            onChange={e => setDeskripsi(e.target.value)}
            value={deskripsi}
            label='Deskripsi'
            variant='outlined'
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 3 }}>
          <Button variant='contained' onClick={handleTarik}>
            Simpan
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default Page
