import { useRouter } from 'next/router'
import apiContext from '../../configs/api'
import { Button, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OptionsMenu from 'src/@core/components/option-menu'

const columns = [
  {
    flex: 0.1,
    field: 'no_anggota',
    minWidth: 220,
    headerName: 'No Anggota',
    renderCell: ({ row }) => {
      const { no_anggota } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {no_anggota}
        </Typography>
      )
    }
  },
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
    field: 'email',
    minWidth: 220,
    headerName: 'Email',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.email}
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
    minWidth: 200,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <DetailUser data={row} />
  }
]

const DetailUser = props => {
  const router = useRouter()
  const { id } = props.data

  return (
    <>
      <Button variant='contained'>Edit</Button>
      <Button variant='outlined' onClick={() => router.push('/anggota/' + id)} sx={{ ml: 2 }}>
        Detail
      </Button>
    </>
  )
}

const Pengurus = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')

  const getAllUser = async () => {
    await axios
      .get(apiContext.baseUrl + '/user/all', {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
      .then(res => {
        setData(res.data.users)
      })
  }

  useEffect(() => {
    getAllUser()
  }, [])

  return (
    <>
      <Box sx={{ my: 5, display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 20 }}>Daftar anggota koperasi</Typography>
        <Button variant='contained' onClick={() => router.push('/anggota/tambah')}>
          Tambah anggota koperasi
        </Button>
      </Box>
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
