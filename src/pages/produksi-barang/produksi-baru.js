import { Button, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField'
import { TextareaAutosize } from '@mui/base'

const Detail = () => {
  const slug = useRouter().query.slug

  const [qty, setQty] = useState([
    {
      name: 1
    },
    {
      name: 1
    }
  ])

  const [data, setData] = useState([
    {
      id: 1,
      nama_barang: 'Eco Enzyme Liter',
      tipe: 'Barang Baku',
      jumlah: 10
    },
    {
      id: 2,
      nama_barang: 'Botol 100ml',
      tipe: 'Barang Bantu',
      jumlah: 100
    }
  ])

  const [barang, setBarang] = useState({
    id: 1,
    kode_akun: 123,
    nama_barang: 'Eco Enzyme 100ml',
    jumlah: 100
  })

  const tambah = () => {
    const newData = {
      name: 0
    }

    setQty([...qty, newData])
  }

  return (
    <>
      <Paper sx={{ p: 5 }}>
        <Typography variant='h4' sx={{ mb: 5 }}>
          Buat Produksi Baru
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField label='Nama barang yang akan diproduksi' fullWidth sx={{ pr: 2 }} />
          <TextField label='Jumlah barang yang akan diproduksi' type={'number'} fullWidth />
        </Box>

        <TextField label='Deskripsi barang yang akan diproduksi' type={'text'} sx={{ mt: 3 }} fullWidth />
      </Paper>

      <Paper sx={{ p: 5, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h4' sx={{ mb: 5 }}>
            Item Produksi
          </Typography>
          <Button onClick={tambah}>Tambah</Button>
        </Box>

        {qty && (
          <Box sx={{}}>
            {qty.map((p, index) => (
              <TextField key={index} label='Item bahan produksi' fullWidth sx={{ mb: 2 }} />
            ))}
          </Box>
        )}
      </Paper>
    </>
  )
}

export default Detail
