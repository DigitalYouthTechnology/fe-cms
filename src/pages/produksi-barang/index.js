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
    renderCell: params => {
      const { id } = params.row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1}
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
    <Button variant='contained' onClick={() => router.push('/produksi-barang/' + props.id)}>
      <Icon icon='mdi:eye' />
    </Button>
  )
}

import apiContext from '../../configs/api'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'

const Pengurus = () => {
  const router = useRouter()

  const [data, setData] = useState([
    {
      id: 1,
      kode_akun: 123,
      nama_barang: 'Eco Ezyme 100ml',
      jumlah: 100
    }
  ])
  const authToken = localStorage.getItem('accessToken')

  return (
    <>
      <Paper sx={{ p: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 20 }}>Data Produksi</Typography>
          <Button variant={'contained'} onClick={() => router.push('/produksi-barang/produksi-baru')}>
            Buat Produksi Baru
          </Button>
        </Box>

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
