import React, { useEffect, useState } from "react";
import "./ListaPedidos.css";
import Report from "../Report/Report";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../../config";

const ListaPedidos = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/informacionCompra/informacionCompleta/2`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleDownload = () => {
    if (pdfUrl) {
      setIsDownloaded(true);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "HistorialDePedido.pdf";
      link.click();
    }
  };

  if (!orderDetails) {
    return <div>Cargando...</div>;
  }

  const { orden, OrdenProducto, datos_envio } = orderDetails;
  const subtotal = OrdenProducto.reduce((acc, producto) => acc + producto.total, 0);

  return (
    <div className="order-summary">
      <header>
        <p>Orden #{orden.id}</p>
        <p>Fecha: {orden.fechaOrden}</p>
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
                {OrdenProducto.map(producto => (
                  <tr key={producto.id}>
                    <td>
                      <img src={producto.producto.imagenes ? producto.producto.imagenes[0] : "default-image.png"} alt={producto.producto.nombre} />
                    </td>
                    <td>{producto.producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total">Subtotal: ${subtotal}</div>
          </div>
          <div className="shipping-details">
            Dirección de envío
            <div>
              <div className="text">Nombre: {datos_envio.nombre}</div>
              <div className="text">Dirección: {datos_envio.direccion}</div>
              <div className="text">Email: {datos_envio.email}</div>
              <div className="text">Telefono: {datos_envio.telefono}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListaPedidos;