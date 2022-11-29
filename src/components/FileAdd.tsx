import axios from 'axios';
import React from 'react'
export interface FileAddProps {
  addFile:Function
}
export const FileAdd:React.FC<FileAddProps> = ({addFile}):React.ReactElement => {
  const [file, setFile] = React.useState(null)
  const handleFile=(e:any)=>{
    e.preventDefault()
    addFile(e.target.files[0])
  }

  return(
    <form>
      <div>
        <label>
          file
        </label>
        <input type="file" name='file' onChange={(e)=>handleFile(e)} />
      </div>
    </form>
  )


}

