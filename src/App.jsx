import React from "react";
import { Routes,Route } from 'react-router-dom';

import Form from "./component/Form";
import Template from "./component/Template/Template";
import ChatBox from "./component/chatbbox/ChatBox";


function App() {

  return(
     <>
      <Routes>
        <Route path='/' element={<Template />}/>
        <Route path='/chat' element={<ChatBox />}/>
        <Route path='/new' element={<Form />}/>
      </Routes>
  
     </>
  )
}

export default App;






