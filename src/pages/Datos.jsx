import React from "react";
import juan from "./juan.jpg";
import mily from "./mily.jpg";
import JuanDniFrente from "./JuanDniFrente.jpg";
import MilyDniFrente from "./MilyDniFrente.jpg";
import JuanDniDorso from "./JuanDniDorso.jpg";
import MilyDniDorso from "./MilyDniDorso.jpg";
import JuanPami from "./JuanPami.jpg";
import MilyPami from "./MilyPami.jpg"



const Datos = () => {
  return (
    <div className="m-2">
      <h4 className="text-warning text-center mb-2">Datos</h4>
      <table className="table table-hover">
        <thead>
          <tr className="table-dark">
            <th>
              Juan Carlos <br />
              <img
                src={juan}
                alt="Juan"
                width="100"
                height="120"
              ></img>
            </th>
            <th>
              Milagros <br />
              <img
                src={mily}
                alt="Mily"
                width="100"
                height="120"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              DNI: <span className="text-success">11.746.712</span>
            </td>
            <td>
              DNI:<span className="text-success">13.537.347</span>
            </td>
          </tr>
          <tr>
            <td>
              Trámite DNI: <span className="text-success">00198330129</span>
            </td>
            <td>
              Trámite DNI: <span className="text-success">00309156733</span>
            </td>
          </tr>
          <tr>
            <td>
              PAMI Afiliado:<span className="text-success">150384646303/00</span>
            </td>
            <td>
              PAMI Afiliado:<span className="text-success">150996657601/00</span>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" class="btn btn-primary">
                <a
                  className="text-decoration-none text-light"
                  href={JuanDniFrente}
                >
                  Foto DNI Frente
                </a>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary">
                <a
                  className="text-decoration-none text-light"
                  href={MilyDniFrente}
                >
                  Foto DNI Frente
                </a>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" class="btn btn-primary">
                <a
                  className="text-decoration-none text-light"
                  href={JuanDniDorso}
                >
                  Foto DNI Atrás
                </a>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary">
                <a
                  className="text-decoration-none text-light"
                  href={MilyDniDorso}
                >
                  Foto DNI Atrás
                </a>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" class="btn btn-primary">
                <a className="text-decoration-none text-light" href={JuanPami}>
                  Foto Carnet Pami
                </a>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary">
                <a className="text-decoration-none text-light" href={MilyPami}>
                  Foto Carnet Pami
                </a>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Datos;
