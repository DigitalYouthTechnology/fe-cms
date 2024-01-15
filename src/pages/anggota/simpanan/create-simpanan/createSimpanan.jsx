import { Button, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import apiContext from '../../../../configs/api'
import axios from 'axios'
import { useRouter } from 'next/router'
import useAlert from 'src/components/alert'

const CreateSimpanan = props => {
  const router = useRouter()
  const { data } = props
  const authToken = localStorage.getItem('accessToken')
  const [tipeSimpanan, setTipeSimpanan] = useState([])
  const [kasBank, setKasBank] = useState([])
  const [selectedSimpanan, setSelectedSimpanan] = useState(0)
  const [nominal, setNominal] = useState(0)
  const [deskripsi, setDeskripsi] = useState('')
  const [metodeBayar, setMetodeBayar] = useState(0)

  const handleChange = event => {
    setSelectedSimpanan(event.target.value)
  }

  useEffect(() => {
    const fetchTipeSimpanan = async () => {
      await axios
        .get(apiContext.baseUrl + '/tipe-simpanan/all', {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
        .then(res => {
          setTipeSimpanan(res.data.tipe_simpanan)
        })
        .catch(e => {
          console.log(e)
          setTipeSimpanan([])
        })
    }

    const fetchKasBank = async () => {
      await axios
        .get(apiContext.baseUrl + '/rekening/all', {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
        .then(res => {
          setKasBank(res.data.rekening)
        })
        .catch(e => {
          console.log(e)
          setTipeSimpanan([])
        })
    }
    fetchTipeSimpanan()
    fetchKasBank()
    console.log(tipeSimpanan)
  }, [data])

  const handleSimpan = async () => {
    if (!nominal || !deskripsi || !selectedSimpanan) {
      useAlert({
        title: 'Form tidak boleh kosong!',
        text: 'Silahkan isi semua form',
        icon: 'error',
        backdrop: false
      })
    }

    const save = {
      user_id: data.id,
      tipe_simpanan: selectedSimpanan,
      nominal: nominal,
      deskripsi: deskripsi,
      tipe_transaksi: 'debit'
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
        router.push('/anggota/simpanan/' + data.id)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <Paper sx={{ p: 5, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
        <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Jenis Simpanan</Typography>
        <Select sx={{ ml: 5, width: 3 / 4 }} value={selectedSimpanan} onChange={e => handleChange(e)}>
          {tipeSimpanan.length == 0 ? (
            <MenuItem value={0}>Null</MenuItem>
          ) : (
            <MenuItem value={0}>Pilih tipe simpanan</MenuItem>
          )}
          {tipeSimpanan.map(tipe => {
            return (
              <MenuItem key={tipe.id} value={tipe.kode_akun}>
                {tipe.nama_simpanan}
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
        <Select sx={{ ml: 5, width: 3 / 4 }} value={metodeBayar} onChange={e => setMetodeBayar(e.target.value)}>
          {kasBank.length == 0 ? (
            <MenuItem value={0}>Null</MenuItem>
          ) : (
            <MenuItem value={0}>Pilih tipe simpanan</MenuItem>
          )}
          {kasBank.map(tipe => {
            return (
              <MenuItem key={tipe.id} value={tipe.kode_akun}>
                {tipe.nama_rekening}
              </MenuItem>
            )
          })}
        </Select>
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
        <Button variant='contained' onClick={handleSimpan}>
          Simpan
        </Button>
      </Box>
    </Paper>
  )
}

export default CreateSimpanan
