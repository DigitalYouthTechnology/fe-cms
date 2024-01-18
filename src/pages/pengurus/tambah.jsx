import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import apiContext from '../../configs/api'
import { useRouter } from 'next/router'

const Tambah = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone_number, setphone_number] = useState('')
  const [gender, setgender] = useState('')
  const authToken = localStorage.getItem('accessToken')
  const router = useRouter()

  const handleSave = async () => {
    try {
      const newUser = await axios({
        method: 'post',
        url: apiContext.baseUrl + '/user/create',
        headers: {
          Authorization: 'Bearer ' + authToken
        },
        data: {
          name,
          email,
          address,
          phone_number,
          gender,
          role_id: 1
        }
      })
        .then(res => {
          console.log(res)
          router.push('/anggota')
        })
        .catch(err => {
          console.log(err)
        })
    } catch (newUser) {
      console.log(newUser)
    }
  }

  return (
    <>
      <Typography sx={{ fontSize: 20, my: 3 }}>Tambah Anggota Koperasi</Typography>
      <Paper sx={{ p: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Nama Anggota</Typography>
          <TextField
            sx={{ ml: 5, width: 3 / 4 }}
            id='outlined-basic'
            onChange={e => setname(e.target.value)}
            value={name}
            label='Nama'
            variant='outlined'
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Email</Typography>
          <TextField
            sx={{ ml: 5, width: 3 / 4 }}
            id='outlined-basic'
            onChange={e => setemail(e.target.value)}
            value={email}
            label='Email'
            variant='outlined'
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Alamat</Typography>
          <TextField
            sx={{ ml: 5, width: 3 / 4 }}
            id='outlined-basic'
            onChange={e => setaddress(e.target.value)}
            value={address}
            label='Alamat'
            variant='outlined'
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Nomor Hp</Typography>
          <TextField
            sx={{ ml: 5, width: 3 / 4 }}
            id='outlined-basic'
            onChange={e => setphone_number(e.target.value)}
            value={phone_number}
            label='Nomor Hp'
            variant='outlined'
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 3 }}>
          <Typography sx={{ width: 1 / 3, maxWidth: 1 / 3, justifyContent: 'space-between' }}>Jenis Kelamin</Typography>
          <FormControl sx={{ ml: 5, width: 3 / 4 }}>
            <InputLabel id='demo-simple-select-disabled-label'>Jenis Kelamin</InputLabel>
            <Select
              labelId='demo-simple-select-disabled-label'
              value={gender}
              onChange={e => setgender(e.target.value)}
              label='Jenis Kelamin'
            >
              <MenuItem value={null}>Pilih</MenuItem>
              <MenuItem value={'Laki-Laki'}>Laki-Laki</MenuItem>
              <MenuItem value={'Perempuan'}>Perempuan</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant='contained' onClick={handleSave}>
            Tambah Pengguna
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default Tambah
