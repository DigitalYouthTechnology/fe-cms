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
import Swal from 'sweetalert2'
import useToast from '../../components/Toast'
import { useRouter } from 'next/router'

const JurnalPembelian = () => {
  const authToken = localStorage.getItem('accessToken')
  const router = useRouter()
  const product = []
  const [supplier, setSupplier] = useState(null)
  const [suppliers, setSuppliers] = useState([])

  const [products, setProducts] = useState([
    {
      nama_produk: null,
      jumlah: null,
      harga_satuan: null,
      tipe_barang: null,
      satuan: null,
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
    setProducts([...products, { nama_produk: null, jumlah: null }])
  }

  const fetchSupplier = async () => {
    try {
      const response = await axios.get(apiContext.baseUrl + '/supplier', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const res = response.data.data
      setSuppliers(res)
    } catch (error) {
      alert(error.message || 'Error fetching suppliers')
    }
  }

  useEffect(() => {
    fetchSupplier()
  }, [])

  const handleSave = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: apiContext.baseUrl + '/pembelian',
        headers: {
          Authorization: 'Bearer ' + authToken
        },
        data: {
          id_supplier: supplier,
          data: products
        }
      }).then(response => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { Toast } = useToast({ zIndex: 1000, position: 'center' })
        Toast.fire({
          icon: 'success',
          title: 'Berhasil membuat pembelian baru'
        }).then(() => {
          router.push('/jurnal-pembelian')
        })
      })
    } catch (e) {
      alert(e)
    }
  }

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
            value={p.nama_produk || ''}
            onChange={(event, newValue) => {
              const newProducts = [...products]
              newProducts[index] = { ...newProducts[index], nama_produk: newValue?.label ?? null }
              setProducts(newProducts)
            }}
            renderInput={params => (
              <TextField
                {...params}
                value={p.nama_produk || ''}
                label='Nama Produk'
                onChange={e => {
                  const newProducts = [...products]
                  newProducts[index] = { ...newProducts[index], nama_produk: e.target.value }
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
              onChange={e => {
                const newProducts = [...products]

                newProducts[index] = {
                  ...newProducts[index],
                  tipe_barang: e.target.value
                }
                setProducts(newProducts)
              }}
            >
              <MenuItem value={0}>Pilih...</MenuItem>
              <MenuItem value={'Barang Baku'}>Barang Baku</MenuItem>
              <MenuItem value={'Barang Bantu'}>Barang Bantu</MenuItem>
              <MenuItem value={'Barang jual'}>Barang Jual</MenuItem>
              <MenuItem value={'Lainnya'}>Lainnya</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '10%' }}>
            <InputLabel id='demo-simple-select-label'>Satuan </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              defaultValue={0}
              label='Satuan'
              onChange={e => {
                const newProducts = [...products]

                newProducts[index] = {
                  ...newProducts[index],
                  satuan: e.target.value
                }
                setProducts(newProducts)
              }}
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
            value={p.jumlah || ''}
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
                jumlah: newQty,
                total_harga: newTotalHarga
              }
              setProducts(newProducts)
            }}
          />

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
              const newQty = newProducts[index].jumlah || 0
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
              const newQty = newProducts[index].jumlah || 1 // Avoid division by zero
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
        <FormControl sx={{ width: '30%' }}>
          <InputLabel id='demo-simple-select-label'>Supplier</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            defaultValue={0}
            label='Suplier'
            onChange={e => setSupplier(e.target.value)}
          >
            <MenuItem value={0}>Pilih...</MenuItem>
            {suppliers.map((s, i) => {
              return (
                <MenuItem key={i} value={s.id}>
                  {s.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
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
      <Box sx={{ display: 'flex', justifyContent: 'end', width: 1 }}>
        <Button variant={'contained'} onClick={handleSave}>
          Proses Pembelian
        </Button>
      </Box>
    </Paper>
  )
}

export default JurnalPembelian
