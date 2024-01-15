import { Alert, Button, FormControl, Input, InputLabel, Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import apiContext from '../../../configs/api'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 5
}

const Add = props => {
  const { open, setOpen } = props

  const [error, setError] = useState(null)
  const [name, setName] = useState(props.name)
  const authToken = localStorage.getItem('accessToken')

  const router = useRouter()

  const handleClose = () => {
    setName('')
    setOpen(false)
  }

  const handleSave = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: apiContext.baseUrl + '/supplier/' + props.id,
        headers: {
          Authorization: 'Bearer ' + authToken
        },
        data: {
          name
        }
      }).then(response => {
        router.reload()
      })
    } catch (e) {
      alert(e)
    }
  }

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        <Icon icon='eva:edit-outline' />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography sx={{ fontSize: 20, mb: 4 }}>Ubah Supplier</Typography>

          {error ? (
            <Alert severity='warning' sx={{ mb: 4 }}>
              {error.message}
            </Alert>
          ) : null}

          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
              id='nama_supplier'
              label='Nama Supplier'
              variant='outlined'
              value={name}
              onChange={val => setName(val.target.value)}
            />
          </FormControl>

          <Button variant='outlined' sx={{ mr: 2 }} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default Add
