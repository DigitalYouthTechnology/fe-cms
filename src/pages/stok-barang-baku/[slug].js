import { Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const columns = [
  {
    flex: 0.1,
    field: 'no',
    minWidth: 10,
    headerName: 'NO',
    renderCell: ({ row }) => {
      const { id } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {id}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'kode_transaksi',
    minWidth: 10,
    headerName: 'Kode Transaksi/ Mutasi',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.kode_transaksi}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'tipe',
    minWidth: 10,
    headerName: 'Tipe',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.tipe}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'jumlah',
    minWidth: 10,
    headerName: 'Jumlah',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.jumlah}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'jumlah_awal',
    minWidth: 10,
    headerName: 'Jumlah Awal',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.jumlah_awal}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'jumlah_akhir',
    minWidth: 10,
    headerName: 'Jumlah Akhir',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.jumlah_akhir}
        </Typography>
      )
    }
  }
]

const Detail = () => {
  const slug = useRouter().query.slug

  const [data, setData] = useState([
    {
      id: 1,
      kode_transaksi: 'TRX/001/2023',
      tipe: 'MASUK',
      jumlah: 10,
      jumlah_awal: 0,
      jumlah_akhir: 10
    },
    {
      id: 2,
      kode_transaksi: 'PROD/001/2023',
      tipe: 'KELUAR',
      jumlah: 10,
      jumlah_awal: 10,
      jumlah_akhir: 0
    }
  ])

  const [barang, setBarang] = useState({
    id: 1,
    kode_akun: 123,
    nama_barang: 'Eco Enzyme',
    jumlah: 0
  })

  return (
    <>
      <Paper sx={{ p: 5 }}>
        <Typography variant='h4' sx={{ mb: 5 }}>
          Detail Stok Barang
        </Typography>
        <Typography variant='h6' sx={{ mb: 5 }}>
          ID BARANG : {slug}
        </Typography>
        <Typography variant='h6' sx={{ mb: 5 }}>
          NAMA BARANG : {barang.nama_barang}
        </Typography>
        <Typography variant='h6' sx={{ mb: 5 }}>
          TOTAL STOK : {barang.jumlah}
        </Typography>
      </Paper>
      <Paper sx={{ p: 5, mt: 3 }}>
        <Typography variant='h4' sx={{ mb: 5 }}>
          Mutasi Barang
        </Typography>
        <DataGrid
          sx={{
            mt: 3,
            border: '1px solid #00000020'
          }}
          autoHeight
          pagination
          rows={data}
          rowHeight={62}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5, 10]}
        />
      </Paper>
    </>
  )
}

export default Detail
