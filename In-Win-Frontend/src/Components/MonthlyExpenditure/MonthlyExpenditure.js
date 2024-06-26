import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Stocks/Stock.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation } from "react-router-dom";

import { BASE_URl } from '../API/Api';
import BillsImage from "../../assets/bills.jpg"
import BillsImage1 from "../../assets/bills_1.jpg"
import BillsImage2 from "../../assets/Bills_2.jpg"
import { CurrencyState } from '../../CurrencyContext';

function Bills() {
    const location = useLocation();
    const { state: { userData } = {} } = location;
    const [showModal, setShowModal] = useState(false);
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const { exchangeRate, currency } = CurrencyState();
   const billPics=[BillsImage,BillsImage2,BillsImage1]
    const backgroundImageStyle = (index) => {
        return {
            backgroundImage: `url(${billPics[index % billPics.length]})`,
            backgroundSize: 'cover',
          
        };
    };
    const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];
    const handleEdit = (bill) => {
        setSelectedBill(bill);
        setShowModal(true);
    };
console.log("the user name is",userData.userName)
    const populateModal = () => {
        if (!selectedBill) return;
        setNewBillData({
            id: selectedBill.id,
            name: selectedBill.name,
            amount: selectedBill.amount,

        });
    };

    useEffect(() => {
        populateModal();
    }, [selectedBill]);

    const [newBillData, setNewBillData] = useState({
        id: '',
        name: '',
        amount: '',
        userName: userData ?userData.userName: ''
    });

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = () => {
        axios.get(`${BASE_URl}/api/monthlyExpenses/getMonthlyExpenditureForUser/${userData.userName}`)
            .then(response => {
                setBills(response.data);
            })
            .catch(error => {
                console.error('Error fetching bills:', error);
            });
    };


    const renderPrice = (price) => {
        return (price / exchangeRate).toFixed(2);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setNewBillData({
            id: '',
            name: '',
            amount: '',
        })
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBillData({ ...newBillData, [name]: value });
    };




    const handleDeleteStock = (stockId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this Bill.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URl}/api/monthlyExpenses/delete/${stockId}`)
                    .then(response => {
                        if (response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Bill Deleted',
                                text: 'The stock has been deleted successfully.',
                            });
                            fetchBills();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed to Delete Bill',
                                text: 'An error occurred while deleting the stock. Please try again later.',
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting Bill:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to Delete Bill',
                            text: 'An error occurred while deleting the Bill. Please try again later.',
                        });
                    });
            }
        });
    };

    const handleSaveStock = () => {
        if (newBillData.id) {
            axios.put(`${BASE_URl}/api/monthlyExpenses/update/${newBillData.id}`, newBillData)
                .then(response => {
                    console.log('Bill updated successfully:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: ' Bill Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Update local state after successful update
                    fetchBills();
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error updating monthlyExpenses:', error);
                });
        } else {
            axios.post(`${BASE_URl}/api/monthlyExpenses/save`, newBillData)
                .then(response => {
                    console.log('Bill saved successfully:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Bill Created',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    fetchBills();
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error saving Monthly Expenses:', error);
                });
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Bill</Button>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {bills.map((bill, index) => (
                    <div className="col-md-4 mb-3" key={bill.id}>
                        <div className="card h-100 d-flex flex-column border border-dark" style={backgroundImageStyle(index)}>
                            <div className="card-body">
                                <p style={{ color: "black" }}>Bill Name:<strong> {bill.name}</strong></p>
                                <p style={{ color: "black" }}>Bill Amount:<strong> {renderPrice(bill.amount) }  {currency}</strong></p>
                            </div>
                            <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                                <EditIcon className='fs-4 m-2' style={{ color: "black" }} onClick={() => { handleEdit(bill) }}></EditIcon>
                                <DeleteForeverIcon className='fs-4' style={{ color: "black" }} onClick={() => { handleDeleteStock(bill.id) }}></DeleteForeverIcon>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{newBillData.id ? 'Edit' : 'Add'} Bill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Bill Name</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="name"

                                    className='border border-dark mb-2'
                                    value={newBillData.name}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Bill Amount</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    placeholder='ONiE'
                                    className='border border-dark mb-2'
                                    value={newBillData.amount}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex align-items-center justify-content-center '>
                    <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveStock}>{newBillData.id ? 'Update' : 'Save'} Bill</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Bills;
