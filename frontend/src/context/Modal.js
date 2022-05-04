import React, { useRef, useState, useEffect, useContext } from "react";
import ReactDOM from 'react-dom';

import { useDispatch } from "react-redux";

import './Modal.css';

const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
    const dispath = useDispatch();

    const modalRef = useRef();

    const [value, setValue] = useState();

    const onCloseFunc = e => {

    };

    useEffect(() => {
        setValue(modalRef.current);

        document.addEventListener('click', onCloseFunc);

        return document.removeEventListener('click', onCloseFunc);

    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
};

export const Modal = ({ onClose, children }) => {
    const modalNode = useContext(ModalContext);

    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal__background' onClick={onClose} />
            <div id='modal__content'>
                {children}
            </div>
        </div>,
        modalNode
    );
};
