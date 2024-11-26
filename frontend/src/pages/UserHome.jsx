import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSoftware } from "../services/userService";
import { registerSoftware } from "../services/userService";
import Modal from "react-modal";

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
const UserHome = () => {
  const navigate = useNavigate();
  const [softwareList, setSoftwareList] = useState([]);
  const id_user = localStorage.getItem("id");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [serverResponse, setServerResponse] = useState('');

  // datos registro de software
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");
  const [developer, setDeveloper] = useState("");
  const [contact, setContact] = useState("");
  const [owner, setOwner] = useState("");
  const [license, setLicense] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const data = await getUserSoftware(id_user);
        setSoftwareList(data);
      } catch (error) {
        setServerResponse("Error al cargar el software registrado.");
      }
    };
    fetchSoftware();
  }, [id_user]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerResponse("");
    setServerResponse("");

    try {
      await registerSoftware({
        name,
        version,
        description,
        developer,
        contact,
        owner,
        license,
        company,
        id_user
      });
      setServerResponse("Software registrado exitosamente");
    } catch (error) {
      setServerResponse("Error al registrar el software. Inténtalo de nuevo.");
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="user-container">
      <h2>Softwares Registrados</h2>
      <div className="software-list-container">
        <button
          className="button primary"
          id="btnAddCan"
          onClick={() => openModal("addSoftware")}
        >
          Agregar Software
        </button>
        <table className="hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {softwareList.map((software) => (
              <tr key={software.id}>
                <td>{software.id}</td>
                <td>{software.name}</td>
                <td>
                  <button className="button "> Eliminar </button>
                  <button className="button edit">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="user-actions">
        <button onClick={() => navigate("/user/evaluate-software")}>
          Evaluar Software
        </button>
        <button onClick={() => navigate("/user/view-evaluations")}>
          Ver Reportes
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Modal"
      >
        {modalType === "addSoftware" && (
          <>
            <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
              Agregar Nuevo Software
            </h2>
            <form onSubmit={handleRegister}>
              <label>Nombre:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Versión:</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                required
              />

              <label>Descripción:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <label>Desarrollador:</label>
              <input
                type="text"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                required
              />

              <label>Contacto:</label>
              <input
                type="email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />

              <label>Propietario:</label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
              />

              <label>Licencia:</label>
              <input
                type="text"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                required
              />
              <label>Company:</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />

              <button type="submit">Registrar Software</button>
              <button
                type="button"
                className="button alert"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </form>
          </>
        )}
      </Modal>
      {serverResponse && (
        <Modal
          isOpen={!!serverResponse}
          onRequestClose={() => setServerResponse('')}
          style={customModalStyles}
          contentLabel="Respuesta del Servidor"
        >
          <h2>Mensaje</h2>
          <p>{serverResponse}</p>
          <button onClick={() => setServerResponse('')}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default UserHome;
