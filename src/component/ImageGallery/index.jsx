// Image Gallery
import React,{useState, useEffect} from "react";
import './style.css'

function d(){

}
const ImageGallery =({data,callBack})=> {
  const [images, setImages] = useState()
 useEffect(() => {
  {data && setImages(data) }  
  }, [data]);

  return (
   
     <div className="image-wrapper" >
     
         {images && images.map((image, index) => (
          <div key={index}
            onClick={()=> callBack(image)}
          >
             <div className="image-card">
              <img src={`${image.path}/${image.url}`} className="image-card-img"  />
             </div>
          </div>
        ))}
      </div>
  )
}


export default ImageGallery;