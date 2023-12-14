import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";


export const Recordatorios = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const initialStateValues = {
    data: "",
    name: "",
    descripcion: "",
  };

  const [values, setValues] = useState(initialStateValues);
  const [recordatorios, setRecordatorios] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateData = (str) => {
    return str === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData(values.data)) {
      toast("ERROR: Ingrese una Fecha", {
        type: "error",
        autoClose: 2500,
        position: "top-center",
      });
    } else {
      addOrEditRecordatorio(values);
      setValues(initialStateValues);
      setCurrentId("");
    }
  };

  const addOrEditRecordatorio = async (recordatorioObject) => {
    try {
      if (currentId === "") {
        await db.collection("recordatorios").doc().set(recordatorioObject);

        toast("Recordatorio Agregado", {
          type: "success",
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        await db.collection("recordatorios").doc(currentId).update(recordatorioObject);

        toast("Recordatorio Actualizado", {
          type: "info",
          autoClose: 1000,
          position: "top-center",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteRecordatorio = async (id) => {
    if (window.confirm("¿Desea eliminar el recordatorio?")) {
      await db.collection("recordatorios").doc(id).delete();

      toast("Recordatorio Eliminado", {
        type: "error",
        autoClose: 1000,
        position: "top-center",
      });
    }
  };

  const getRecordatorios = async () => {
    db.collection("recordatorios")
      .orderBy("data", "asc")
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setRecordatorios(docs);
      });
  };

  useEffect(() => {
    getRecordatorios();
  }, []);

  const handleEditReminder = (id) => {
    const reminderToEdit = recordatorios.find((recordatorio) => recordatorio.id === id);
    if (reminderToEdit) {
      setValues({
        data: reminderToEdit.data,
        name: reminderToEdit.name,
        descripcion: reminderToEdit.descripcion,
      });
      setCurrentId(id);
    }
  };

  return (
    <>
      <div>
        <div className=" col-md-6 mx-auto p-2">
          <h4 className="d-flex justify-content-center p-3 text-warning">
            Ingresar Recordatorio Diario
          </h4>
          <form className="card card-body p-4" onSubmit={handleSubmit}>
            <div className="form-group input-group p-1">
              <div className="input-group-text bg-light">
                <i className="material-icons text-primary">event</i>
              </div>
              <input
                type="date"
                className="form-control"
                placeholder="Fecha (DD/MM/AAAA)"
                name="data"
                onChange={handleInputChange}
                value={values.data}
              />
            </div>

            <div className="form-group input-group p-1">
              <div className="input-group-text bg-light">
                <i className="material-icons text-primary">create</i>
              </div>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Recordatorio"
                onChange={handleInputChange}
                value={values.name}
              />
            </div>
            <div className="form-group p-1">
              <textarea
                name="descripcion"
                rows="3"
                className="form-control"
                placeholder="Descripción"
                onChange={handleInputChange}
                value={values.descripcion}
              ></textarea>
            </div>

            <button className="btn btn-primary btn-block m-1">
              {currentId === "" ? "GUARDAR" : "ACTUALIZAR"}
            </button>
          </form>
        </div>

        <div className=" col-md-8 mx-auto p-2">
          <h4 className="d-flex justify-content-center p-3">Reporte de Recordatorios</h4>
          {recordatorios.map((recordatorio) => (
            <div className="card mb-1 text-center" key={recordatorio.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h6>{recordatorio.data}</h6>
                  <h6 className="text-success">{recordatorio.name}</h6>
                  <div>
                    <button className="btn">
                      <i
                        className="material-icons text-danger"
                        onClick={() => onDeleteRecordatorio(recordatorio.id)}
                      >
                        delete
                      </i>
                    </button>

                    <button className="btn" onClick={scrollToTop}>
                      <i
                        className="material-icons"
                        onClick={() => handleEditReminder(recordatorio.id)}
                      >
                        edit
                      </i>
                    </button>
                  </div>
                </div>

                <p className="">{recordatorio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Recordatorios;