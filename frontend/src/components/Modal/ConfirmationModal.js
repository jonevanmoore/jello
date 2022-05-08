import Modal from './index';
import { useState } from 'react';
import './ConfirmationModal.css';

export default function ConfirmationModal({ message, actionButtonLabel, func, children, active }) {
  const [ showModal, setShowModal ] = useState(false);

  const conditionalActivation = e => {
    if( active || active === undefined ) showModalFunc()
    else func()
  }

  const showModalFunc = e => setShowModal(true);
  const closeModalFunc = e => setShowModal(false);

  const stopTheProp = e => e.stopPropagation();

  const doAction = e => {
    func();
    closeModalFunc();
  };

  const className = `
  jello__wiggle
  logout__button
  red__button
  button__shine__short__red`

  return (
    <>
      <div onClick={conditionalActivation}>
        {children}
      </div>
      { showModal && (
        <Modal closeModalFunc={closeModalFunc}>
          <div className='confirmation-modal'
               onClick={stopTheProp}
               onMouseDown={stopTheProp}>
            <div className='confirmation-message'>{message}</div>
            <div className='confirmation-buttons'>
              <button onClick={doAction} id="logout-button" className={className}>{actionButtonLabel}</button>
            </div>
          </div>
        </Modal>
      )} 
    </>
  )
}
