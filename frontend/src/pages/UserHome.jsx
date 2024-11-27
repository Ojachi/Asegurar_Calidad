import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserSoftware,
  registerSoftware,
  updateSoftware,
  deleteSoftware,
} from "../services/userService";

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
    maxWidth: "500px",
  },
};

Modal.setAppElement("#root");
const UserHome = () => {
  const navigate = useNavigate();
  const [softwareList, setSoftwareList] = useState([]);
  const id_user = localStorage.getItem("id");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [serverResponse, setServerResponse] = useState("");

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
        id_user,
      });
      setServerResponse("Software registrado exitosamente");
    } catch (error) {
      setServerResponse("Error al registrar el software. Inténtalo de nuevo.");
    }
  };

  const handleEdit = (software) => {
    // Rellenar los campos del formulario con los datos del software a editar
    setName(software.name);
    setVersion(software.version);
    setDescription(software.description);
    setDeveloper(software.name_development);
    setContact(software.phone_development);
    setOwner(software.owner);
    setLicense(software.license);
    setCompany(software.company);

    // Configurar el modal para edición
    setModalType("editSoftware");
    setModalIsOpen(true);
  };

  const handleUpdate = async (e, softwareId) => {
    e.preventDefault();
    try {
      await updateSoftware(softwareId, {
        name,
        version,
        description,
        name_development: developer,
        phone_development: contact,
        owner,
        license,
        company,
      });
      setServerResponse("Software actualizado exitosamente");
      closeModal();
      // Recargar la lista de software
      const updatedSoftware = await getUserSoftware(id_user);
      setSoftwareList(updatedSoftware);
    } catch (error) {
      setServerResponse("Error al actualizar el software.");
    }
  };

  const handleDelete = async (softwareId) => {
    try {
      await deleteSoftware(softwareId);
      setServerResponse("Software eliminado exitosamente");
      // Recargar la lista de software
      const updatedSoftware = await getUserSoftware(id_user);
      setSoftwareList(updatedSoftware);
    } catch (error) {
      setServerResponse("Error al eliminar el software.");
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
          className="btn btn-primary"
          id="btnAddSoft"
          onClick={() => openModal("addSoftware")}
        >
          Agregar Software
        </button>
        <br />
        {softwareList.length === 0 ? (
          <p>No hay softwares registrados.</p>
        ) : (
          <table className="table ">
            <thead>
              <tr className="d-flex">
                <th className="col-1">#</th>
                <th className="col-7 ">Nombre</th>
                <th className="col-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {softwareList.map((software) => (
                <tr className="d-flex" key={software.id}>
                  <td className="col-1">{software.id}</td>
                  <td className="col-7">{software.name}</td>
                  <td className="col-4">
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDelete(software.id)}
                    >
                      {" "}
                      Eliminar{" "}
                    </button>

                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        localStorage.setItem("editingSoftwareId", software.id); // Guardar el software.id en localStorage
                        handleEdit(software); // Llamar a la función handleEdit
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="user-actions">
        <button
          className="btn btn-secondary"
          id="btnUser"
          onClick={() => navigate("/user/evaluate-software")}
        >
          Evaluar Software
        </button>
        <button
          className="btn btn-secondary"
          id="btnUser"
          onClick={() => navigate("/user/view-evaluations")}
        >
          Ver Resultados
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
            <div className="form-group">
              <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
                Agregar Nuevo Software
              </h2>
            </div>

            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Versión:</label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Desarrollador:</label>
                <input
                  type="text"
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Contacto:</label>
                <input
                  type="email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Propietario:</label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Licencia:</label>
                <input
                  type="text"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Company:</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <p></p>

              <button type="submit" className="btn btn-primary">
                Registrar Software
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </form>
          </>
        )}
        {modalType === "editSoftware" && (
          <>
            <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
              Editar Software
            </h2>
            <form
              onSubmit={(e) =>
                handleUpdate(e, localStorage.getItem("editingSoftwareId"))
              }
            >
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Versión:</label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Desarrollador:</label>
                <input
                  type="text"
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Contacto:</label>
                <input
                  type="email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Propietario:</label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Licencia:</label>
                <input
                  type="text"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Company:</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <p></p>

              <button type="submit" className="btn btn-primary">Actualizar Software</button>
              <button
                type="button"
                className="btn btn-warning"
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
          onRequestClose={() => setServerResponse("")}
          style={customModalStyles}
          contentLabel="Respuesta del Servidor"
        >
          <h2>Mensaje</h2>
          <p>{serverResponse}</p>
          <button onClick={() => setServerResponse("")}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default UserHome;
