import { Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiContext from '../../configs/api'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'

const columns = [
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
    field: 'kode_bantu',
    minWidth: 220,
    headerName: 'Kode Bantu',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.kode_bantu ? row.kode_bantu : '-'}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'nama_akun',
    minWidth: 220,
    headerName: 'Nama Akun',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.nama_akun}
        </Typography>
      )
    }
  }
]

const TipeSimpanan = () => {
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(apiContext.baseUrl + '/kode-akun/all', {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
        .then(res => {
          setData(res.data.kode_akun)
        })
        .catch(err => {
          console.log(err)
        })
    }

    fetchData()
  }, [columns])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3, alignItems: 'center' }}>
        <Typography sx={{ fontSize: 20 }}>Kode Akun</Typography>
        <Button variant='outlined' onClick={() => router.push('/pengaturan/simpanan/tambah-simpanan')}>
          Tambah Tipe Simpanan
        </Button>
      </Box>
      <Paper>
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
          pageSizeOptions={[10, 20, 30, 40, 50]}
        />
      </Paper>
    </>
  )
}

export default TipeSimpanan
