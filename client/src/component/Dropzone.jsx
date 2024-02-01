import React,{useState,useCallback } from "react";
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

function ImageDropzone({ onImageUpload , endpoint}) {
  const [image ,setImage] = useState({})

  const onDrop = useCallback(acceptedFiles => {
    handleImageUpload(acceptedFiles);
  }, [onImageUpload]);

  const handleImageUpload = (files) => {
    const formData = new FormData();
    formData.append('image', files[0]);
 if (endpoint) {
   axios.post(`http://localhost:5000/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('File uploaded successfully');
      const imageName = files[0].name; 
      setImage(files[0])
      onImageUpload(imageName);
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  
 } else {
   const imageName = files[0].name; 
      setImage(files[0])
      onImageUpload(imageName);
 }
  };

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {image.name ? <p>Image Uploaded Successfully</p>:<p>Drag & drop some files here, or click to select files</p>}
      </div>
    </div>
  );
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '5px',
  textAlign: 'center',
  cursor: 'pointer',
};


export default ImageDropzone;