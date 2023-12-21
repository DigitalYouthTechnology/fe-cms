import { Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'
import apiContext from 'src/configs/api'
import dateFormat, { masks } from 'dateformat'

const columns = [
  {
    flex: 0.1,
    field: 'tanggal',
    minWidth: 220,
    headerName: 'Tanggal',
    renderCell: ({ row }) => {
      const { createdAt } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {dateFormat(createdAt, 'd/m - HH:MM')}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'bukti_transaksi',
    minWidth: 220,
    headerName: 'Bukti Transaksi',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.id_transaksi || '-'}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'deskripsi',
    minWidth: 220,
    headerName: 'Deskripsi / Nama Akun',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.deskripsi}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    field: 'kode',
    minWidth: 220,
    headerName: 'Kode',
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
    field: 'debit',
    minWidth: 220,
    headerName: 'Debit',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.debit}
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
      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {row.kredit}
        </Typography>
      )
    }
  }
]

const JurnalUmum = () => {
  const [data, setData] = useState([])
  const authToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchJurnalUmum = async () => {
      try {
        const res = await axios
          .get(apiContext.baseUrl + '/jurnal-umum', {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          })
          .then(res => {
            console.log(res.data.data)
            setData(res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
      } catch (err) {
        console.log(err)
      }
    }
    fetchJurnalUmum()
  }, [authToken])

  return (
    <>
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
        pageSizeOptions={[10, 25, 50]}
      />
    </>
  )
}

export default JurnalUmum
