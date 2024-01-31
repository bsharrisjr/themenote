// Image Gallery
import React,{useState, useEffect} from "react";
import ImageDropzone from '../Dropzone'
import './style.css'

const ImageGallery =({handleImageDrop})=> {
  const [gallery, setGallery] = useState(
    [])
 useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('../../../server/gallery.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setGallery(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
   const handleImageUpload = (name) => {
    return
  };

  return (
   <>
    <div className="gallery-dropzone">
        <ImageDropzone
          onImageUpload={handleImageUpload}
                  endpoint='gallery'
        />
    </div>
     <div className="image-wrapper" >
     
         {gallery && gallery.map((image, index) => (
          <div key={index} draggable 
          >
             <div className="image-card">
              <img src={`../../../server/gallery-image/${image.url}`} className="image-card-img" />
             </div>
          </div>
        ))}
      </div>

       
   </>
  )
}


export default ImageGallery;