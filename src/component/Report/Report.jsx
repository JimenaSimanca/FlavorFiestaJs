import React, { useState, useEffect } from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
  View,
  Font,
} from '@react-pdf/renderer';
import logo from '../../assets/logoo.png';
import poppinsRegular from '../../assets/Poppins-Regular.ttf';
import poppinsBold from '../../assets/Poppins-Bold.ttf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../../config';

Font.register({
  family: 'Poppins',
  fonts: [
    { src: poppinsRegular, fontWeight: 'normal' },
    { src: poppinsBold, fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: "#ffffff",
    fontFamily: 'Poppins',
  },
  header: {
    textAlign: 'left',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    marginLeft: '20',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    color: '#CC2D4A',
    marginBottom: 10,
    marginLeft: '20',
    fontWeight: 'bold',
  },
  orderInfo: {
    marginBottom: 10,
    marginLeft: '20',
  },
  orderNumber: {
    color: '#CC2D4A',
    fontSize: 12,
  },
  orderText: {
    fontSize: 12,
    marginBottom: 4,
  },
  paymentStatus: {
    color: '#8FA206',
  },
  section: {
    marginBottom: 10,
    marginLeft: '20',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 6,
    paddingBottom: 2,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0.3,
    marginBottom: 10,
    borderRadius: 6,
    borderColor: '#D9D9D9',
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 0.3,
    backgroundColor: '#CC2D4A',
    color: '#FFFFFF'
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 0.3,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF'
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  tableCellImage: {
    width: "35%",
    marginLeft: '40',
  }, 
  total: {
    textAlign: 'right',
    marginTop: 10,
    fontSize: 12,
    color: '#CC2D4A'
  },
  infoSection: {
    borderWidth: 0.9,
    borderColor: '#D9D9D9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  infoText: {
    fontSize: 12,
    marginBottom: 4,
    borderRadius: 4,
  }
});

const Report = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

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


  if (!orderDetails) {
    return <Text>Cargando...</Text>;
  }

  const { orden, OrdenProducto, datos_envio, tarjeta } = orderDetails;
  const subtotal = OrdenProducto.reduce((acc, producto) => acc + producto.total, 0);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.title}>
            ¡Descubre La Frescura Y La Diversión En Cada Lata!
          </Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>Orden #{orden.id}</Text>
          <Text style={styles.orderText}>Fecha de compra: {orden.fechaOrden}</Text>
          <Text style={styles.orderText}>
            Estado de pago: <Text style={styles.paymentStatus}>{orden.estado_pago}</Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artículos pedidos:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Imagen</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Nombre Producto</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Cantidad</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total</Text>
              </View>
            </View>
            {OrdenProducto.map(producto => (
              <View style={styles.tableRow} key={producto.id}>
                <View style={styles.tableCol}>
                  <Image style={styles.tableCellImage} src={producto.producto.imagenes ? producto.producto.imagenes[0] : "default-image.png"} />
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{producto.producto.nombre}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{producto.cantidad}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>${producto.total}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.total}>Subtotal: ${subtotal}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la compra:</Text>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Datos personales y dirección:</Text>
            <Text style={styles.infoText}>Nombre: {datos_envio.nombre}</Text>
            <Text style={styles.infoText}>Dirección: {datos_envio.direccion}</Text>
            <Text style={styles.infoText}>Email: </Text>
            <Text style={styles.infoText}>Teléfono: </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Método de pago:</Text>
            <Text style={styles.infoText}>Nombre en la tarjeta: {tarjeta.nombre}</Text>
            <Text style={styles.infoText}>Estado de pago: {orden.estado_pago}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Report;
