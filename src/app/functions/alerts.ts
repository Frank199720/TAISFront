import Swal from 'sweetalert2'
function showConfirm(title,text){
    console.log('gola');
    Swal.fire({
        title:title,
        text:text,
        icon:'success',
   
    })
}
function showError(title,text){
    console.log('gola');
    Swal.fire({
        title:title,
        text:text,
        icon:'error'
    })
}
export {showConfirm,showError};

