import { Button, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import dateFormat, { masks } from 'dateformat'
import apiContext from '../../../../configs/api'

const columns = [
  {
    flex: 0.1,
    field: 'deskripsi',
    minWidth: 220,
    headerName: 'Deskripsi',
    renderCell: ({ row }) => {
      const { deskripsi } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {deskripsi}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'debit',
    minWidth: 220,
    headerName: 'Debit',
    renderCell: ({ row }) => {
      const { nominal, tipe_transaksi } = row
      const convertRupiah = require('rupiah-format')

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {tipe_transaksi == 'debit' ? convertRupiah.convert(nominal) : 0}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'kredit',
    minWidth: 220,
    headerName: 'Kredit',
    renderCell: ({ row }) => {
      const { nominal, tipe_transaksi } = row
      const convertRupiah = require('rupiah-format')

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {tipe_transaksi == 'kredit' ? convertRupiah.convert(nominal) : 0}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'saldo_setelah',
    minWidth: 220,
    headerName: 'Saldo Akhir',
    renderCell: ({ row }) => {
      const convertRupiah = require('rupiah-format')

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {convertRupiah.convert(row.saldo_setelah)}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'tanggal_transaksi',
    minWidth: 220,
    headerName: 'Tanggal Transaksi',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {dateFormat(row.createdAt, 'dd mmmm, yyyy, h:MM')}
        </Typography>
      )
    }
  }
]

const Riwayat = () => {
  const router = useRouter()
  const { slug } = router.query
  const [data, setData] = useState([])
  const [nama_simpanan, setNamaSimpanan] = useState('')

  useEffect(() => {
    const fetchRiwayat = async () => {
      await axios
        .get(apiContext.baseUrl + '/simpanan/code/' + slug, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        })
        .then(res => {
          setData(res.data.riwayat_simpanan)
          setNamaSimpanan(res.data.riwayat_simpanan[0].simpanan.nama_simpanan)
        })
        .catch(err => {
          console.log(err)
        })
    }
    fetchRiwayat()
  }, [slug])

  return (
    <Paper sx={{ p: 5 }}>
      <Typography sx={{ fontSize: 20 }}>Riwayat {nama_simpanan}</Typography>

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
              pageSize: 10
            }
          }
        }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </Paper>
  )
}

export default Riwayat
