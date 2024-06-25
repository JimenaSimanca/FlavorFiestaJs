import React, { useContext, useEffect, useState } from 'react';
import './DetallePedido.css';
import { OrderContext } from '../OrderContext/OrderContext';  // Ajusta la ruta si es necesario

const DetallePedidos = () => {
  const { orden } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (orden && orden.success !== false) {
      const parsedOrders = orden.map((o) => ({
        id: o.orden.id,
        date: o.orden.fechaOrden,
        status: o.orden.id_estado,
        total: o.orden.total,
        link: `/orderList/${o.orden.id}`,
      }));
      setOrders(parsedOrders);
    }
  }, [orden]);

  return (
    <div className="order-history">
      <header>
        <h1 className="titulo">Historial de Pedidos</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>#Orden</th>
            <th>Fecha de compra</th>
            <th>Estado de pago</th>
            <th>Total del pedido</th>
            <th>Pedido</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td className={order.status.toLowerCase()}>{order.status}</td>
              <td>{order.total}</td>
              <td>
                <a href={order.link}>Ver Pedido</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetallePedidos;