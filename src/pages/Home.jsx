import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faDollarSign,
  faList,
  faComment,
  faFile,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import Datos from "./Datos";

const Home = () => {
  const [tipo, setTipo] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [fecha, setFecha] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("cuentas")
      .orderBy("fecha", "desc")
      .onSnapshot((snapshot) => {
        let totalIngresos = 0;
        let totalEgresos = 0;

        snapshot.forEach((doc) => {
          const movimiento = doc.data();

          if (movimiento.tipo === "ingreso") {
            totalIngresos += movimiento.monto;
          } else {
            totalEgresos += movimiento.monto;
          }
        });

        setSaldo(totalIngresos - totalEgresos);
      });

    return () => unsubscribe();
  }, []);

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleMontoChange = (e) => {
    setMonto(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleObservacionesChange = (e) => {
    setObservaciones(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const montoNumerico = parseFloat(monto);

    if (isNaN(montoNumerico)) {
      alert("Por favor, ingresa un monto válido.");
      return;
    }

    const movimiento = {
      tipo,
      monto: montoNumerico,
      categoria,
      observaciones,
      fecha,
    };

    // Subir el archivo a Firebase Storage
    if (archivo) {
      const storageRef = storage.ref();
      const archivoRef = storageRef.child(archivo.name);
      await archivoRef.put(archivo);
      const archivoUrl = await archivoRef.getDownloadURL();

      // Agregar el enlace del archivo a los datos del movimiento
      movimiento.archivoUrl = archivoUrl;
    }

    // Guardar los datos en Firebase Database
    db.collection("cuentas")
      .add(movimiento)
      .then(() => {
        setSaldo(
          tipo === "ingreso" ? saldo + montoNumerico : saldo - montoNumerico
        );
        setMonto("");
        setCategoria("");
        setObservaciones("");
        setFecha("");
        setArchivo(null);
      })
      .catch((error) => {
        console.error("Error al agregar el movimiento: ", error);
      });
  };
  return (
    <>
    <div className="container">
      <div className="d-flex justify-content-between">
        <h3 className="my-4">Registro de Cuentas</h3>
        <div className="my-4">
          <h5 className="btn btn-success btn-lg">
            Saldo: $
            {saldo.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h5>
        </div>
      </div>
      <Datos />
      <h3 className="m-5 text-center text-warning p-1">Ingresar Movimiento</h3>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
            <input
              placeholder="Fecha"
              type="date"
              className="form-control form-control-lg"
              id="fecha"
              value={fecha}
              onChange={handleFechaChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faList} />
            </span>
            <select
              placeholder="Tipo"
              className="form-select form-select-lg"
              id="tipo"
              value={tipo}
              onChange={handleTipoChange}
            >
              <option value="tipo">Elige Tipo</option>
              <option value="Espacio"></option>
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faDollarSign} />
            </span>
            <input
              placeholder="Monto"
              type="text"
              className="form-control form-control-lg"
              id="monto"
              value={monto}
              onChange={handleMontoChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faFile} />
            </span>
            <select
              className="form-select form-select-lg"
              id="categoria"
              value={categoria}
              onChange={handleCategoriaChange}
              placeholder="Categoria"
            >
              <option value="categoria">Elige Categoría</option>
              <option value="Espacio"></option>
              <option value="Sueldo">Sueldo</option>
              <option value="Ofrenda">Otros</option>

              <option value="Espacio"></option>
              <option value="Salud">Salud</option>
              <option value="Supermercado">Supermercado</option>
              <option value="Impuestos y Servicios">
                Impuestos y Servicios
              </option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Traslado">Traslado</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faComment} />
            </span>
            <input
              placeholder="Observaciones"
              type="text"
              className="form-control form-control-lg"
              id="observaciones"
              value={observaciones}
              onChange={handleObservacionesChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faImage} />
            </span>
            <input
              type="file"
              className="form-control form-control-lg"
              id="archivo"
              onChange={handleArchivoChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Movimiento
        </button>
      </form>
      <h6 className="btn btn-success btn-m">Saldo: ${saldo}</h6>
    </div>
    </>
  );
};

export default Home;
