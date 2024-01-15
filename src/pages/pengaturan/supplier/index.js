import apiContext from '../../../configs/api'
import { Box } from '@mui/system'
import { Button, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import AddModal from './add'
import EditModal from './edit'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

const columns = [
  {
    flex: 0.1,
    field: 'no',
    minWidth: 220,
    headerName: 'NO',
    renderCell: (row, index) => {
      const { id } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {index}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'name',
    minWidth: 220,
    headerName: 'Nama Supplier',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'actions',
    minWidth: 220,
    headerName: 'Actions',
    renderCell: ({ row }) => {
      return (
        <>
          <Edit name={row.name} id={row.id} />
          <Delete id={row.id} />
        </>
      )
    }
  }
]

const Edit = props => {
  const [open, setOpen] = useState(false)

  return <EditModal name={props.name} open={open} setOpen={setOpen} id={props.id} />
}

const Delete = props => {
  const authToken = localStorage.getItem('accessToken')
  const router = useRouter()

  const handleDelete = async id => {
    try {
      await axios({
        method: 'delete',
        url: apiContext.baseUrl + '/supplier/' + id,
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      }).then(response => {
        router.reload()
      })
    } catch (e) {
      alert(e)
    }
  }

  return (
    <Button variant='outlined' sx={{ ml: 2 }} onClick={() => handleDelete(props.id)}>
      <Icon icon='eva:trash-2-outline' />
    </Button>
  )
}

const Supplier = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')

  const fetchSupplier = async () => {
    try {
      const response = await axios
        .get(apiContext.baseUrl + '/supplier', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then(response => {
          setData(response.data.data)
        })
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    fetchSupplier()
  }, [open])

  return (
    <>
      <Paper sx={{ p: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 20 }}>Data Supplier</Typography>
          <AddModal setOpen={setOpen} open={open} />
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

export default Supplier
