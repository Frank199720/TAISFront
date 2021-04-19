import Swal from 'sweetalert2'
function showConfirm(title,text){
    
    Swal.fire({
        title:title,
        text:text,
        icon:'success',
   
    })
}
function showError(title,text){
    
    Swal.fire({
        title:title,
        text:text,
        icon:'error'
    })
}
export {showConfirm,showError};

