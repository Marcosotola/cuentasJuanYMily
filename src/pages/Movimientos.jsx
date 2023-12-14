import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);

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

 

  return (
    <div className="m-2">
      <h2>Movimientos:</h2>
      <table className="table table-hover">
        <thead>
          <tr className="table-dark">
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Observaciones</th>
            <th>Archivo</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento) => (
            <tr key={movimiento.id} >
              <td>{movimiento.fecha}</td>
              <td>{movimiento.tipo}</td>
              <td>${movimiento.monto.toFixed(2)}</td>
              <td>{movimiento.categoria}</td>
              <td>{movimiento.observaciones}</td>
              <td>{movimiento.archivoUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movimientos;

