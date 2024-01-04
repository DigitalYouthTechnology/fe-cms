import Swal from 'sweetalert2'

const useConfirm = props => {
  const Confirm = Swal.fire({
    ...props
  }).then(res => {
    if (res.isConfirmed) {
      props.action()
    }
  })

  return { Confirm }
}

export default useConfirm
