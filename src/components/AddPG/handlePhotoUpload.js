const maxSelectPhoto=(e)=>{
    let files = e.target.files 
        if (files.length > 3) { 
           alert('Only 3 images can be uploaded at a time')
           e.target.value = null 
           //console.log(msg)
          return false;
 
      }
    return true;
 
 }

const checkPhotoSize=(e)=>{
    let files = e.target.files
    let size = 9000000
    let err = ""; 
    for(let x = 0; x<files.length; x++) {
    if (files[x].size > size) {
     err += files[x].type+'is too large, please pick a smaller file\n';
   }
 };
 if (err !== '') {
    e.target.value = null
    console.log(err)
    return false
}

return true;

}

 export  {maxSelectPhoto, checkPhotoSize}