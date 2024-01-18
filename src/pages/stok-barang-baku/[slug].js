import { Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import apiContext from '../../configs/api'
import axios from 'axios'

const columns = [
  {
    flex: 0.1,
    field: 'no',
    minWidth: 10,
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
  const authToken = localStorage.getItem('accessToken')
  const [data, setData] = useState(null)

  const fecthMutasi = async () => {
    await axios
      .get(apiContext.baseUrl + '/stock/' + slug, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
      .then(res => {
        setData(res.data.data)
        console.warn(res.data.data)
      })
  }

  useEffect(() => {
    fecthMutasi()
  }, [])

  return (
    <>
      {data && (
        <>
          <Paper sx={{ p: 5 }}>
            <Typography variant='h4' sx={{ mb: 5 }}>
              Detail Stok Barang
            </Typography>
            <Typography variant='h6' sx={{ mb: 5 }}>
              ID BARANG : {slug}
            </Typography>
            <Typography variant='h6' sx={{ mb: 5 }}>
              NAMA BARANG : {data.nama_barang}
            </Typography>
            <Typography variant='h6' sx={{ mb: 5 }}>
              TOTAL STOK : {data.jumlah} {data.satuan}
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
              rows={data.mutasi_barang}
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
      )}
    </>
  )
}

export default Detail
