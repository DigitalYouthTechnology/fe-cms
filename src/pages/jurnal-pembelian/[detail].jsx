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
    field: 'nama_produk',
    minWidth: 220,
    headerName: 'Nama Produk',
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
    field: 'tipe_barang',
    minWidth: 220,
    headerName: 'Tipe Produk',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.tipe_barang}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'harga',
    minWidth: 220,
    headerName: 'Harga',
    renderCell: ({ row }) => {
      const convertRupiah = require('rupiah-format')

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {convertRupiah.convert(row.harga)}
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
  }
]

import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

const Index = () => {
  const [data, setData] = useState(null)
  const authToken = localStorage.getItem('accessToken')
  const router = useRouter()
  const id_pembelian = router.query.detail
  const convertRupiah = require('rupiah-format')

  const fetchPembelian = async () => {
    await axios
      .get(apiContext.baseUrl + '/pembelian/' + id_pembelian, {
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
      {data && (
        <Paper sx={{ p: 5 }}>
          <Typography sx={{ fontSize: 20, mb: 3 }}>Data Pembelian</Typography>
          <Typography sx={{ fontSize: 16 }}>Supplier : {data.pembelian.supplier}</Typography>
          <Typography sx={{ fontSize: 16 }}>
            Total Transaksi : {convertRupiah.convert(data.pembelian.total_harga)}
          </Typography>

          <DataGrid
            sx={{
              mt: 3,
              border: '1px solid #00000020'
            }}
            autoHeight
            pagination
            rows={data.itemPembelian}
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
      )}
    </>
  )
}

export default Index
