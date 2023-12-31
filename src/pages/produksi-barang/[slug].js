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
    field: 'nama_barang',
    minWidth: 10,
    headerName: 'Nama Barang',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.nama_barang}
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
  }
]

const Detail = () => {
  const slug = useRouter().query.slug

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

  return (
    <>
      <Paper sx={{ p: 5 }}>
        <Typography variant='h4' sx={{ mb: 5 }}>
          Detail Produksi
        </Typography>
        <Typography variant='h6' sx={{ mb: 5 }}>
          ID PRODUKSI : {slug}
        </Typography>
        <Typography variant='h6' sx={{ mb: 5 }}>
          NAMA BARANG : {barang.nama_barang}
        </Typography>
        <Typography variant='h6' sx={{ mb: 5 }}>
          JUMLAH PRODUKSI : {barang.jumlah}
        </Typography>
      </Paper>
      <Paper sx={{ p: 5, mt: 3 }}>
        <Typography variant='h4' sx={{ mb: 5 }}>
          Detail Material Produksi
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
