import React from "react";
import { Routes,Route } from 'react-router-dom';

import Form from "./component/Form";
import Template from "./component/Template/Template";


function App() {

  return(
     <>
      <Routes>
        <Route path='/' element={<Template />}/>
        <Route path='/new' element={<Form />}/>
      </Routes>
  
     </>
  )
}

export default App;






