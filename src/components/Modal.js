// Modal.js
import React from 'react';

const Modal = ({ showModal, setShowModal, handleSubmit}) => {
    const [name, setName] = React.useState('');
    const [nip, setNip] = React.useState('');

    const handleClickSubmit = () => {
        handleSubmit(name, nip);
        setShowModal(false);
    };

    const handleClose = () => {
        setShowModal(false)
    }

    if (!showModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Enter Your Name</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <input
                    type="text"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    placeholder="Enter your Nip"
                />
               <div className="btn-group">
                <button className="btn-submit" onClick={handleClickSubmit}>Submit</button>
                <button className="btn-close" onClick={handleClose}>Close</button>
               </div>
            </div>
        </div>
    );
};

export default Modal;
