import Swal from "sweetalert2";

const ToastError = Swal.mixin({
    showConfirmButton:true,
    icon:'error',
    allowOutsideClick:false
})

export {ToastError}