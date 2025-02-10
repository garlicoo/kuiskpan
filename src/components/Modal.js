// Modal.js
import React from 'react';

const Modal = ({ showModal, setShowModal, handleNameSubmit }) => {
    const [name, setName] = React.useState('');

    const handleSubmit = () => {
        handleNameSubmit(name);
        setShowModal(false);
    };

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
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Modal;
