// Form
import React, {useState,useEffect} from "react";
import {NavLink} from 'react-router-dom';
import ImageGallery from '../ImageGallery'
import { useParams } from 'react-router-dom';

import './form.css'

function Form() {
   const [formData, setFormData] = useState({});
   const [images, setImages] = useState([])
   const [background, setBackground] = useState([])
    const [data, setData] = useState({});
   const [selectedBackground,setSelectedBackground] = useState()
   const [selectedImage,setSelectedImage] = useState()
      const { id } = useParams();

    useEffect(() => {
      fetchData();
      fetchTemplate(id)
    }, []);


  const fetchData = async () => {

    try {
     const url =`../background.json`
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setBackground(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
     try {
     const url =`../images.json`
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setImages(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
   const fetchTemplate = async (id) => {
      try {
        const response = await fetch('../data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const filteredData = jsonData.filter(item => item.id === id);
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    name === 'color' && setSelectedBackground("")
  };

  const applyBackground = ()=>{
    const style =  selectedBackground ? 
       {backgroundImage: `url(${selectedBackground.path}/${selectedBackground.url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }:{ background : formData?.color}
      return style
  }
  const applyImageStyles = ()=>{
    
    const style =  data[0]?.image_align &&
       {display: 'flex',
        justifyContent : `${data[0]?.image_align }`
      }

      return style
  }

   const applyFormStyles = ()=>{
    
    const style =  data[0]?.subject_align &&
       {display: 'flex',
        justifyContent : `${data[0]?.subject_align }`
      }

      return style
  }
  
  const applySubjectStyles = ()=>{
    let style = {
      'backgroundColor':'transparent'
    }
     if (formData?.subjectColor) {
      style.color =  formData.subjectColor
      style.background ="transparent"
     }
     if(formData?.subjectFont){
      style.fontSize = `${formData.subjectFont}px`
      style.height =formData.subjectFont + 20 }
     
      return style
  }

  const applyMessageStyles = ()=>{
    let style = {
      'backgroundColor':'transparent'
    }
     if (formData?.messageColor) {
      style.color =  formData.messageColor
     }
     if(formData?.messageFont){
      style.fontSize = `${formData.messageFont}px`
      style.height =formData.messageFont + 60
     }
     
      return style
  }
  
   const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    const{name} = e.target
    if (value === 0 || value < 1 || isNaN(value)) {
      value = 1;
    }
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="display-container">
      <div className="form-container" style={applyBackground()}>
      <NavLink to="/"><button className="nav-btn">Back</button></NavLink>;
         <div style={applyImageStyles()}>
          <div  className='template__image' >
            {selectedImage ?<img src={`${selectedImage.path}/${selectedImage.url}`}  width={300} height={300} />:"Select an image"}
        </div>
         </div>
        <div className="template__form" >
         <div className="form-fieldset" style={applyFormStyles()}>
           <input 
            type="text" 
            placeholder="Add Subject"
            className="form-group-text"
            name="subject"
            style={applySubjectStyles()}
          />
         
          <input 
            type="color" 
             id="color" 
             name="subjectColor" 
             value={formData.subjectColor || "#050505"}
            onChange={handleChange}
            className="form-group-pallete"
          />
          <input 
           type="number"
        id="quantity"
        name="subjectFont"
        min="1"
        value={formData?.subjectFont || "20"}
        onChange={handleQuantityChange}
        width={5} height={5}
        className="form-group-number"
          />
         </div>
          <div className="form-fieldset" style={applyFormStyles()}>
             <textarea
            name="message"
            type="text"  
            placeholder="Add Message"
            className="form-group-textarea"
            onChange={handleChange}
            style={applyMessageStyles()}
          />
            <input 
            type="color" 
             id="color" 
             name="messageColor" 
             value={formData.messageColor || "#050505"}
            onChange={handleChange}
            className="form-group-pallete"
          />
          <input 
           type="number"
        id="quantity"
        name="messageFont"
        min="1"
        value={formData?.messageFont || "20"}
        onChange={handleQuantityChange}
        width={5} height={5}
        className="form-group-number"
          />
          </div>
         
         <div className="color-pallate">
          
           <label 
            htmlFor="color" 
            className="color-pallate-label"
           >
            Background Color</label>
          <input 
            type="color" 
             id="color" name="color" 
             value={formData.color || "#e66465"}
            onChange={handleChange}

          />
         </div>
        </div>
      </div>
      <div className="gallery-container">
        
        <p>Image Gallary</p>
        <ImageGallery 
          data={images}
          callBack = {(params)=> setSelectedImage(params)}
          />

        <p> Background Gallary</p> 
        <ImageGallery 
          data={background}
          callBack = {(params)=> setSelectedBackground(params)}
        />
        
      </div>
      
    </div>
  );
}

export default Form;

