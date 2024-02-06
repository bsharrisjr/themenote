import React from "react";
import { Routes,Route } from 'react-router-dom';

import Form from "./component/Form";
import Template from "./component/Template/Template";
import "./App.css"


function App() {

  return(
     <>
      <Routes>
        <Route path='/' element={<Template />}/>
        <Route path='/new/:id' element={<Form />}/>
      </Routes>
  
     </>
  )
}

export default App;






