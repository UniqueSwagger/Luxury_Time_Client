import React, { useState, useEffect } from "react";
import { Table, Container, Button, Form, Badge } from "react-bootstrap";
import axios from "axios";
import Loader from "../Loader/Loader";
import "./AllOrder.css";
import Swal from "sweetalert2";

const AllOrder = () => {
  const [isStatus, setIsStatus] = useState("");
  const [placedOrders, setPlacedOrders] = useState(null);
  //getting all order info
  useEffect(() => {
    axios
      .get("https://sheltered-ocean-21876.herokuapp.com/orders")
      .then((res) => setPlacedOrders(res.data));
  }, [isStatus]);

  const handleUpdate = (e, id) => {
    Swal.fire({
      title: "Are you sure you wanna update status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Updated!", "Successfully updated booking status", "success");
        axios
          .put(`https://sheltered-ocean-21876.herokuapp.com/orders/${id}`, {
            status: e.target.value,
          })
          .then((res) => {
            if (res.data.modifiedCount) {
              setIsStatus(e.target.value);
            }
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you wanna delete it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("deleted!", "Successfully deleted this booking", "success");
        axios
          .delete(`https://sheltered-ocean-21876.herokuapp.com/orders/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const remaining = placedOrders.filter(
                (myPackage) => myPackage._id !== id
              );
              setPlacedOrders(remaining);
            }
          });
      }
    });
  };

  return (
    <>
      {placedOrders ? (
        <Container style={{ zIndex: 1000 }} className="my-5 bg-body p-5 admin">
          <Table responsive>
            <thead className="bg-light rounded">
              <tr>
                <th className="p-3 name">Name</th>
                <th className="p-3">Email Id</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Watch Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Update Status</th>
                <th className="p-3 action">Action</th>
              </tr>
            </thead>
            <tbody>
              {placedOrders?.map(
                ({ _id, name, email, phone, order, status }) => (
                  <tr key={_id}>
                    <td className="p-3">{name}</td>
                    <td className="p-3">{email}</td>
                    <td className="p-3">{phone}</td>
                    <td className="p-3 w-25">{order.name}</td>
                    <td className="p-3">
                      <Badge
                        className="px-2 pb-2 pt-1"
                        pill
                        bg={`${
                          status === "Pending"
                            ? "warning"
                            : status === "Rejected"
                            ? "danger"
                            : "success"
                        }`}
                      >
                        {status}
                      </Badge>
                    </td>
                    <td>
                      <Form.Select
                        className="border-0 w-75 shadow-none"
                        onChange={(e) => handleUpdate(e, _id)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Shipped">Shipped</option>
                      </Form.Select>
                    </td>
                    <td className="p-3">
                      <Button
                        className="shadow-none"
                        onClick={() => handleDelete(_id)}
                        variant="danger"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AllOrder;
