// Model 

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChatBox from '../chatbbox/ChatBox';

function Model({data , title}) {

  const [show, setShow] = useState(false);
  const[template , setTemplate] = useState(data)

  useEffect(()=>{
  setTemplate(data)
},[data])

  return (
    <>
      {template && <>
        <Button variant={title === 'Live Preview' ?"primary" : ''} onClick={() => setShow(true)}>
       {title}
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-dialog modal-fullscreen"
        aria-labelledby="preview-template-model"
      >
        <Modal.Header closeButton >
        
        </Modal.Header>
        <Modal.Body  className='overflow-auto' >
          <ChatBox 
            template={template}
            />
        </Modal.Body>
      </Modal>
      </>}
    </>
  );
}

export default Model;
