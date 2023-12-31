import { Button, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const columns = [
  {
    flex: 0.1,
    field: 'no',
    minWidth: 220,
    headerName: 'NO',
    renderCell: ({ row }) => {
      const { index } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {index}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'kode_akun',
    minWidth: 220,
    headerName: 'Kode Akun',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.kode_akun}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'nama_barang',
    minWidth: 220,
    headerName: 'nama_barang',
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
    field: 'jumlah',
    minWidth: 220,
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
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: row => <Detail id={row.id} />
  }
]

const Detail = props => {
  const router = useRouter()

  return (
    <Button variant='contained' onClick={() => router.push('/stok-barang-baku/' + props.id)}>
      <Icon icon='mdi:eye' />
    </Button>
  )
}

import apiContext from '../../configs/api'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

const Pengurus = () => {
  const [data, setData] = useState([
    {
      id: 1,
      kode_akun: 123,
      nama_barang: 'Eco Enzym (Liter)',
      jumlah: 10
    },
    {
      id: 2,
      kode_akun: 123,
      nama_barang: 'Botol 100ml',
      jumlah: 100
    }
  ])
  const authToken = localStorage.getItem('accessToken')

  return (
    <>
      <Paper sx={{ p: 5 }}>
        <Typography sx={{ fontSize: 20 }}>Data Barang Dalam Proses</Typography>

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

export default Pengurus
