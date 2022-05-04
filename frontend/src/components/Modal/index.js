import './Modal.css';

/* TO USE THIS MODAL:
 
// closeModalFunc and showModalBoolean MUST BE PROVIDED BY PARENT COMPONENT OF MODAL

// FORM CLOSEMODALFUNC GOES INSIDE FORM CANCEL BUTTON ONCLICK FUNCTION
// .e.g <button onClick={closeModalFunc}>Cancel</button>

  const stopTheProp = e => e.stopPropagation();

  {showModalBoolean && <Modal closeModalFunc={function}>
    <Form closeModalFunc={function} onClick={stopTheProp} onMouseDown={stopTheProp}>
  </Modal>}

  for example implementation, see NavBar.js

*/

export default function Modal({ children, closeModalFunc }) {
    
  return (
    <div className="modal-background" onMouseDown={closeModalFunc}>
      { children } 
    </div>
  );
}



