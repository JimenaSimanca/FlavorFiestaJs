import React from 'react';
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
import drink from '../../assets/drink.jpg'
import poppinsRegular from '../../assets/Poppins-Regular.ttf';
import poppinsBold from '../../assets/Poppins-Bold.ttf';

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
    color: '#FFFFFFF'
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
          <Text style={styles.orderNumber}>Orden #001</Text>
          <Text style={styles.orderText}>Fecha de compra: Junio 2024</Text>
          <Text style={styles.orderText}>
            Estado de pago: <Text style={styles.paymentStatus}>PAGADO</Text>
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
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Image style={styles.tableCellImage} src= {drink} />
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Amarela</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>1</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$20.000</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
              <Image style={styles.tableCellImage} src= {drink} />
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>BerryBliss</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>3</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$60.000</Text>
              </View>
            </View>
          </View>
          <Text style={styles.total}>Subtotal: $80.000</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la compra:</Text>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Datos personales y dirección:</Text>
            <Text style={styles.infoText}>Nombre:</Text>
            <Text style={styles.infoText}>Dirección:</Text>
            <Text style={styles.infoText}>Email:</Text>
            <Text style={styles.infoText}>Teléfono:</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Método de pago:</Text>
            <Text style={styles.infoText}>Nombre:</Text>
            <Text style={styles.infoText}>Estado de pago:</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Report;