import { Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'

const columns = [
  {
    flex: 0.1,
    field: 'tanggal',
    minWidth: 220,
    headerName: 'Tanggal',
    renderCell: ({ row }) => {
      const { tanggal } = row

      return (
        <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {tanggal}
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
          {row.bukti_transaksi}
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
          {row.kode}
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

const JurnalUmum = () => {
  //   const [data, setData] = useState([])
  const data = [
    {
      id: '1',
      tanggal: '12 Desember 2022',
      bukti_transaksi: '1',
      deskripsi: 'Simpananan Pokok',
      kode: '2030393',
      debit: '10000',
      kredit: '0'
    },
    {
      id: '2',
      tanggal: '12 Desember 2022',
      bukti_transaksi: '1',
      deskripsi: 'Kas',
      kode: '2030393',
      debit: '0',
      kredit: '10000'
    }
  ]

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
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5, 10]}
      />
    </>
  )
}

export default JurnalUmum
