import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone';

export default function CustomFileUpload() {
    const [open, setOpen] = React.useState(false);

    return (

        <div>
        
        
          <DropzoneArea
  acceptedFiles={['image/*']}
  dropzoneText={"Drag and drop an image here or click"}
  onChange={(files) => console.log('Files:', files)}
  showFileNames
  getFileLimitExceedMessage ={(filesLimit)=> `${filesLimit} هو العدد المسموح رفعه من الصورة`}
  getFileAddedMessage ={(fileAdded)=> `${fileAdded} تمت اضافته`}
  initialFiles={['https://malcoded.com/static/91451b75744b71b262058f62619190c9/6ff5e/react-file-upload-result.png']}
/>
        </div>
    )
}
