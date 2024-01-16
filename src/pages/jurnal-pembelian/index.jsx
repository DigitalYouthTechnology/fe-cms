import { Icon } from '@iconify/react'
import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import apiContext from '../../configs/api'
import axios from 'axios'

const JurnalPembelian = () => {
  const authToken = localStorage.getItem('accessToken')

  const product = [
    { label: 'The Shawshank Redemption', qty: 1994 },
    { label: 'The Godfather', qty: 1972 },
    { label: 'The Godfather: Part II', qty: 1974 },
    { label: 'The Dark Knight', qty: 2008 }
  ]
  const [supplier, setSupplier] = useState(null)
  const [suppliers, setSuppliers] = useState([])

  const [products, setProducts] = useState([
    {
      name: null,
      qty: null,
      harga_satuan: null,
      total_harga: null
    }
  ])

  const hapusProduk = indexToRemove => {
    const newProducts = products.filter((_, index) => index !== indexToRemove)
    setProducts(newProducts)
  }

  const calculateTotalHarga = () => {
    const totalHarga = products.reduce((total, product) => {
      return total + (Number(product.total_harga) || 0)
    }, 0)

    return new Intl.NumberFormat('id-ID').format(totalHarga)
  }

  const calculateTotalProduct = () => {
    return products.length
  }

  const tambah = () => {
    setProducts([...products, { name: null, qty: null }])
  }

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(apiContext.baseUrl + '/supplier', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const res = response.data.data
      setSuppliers(prevSuppliers => [...prevSuppliers, ...res.map((m, index) => ({ label: m.name, id: index }))])
    } catch (error) {
      alert(error.message || 'Error fetching suppliers')
    }
  }

  useEffect(() => {
    fetchSupplier()
  }, [])

  return (
    <Paper sx={{ p: 5 }}>
      <Box sx={{ display: 'flex', width: 1, justifyContent: 'space-between', mb: 3 }}>
        <Typography sx={{ fontSize: 20 }}>Jurnal Pembelian - Tambah Stok</Typography>
        <Button variant='contained' onClick={tambah}>
          <Icon icon='mdi:plus' />
        </Button>
      </Box>

      {products.map((p, index) => (
        <Box key={index} sx={{ display: 'flex', width: 1, justifyContent: 'space-between', mt: 2 }}>
          <Autocomplete
            disablePortal
            options={product}
            value={p.name || ''}
            onChange={(event, newValue) => {
              const newProducts = [...products]
              newProducts[index] = { ...newProducts[index], name: newValue?.label ?? null }
              setProducts(newProducts)
            }}
            renderInput={params => (
              <TextField
                {...params}
                value={p.name || ''}
                label='Nama Produk'
                onChange={e => {
                  const newProducts = [...products]
                  newProducts[index] = { ...newProducts[index], name: e.target.value }
                  setProducts(newProducts)
                }}
              />
            )}
            sx={{ width: '25%' }}
          />
          <FormControl sx={{ width: '10%' }}>
            <InputLabel id='demo-simple-select-label'>Tipe Barang </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              defaultValue={0}
              label='Tipe Barang'
              onChange={e => alert(e.target.value)}
            >
              <MenuItem value={0}>Pilih...</MenuItem>
              <MenuItem value={'Barang Baku'}>Barang Baku</MenuItem>
              <MenuItem value={'Barang Bantu'}>Barang Bantu</MenuItem>
              <MenuItem value={'Barang jual'}>Barang Jual</MenuItem>
              <MenuItem value={'Lainnya'}>Lainnya</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={p.qty || ''}
            sx={{ width: '8%' }}
            id='outlined-basic'
            label='Jumlah'
            variant='outlined'
            type='number'
            onChange={e => {
              const newProducts = [...products]
              const newQty = e.target.value
              const newHargaSatuan = newProducts[index].harga_satuan || 0
              const newTotalHarga = newQty * newHargaSatuan

              newProducts[index] = {
                ...newProducts[index],
                qty: newQty,
                total_harga: newTotalHarga
              }
              setProducts(newProducts)
            }}
          />
          <FormControl sx={{ width: '10%' }}>
            <InputLabel id='demo-simple-select-label'>Satuan </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              defaultValue={0}
              label='Satuan'
              onChange={e => alert(e.target.value)}
            >
              <MenuItem value={0}>Pilih...</MenuItem>
              <MenuItem value={'ML'}>ML</MenuItem>
              <MenuItem value={'L'}>L</MenuItem>
              <MenuItem value={'PCS'}>PCS</MenuItem>
              <MenuItem value={'CC'}>CC</MenuItem>
              <MenuItem value={'KG'}>KG</MenuItem>
            </Select>
          </FormControl>

          <TextField
            value={p.harga_satuan || ''}
            sx={{ width: '18%' }}
            id='outlined-basic'
            label='Harga Satuan'
            variant='outlined'
            type='number'
            onChange={e => {
              const newProducts = [...products]
              const newHargaSatuan = e.target.value
              const newQty = newProducts[index].qty || 0
              const newTotalHarga = newQty * newHargaSatuan

              newProducts[index] = {
                ...newProducts[index],
                harga_satuan: newHargaSatuan,
                total_harga: newTotalHarga
              }
              setProducts(newProducts)
            }}
          />

          <TextField
            value={p.total_harga || ''}
            sx={{ width: '18%' }}
            id='outlined-basic'
            label='Total Harga'
            variant='outlined'
            type='number'
            onChange={e => {
              const newProducts = [...products]
              const newTotalHarga = e.target.value
              const newQty = newProducts[index].qty || 1 // Avoid division by zero
              const newHargaSatuan = newTotalHarga / newQty

              newProducts[index] = {
                ...newProducts[index],
                total_harga: newTotalHarga,
                harga_satuan: newHargaSatuan
              }
              setProducts(newProducts)
            }}
          />
          <Button color='error' onClick={() => hapusProduk(index)}>
            <Icon icon='mdi:delete' width={30} />
          </Button>
        </Box>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box>
        <Autocomplete
          disablePortal
          options={suppliers}
          value={supplier || null}
          defaultValue={supplier || null}
          onChange={(event, newValue) => {
            if (newValue) {
              setSupplier(newValue.label)
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              value={supplier || null}
              label='Supplier'
              onChange={e => {
                setSupplier(e.target.value)
              }}
            />
          )}
          sx={{ width: '30%' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography sx={{ fontSize: 20 }}>Ringkasan Pembelian</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'flex-end', my: 2, width: '300px' }}>
          <Typography sx={{ width: '50%' }}>Total Harga</Typography>
          <Typography sx={{ width: '5%' }}>:</Typography>
          <Typography sx={{ width: '45%' }}>Rp {calculateTotalHarga()}</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'flex-end', my: 2, width: '300px' }}>
          <Typography sx={{ width: '50%' }}>Total Produk</Typography>
          <Typography sx={{ width: '5%' }}>:</Typography>
          <Typography sx={{ width: '45%' }}>{calculateTotalProduct()}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default JurnalPembelian
