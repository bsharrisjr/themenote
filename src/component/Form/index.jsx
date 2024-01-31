// Form
import React, {useState,useCallback,useRef,useEffect} from "react";
import {NavLink} from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import ImageGallery from '../ImageGallery'
import { Button } from "react-bootstrap";
import ImageDropzone from '../Dropzone'
import { toast } from "react-hot-toast";
import Model from "../Model"
import './form.css'

const template ={
    subject: '',
    background_color: '',
    image_width: '',
    image_height: '',
    image_align: '',
    url: '',
    chat_image: '',
    font_size: ''
  }

function Form() {
   const [formData, setFormData] = useState(template);

  const handleImageUpload = (name) => {
      setFormData(prevData => ({
      ...prevData,
      'url': name
    }));
  };
  const handleImageDrop = (fileNames) => {
    setFormData(prevData => ({
      ...prevData,
      'chat_image': fileNames
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
       try {
            const response = await fetch('http://localhost:5000/addData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
               setFormData(template)
                toast.success("Template Created Successfully", { id: "template" });
            } else {
              toast.error("Template Creation Failed", { id: "template" });
                console.error('Failed to add data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  return (
    <div className="display-container">
      <div className="form-container">
        <div  className=''>
          <form 
          onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label 
                htmlFor="background-image"
                className="form-group-label"
              >
                 Background Image
              </label>
             <ImageDropzone onImageUpload={handleImageUpload}
                endpoint='upload'
             />
            </div>
            <div className="form-group">
              <label 
                htmlFor="background-image"
                className="form-group-label"
              >
                 Gallery Image
              </label>
              <ImageDropzone onImageUpload={handleImageDrop}
             />
           
            </div>
            <div className="form-group">
              <label 
                htmlFor="subject"
                className="form-group-label"
              >
                subject
              </label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                placeholder="Add Subject" 
                className="form-group-input"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label 
                htmlFor="background_color"
                className="form-group-label"
              > 
                Background Color
              </label>
              <input 
                type="text" 
                id="background_color" 
                name="background_color"
                placeholder="Add color" 
                className="form-group-input"
                value={formData.background_color}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label 
                htmlFor="image_width"
                className="form-group-label"
              >  
                Gallery Image Width
              </label>
              <input 
                type="number" 
                id="image_width" 
                name="image_width"
                placeholder="Add Width" 
                 className="form-group-input"
                 value={formData.image_width}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label 
                htmlFor="image_height"
                className="form-group-label"
              >  
                Gallery Image Height
              </label>
              <input 
                type="number" 
                id="image_height" 
                name="image_height"
                placeholder="Add Height" 
                className="form-group-input"
                value={formData.image_height}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label 
                htmlFor="image_align"
                className="form-group-label"
              >
               Gallery Image Position (Top Center or End)
              </label>
              <input 
                type="text" 
                id="image_align" 
                name="image_align"
                placeholder="Add Image Position top center end"
                className="form-group-input"
                value={formData.image_align}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label 
                htmlFor="font_size"
                className="form-group-label"
              >
               Chat Font Size
              </label>
              <input 
                type="number" 
                id="font_size" 
                name="font_size"
                placeholder="Add font size in px"
                className="form-group-input"
                value={formData.font_size}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Button variant="primary" type="submit" className="">Save</Button>
            </div>
      </form>
        </div>
      </div>
      <div className="gallery-container">
       <div className="gallery-header">
         <Model 
              data={formData}
              title='Live Preview'
        />
        <NavLink to="/" exact className="nav-link">
           <Button variant="primary">Go Back to Home</Button>
        </NavLink>
       </div>
        <ImageGallery onDragImage={handleImageDrop}/>
      </div>
    </div>
  );
}

export default Form;




function Imagezone({ onImageDrop }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Extract file names from acceptedFiles array
    const fileNames = acceptedFiles.map(file => file.name);
    // Pass file names to parent component
    onImageDrop(fileNames);
  }, [onImageDrop]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>Drag & drop images from the webpage here</p>
    </div>
  );
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};
