import Swal from 'sweetalert2'

const useToast = props => {
  const Toast = Swal.mixin({
    toast: true,
    position: props.position,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
      toast.style.zIndex = props.zIndex || 9999 // You can customize the zIndex value
    }
  })

  return { Toast }
}

export default useToast
