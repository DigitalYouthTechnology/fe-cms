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
    renderCell: () => <Button variant='contained'>Edit</Button>
  }
]

import apiContext from '../../configs/api'

const Pengurus = () => {
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
      <Paper sx={{ p: 5 }}>
        <Typography sx={{ fontSize: 20 }}>Daftar pengurus koperasi</Typography>

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
