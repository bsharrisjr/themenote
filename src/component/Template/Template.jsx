import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import './Template.css'



const Template = ()=>{
    const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch('../data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className="wrapper">
          {data && data.map((template , index)=>(
            <div  key={index} >
               <TemplateCard 
                data={template}
                />
            </div>
               
          ))}
      </div>
    </>

  )
}


export default Template

 
const TemplateCard = ({data:template}) =>{
 
  return (
     <>
      { template && <div className="card">
        {template.url ?<img 
          src={`${template.url}`}
         
           className="card__img"
           />
          : <div className="card__img" style={{background : template.background_color}}></div>
          }
          <div className="card__body">
            <h1 className="card__title">{template.name}</h1>
              <div className='card__btn'>
                <NavLink to={`/new/${template.id}`}>Select Template</NavLink>
              </div>
                    

          </div>
      </div>
      }
     
     </>
   
  )
}
