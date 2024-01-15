import { Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiContext from '../../../configs/api'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

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
    field: 'nama_simpanan',
    minWidth: 220,
    headerName: 'Nama Simpanan',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.nama_simpanan}
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
    renderCell: () => <Button variant='contained'><Icon icon='eva:edit-outline' /></Button>
  }
]

const TipeSimpanan = () => {
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(apiContext.baseUrl + '/tipe-simpanan/all', {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
        .then(res => {
          setData(res.data.tipe_simpanan)
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
        <Typography sx={{ fontSize: 20 }}>Pengaturan Simpanan</Typography>
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
          checkboxSelection
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
