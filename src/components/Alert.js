import Swal from 'sweetalert2'

const useAlert = props => {
  const Alert = Swal.fire({
    ...props
  })

  return { Alert }
}

export default useAlert
