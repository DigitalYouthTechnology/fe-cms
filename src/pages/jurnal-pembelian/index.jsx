import { Button, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import apiContext from '../../configs/api'
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
    field: 'supplier',
    minWidth: 220,
    headerName: 'Supplier',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.supplier}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'total_harga',
    minWidth: 220,
    headerName: 'Total Harga',
    renderCell: ({ row }) => {
      const convertRupiah = require('rupiah-format')

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {convertRupiah.convert(row.total_harga)}
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
    <Button variant='contained' onClick={() => router.push('/jurnal-pembelian/' + props.id)}>
      <Icon icon='mdi:eye' />
    </Button>
  )
}

import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'

const Index = () => {
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')
  const router = useRouter()

  const fetchPembelian = async () => {
    await axios
      .get(apiContext.baseUrl + '/pembelian', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(res => {
        setData(res.data.data)
      })
  }

  useEffect(() => {
    fetchPembelian()
  }, [])

  return (
    <>
      <Paper sx={{ p: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 20 }}>Data Pembelian</Typography>
          <Button variant='contained' onClick={() => router.push('/jurnal-pembelian/add')}>
            Pembelian Baru
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

export default Index
