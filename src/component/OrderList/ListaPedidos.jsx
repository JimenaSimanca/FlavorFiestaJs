import React, { useState } from "react";
import "./ListaPedidos.css";
import Report from "../Report/Report";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, colors } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faPrint,
} from "@fortawesome/free-solid-svg-icons"; 

const ListaPedidos = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    if (pdfUrl) {
      setIsDownloaded(true);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "HistorialDePedido.pdf";
      link.click();
    }
  };

  return (
    <div className="order-summary">
      <header>
        <p>Orden #001</p>
        <p>Fecha: Junio 2024</p>
      </header>
      <section>
        <div className="order-details">
          <p>Resumen del pedido</p>
          <div className="report">
            <FontAwesomeIcon icon={faPrint} />

            <PDFDownloadLink
              document={<Report />}
              fileName="HistorialDePedido.pdf"
            >
              {({ url }) => {
                if (url && !pdfUrl) {
                  setPdfUrl(url);
                }
                return (
                  <Button
                    id="imprimirR"
                    className={`button ${isDownloaded ? "downloaded" : ""}`}
                    onClick={handleDownload}
                    disabled={isDownloaded}
                  >
                    Imprimir Recibo
                  </Button>
                );
              }}
            </PDFDownloadLink>
          </div>
        </div>
        <div className="order-table-detail">
          <div className="all">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre Producto</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="tbody-text">
                <tr>
                  <td>
                    <img src="ruta/amarela.png" alt="Amarela" />
                  </td>
                  <td>Amarela</td>
                  <td>1</td>
                  <td>$20.000</td>
                </tr>
                <tr>
                  <td className="order-table-content">
                    <img src="ruta/berrybliss.png" alt="BerryBliss" />
                  </td>
                  <td className="order-table-content">BerryBliss</td>
                  <td className="order-table-content">3</td>
                  <td className="order-table-content">$60.000</td>
                </tr>
              </tbody>
            </table>
            <div className="total">Subtotal: $80.000</div>
          </div>
          <div className="shipping-details">
            Dirección de envío
            <div>
              <div className="text">Nombre</div>
              <div className="text">Dirección</div>
              <div className="text">Email</div>
              <div className="text">Telefono</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListaPedidos;
