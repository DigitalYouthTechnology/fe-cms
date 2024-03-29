import { Button, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const columns = [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 220,
    headerName: 'Name',
    renderCell: ({ row }) => {
      const { name, date } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {name}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'phone_number',
    minWidth: 220,
    headerName: 'No Telp',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.phone_number}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'role_name',
    minWidth: 220,
    headerName: 'Role Akses',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.role.name}
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
    renderCell: () => (
      <Button variant='contained'>
        <Icon icon='eva:edit-outline' />
      </Button>
    )
  }
]

import apiContext from '../../configs/api'
import { Icon } from '@iconify/react'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'

const Pengurus = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')

  const getAllUser = async () => {
    await axios
      .get(apiContext.baseUrl + '/user/user-pengurus', {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
      .then(res => {
        setData(res.data.users)
      })
      .catch(() => {})
  }

  useEffect(() => {
    getAllUser()
  }, [])

  return (
    <>
      <Box sx={{ my: 5, display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 20 }}>Daftar pengurus koperasi</Typography>
        <Button variant='contained' onClick={() => router.push('/pengurus/tambah')}>
          Tambah pengurus koperasi
        </Button>
      </Box>{' '}
      <Paper sx={{ p: 5 }}>
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
