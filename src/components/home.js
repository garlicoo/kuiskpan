// Home.js
import React, { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Home = ({ setName, setNip }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (name, nip) => {
    if (!name || !nip) {
        alert("Mohon isi Nama dan NIP!");
        return;
    }
    setName(name);
    setNip(nip);
    navigate("/quiz");
};


  return (
    <div className="home">
      <h1 className="welcome">Selamat Datang di KPAN!</h1>
      <h1 className="welcome-description">
        Kesadaran Pengamanan Aparatur Negara <br></br>Deputi 8
      </h1>
      <button className="start-button" onClick={() => setShowModal(true)}>
        Masuk
      </button>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
