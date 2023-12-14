import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");

  useEffect(() => {
    const unsubscribe = db
      .collection("cuentas")
      .orderBy("fecha", "desc")
      .onSnapshot((snapshot) => {
        const listaMovimientos = [];

        snapshot.forEach((doc) => {
          const movimiento = doc.data();
          listaMovimientos.push({ id: doc.id, ...movimiento });
        });

        setMovimientos(listaMovimientos);
      });

    return () => unsubscribe();
  }, []);

  const eliminarMovimiento = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este movimiento?"
    );

    if (confirmacion) {
      db.collection("cuentas")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Movimiento eliminado correctamente");
        })
        .catch((error) => {
          console.error("Error al eliminar el movimiento:", error);
        });
    }
  };

  const filtrarMovimientos = () => {
    let movimientosFiltrados = [...movimientos];

    if (filtroTipo !== "todos") {
      movimientosFiltrados = movimientosFiltrados.filter(
        (movimiento) => movimiento.tipo === filtroTipo
      );
    }

    if (filtroCategoria !== "todas") {
      movimientosFiltrados = movimientosFiltrados.filter(
        (movimiento) => movimiento.categoria === filtroCategoria
      );
    }

    return movimientosFiltrados;
  };

  return (
    <>
      <div className="m-2">
        <h2 className="text-center text-warning">Movimientos:</h2>

        {/* Selector para filtrar por tipo */}
        <div className="mb-2">
          <label className="p-2">Filtrar por tipo:</label>
          <select
            onChange={(e) => setFiltroTipo(e.target.value)}
            value={filtroTipo}
          >
            <option value="todos">Todos</option>
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
        </div>

        {/* Selector para filtrar por categoría */}
        <div className="mb-2">
          <label className="p-2">Filtrar por categoría:</label>
          <select
            onChange={(e) => setFiltroCategoria(e.target.value)}
            value={filtroCategoria}
          >
            <option value="todas">Todas</option>
            <option value="Sueldo">Sueldo</option>
            <option value="Salud">Salud</option>
            <option value="Supermercado">Supermercado</option>
            <option value="Impuestos y Servicios">Impuestos y Servicios</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Traslado">Traslado</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <table className="table table-hover">
          <thead>
            <tr className="table-dark">
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Observaciones</th>
              <th>Archivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarMovimientos().map((movimiento) => (
              <tr key={movimiento.id}>
                <td>{movimiento.fecha}</td>
                <td>{movimiento.tipo}</td>
                <td>${movimiento.monto.toFixed(2)}</td>
                <td>{movimiento.categoria}</td>
                <td>{movimiento.observaciones}</td>
                <td>
                  <a href={movimiento.archivoUrl}>
                    <img
                      src={movimiento.archivoUrl}
                      alt=""
                      width="50"
                      height="50"
                    />
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => eliminarMovimiento(movimiento.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Movimientos;
