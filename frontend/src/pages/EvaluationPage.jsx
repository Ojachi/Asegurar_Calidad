import React, { useEffect, useState } from "react";
import { getModels, getUserSoftware } from "../services/userService";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#333",
    color: "#fff",
    borderRadius: "8px",
    maxWidth: "300px",
  },
};

Modal.setAppElement("#root");

const EvaluationPage = () => {
  const [modelList, setModelList] = useState([]);
  const [serverResponse, setServerResponse] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [softwareList, setSoftwareList] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const id_user = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getModels();
        setModelList(data);
      } catch (error) {
        setServerResponse("Error al cargar los modelos registrados.");
      }
    };

    const fetchSoftware = async () => {
      try {
        const data = await getUserSoftware(id_user);
        setSoftwareList(data);
      } catch (error) {
        setServerResponse("Error al cargar el software registrado.");
      }
    };

    fetchModels();
    fetchSoftware();
  }, [id_user]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const evaluarIda = () => {
    if (!selectedSoftware) {
      alert("Debe seleccionar un software antes de continuar.");
      return;
    }
    if (!localStorage.getItem('matriz')){
      setTimeout(() => navigate("/user/evaluate"), 1000);
      closeModal();
    }
    else {
      setTimeout(() => navigate("/user/risk-matrix"), 1000);
      closeModal();
    }
  };

  return (
    <div className="evaluationPage"> 
      <h1>Modelos</h1>
      {serverResponse && <p style={{ color: "red" }}>{serverResponse}</p>}
      <div className="software-list-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {modelList.map((model) => (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>
                  <button
                    onClick={() => {
                      localStorage.setItem("model", model.id);
                      openModal();
                    }}
                    className="btn btn-success"
                  >
                    Evaluar
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Matriz de riesgos</td>
              <td>
                <button
                onClick={() => {
                  localStorage.setItem("matriz", true);
                  openModal();
                }}
                className="btn btn-success"
                >
                  Evaluar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Seleccionar Software a Evaluar"
      >
        <>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
            Seleccionar Software a evaluar
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              evaluarIda();
            }}
          >
            <p></p>
            <select
              name="softwareName"
              id="softwareName"
              onChange={(e) => {
                const selectedId = e.target.value;
                localStorage.setItem("selectedSoftwareId", selectedId);
                setSelectedSoftware(selectedId);
              }}
              required
            >
              <option value="">Seleccione un software</option>
              {softwareList.map((software) => (
                <option key={software.id} value={software.id}>
                  {software.name}
                </option>
              ))}
            </select>
            <p></p>

            <button type="submit" className="btn btn-primary">Evaluar Software</button>
            <button type="button" className="btn btn-warning" onClick={closeModal}>
              Cancelar
            </button>
          </form>
        </>
      </Modal>
    </div>
  );
};

export default EvaluationPage;
