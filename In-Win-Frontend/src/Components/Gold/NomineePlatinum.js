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
import { CurrencyState } from '../../CurrencyContext';
import PlatinumImage from '../../assets/Platinum_.jpeg';
function Platinum() {
    const location = useLocation();
    const { state: { userData } = {} } = location;
    const [showModal, setShowModal] = useState(false);
    const [platinum, setPlatinum] = useState([]);
    const [selectedPlatinum, setSelectedPlatinum] = useState(null);
    const { exchangeRate, currency } = CurrencyState();
    const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];

    useEffect(() => {
        populateModal(selectedPlatinum);
    }, [selectedPlatinum]);

    const populateModal = (selectedPlatinum) => {
        if (!selectedPlatinum) return;
        setNewPlatinumData({
            id: selectedPlatinum.id,
            name: selectedPlatinum.name,
            purchasePrice: selectedPlatinum.purchasePrice,
            buyDate: selectedPlatinum.buyDate,
            quantity: selectedPlatinum.quantity,
        });
    };


    const [newPlatinumData, setNewPlatinumData] = useState({
        id: '',
        name: '',

        purchasePrice: '',
        buyDate: '',
        quantity: '',
        currentPrice: '',
        lastUpdateDate: '',
        userName: userData ? userData.userName : ''
    });

    useEffect(() => {
        if (userData && userData.userName) {
            fetchGold();
        }
    }, [userData]);

    const fetchGold = () => {
        axios.get(`${BASE_URl}/api/platinum/getPlatinumForUser/${userData.owner}`)
            .then(response => {
                setPlatinum(response.data);
            })
            .catch(error => {
                console.error('Error fetching Platinum:', error);
            });
    };

    const renderPrice = (price) => {
        return (price / exchangeRate).toFixed(2);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlatinumData({ ...newPlatinumData, [name]: value });
    };

    const handleDeleteGold = (PlatinumId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this Platinum.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URl}/api/platinum/deletePlatinum/${PlatinumId}`)
                    .then(response => {
                        if (response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Platinum Deleted',
                                text: 'The Platinum has been deleted successfully.',
                            });
                            fetchGold();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed to Delete Platinum',
                                text: 'An error occurred while deleting the Platinum. Please try again later.',
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting Platinum:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to Delete Platinum',
                            text: 'An error occurred while deleting the Platinum. Please try again later.',
                        });
                    });
            }
        });
    };

    const handleSaveGold = () => {
        if (newPlatinumData.id) {
            axios.put(`${BASE_URl}/api/platinum/updatePlatinum/${newPlatinumData.id}`, newPlatinumData)
                .then(response => {
                    console.log('Platinum updated successfully:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Platinum Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Update local state after successful update
                    fetchGold();
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error updating Platinum:', error);
                });
        } else {
            axios.post(`${BASE_URl}/api/platinum/save`, newPlatinumData)
                .then(response => {
                    console.log('Platinum saved successfully:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Platinum Created',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    fetchGold();
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error saving Platinum:', error);
                });
        }
    };
    const handleEdit = (platinum) => {
        setSelectedPlatinum(platinum);
        setNewPlatinumData({
            id: platinum.id,
            name: platinum.name,
            purchasePrice: platinum.purchasePrice,
            buyDate: platinum.buyDate,
            quantity: platinum.quantity,
            currentPrice: platinum.currentPrice,
            lastUpdateDate: platinum.lastUpdateDate,
            userName: platinum.userName
        });
        setShowModal(true);
    };



    useEffect(() => {
        fetchGoldPrice();
    }, []);

    const [platinumPrice, setPlatinumPrice] = useState(0);

    const fetchGoldPrice = async () => {
        try {
            const response = await axios.get(`${BASE_URl}/api/platinum/platinum-price`);


            // Store both prices separately in the state
            setPlatinumPrice(response.data.pricePerGram);
        } catch (error) {
            console.error('Error fetching Platinum price:', error);
        }
    };

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-3 g-4 " style={{ marginTop: "1px" }}>
                {platinum.map((platinum, index) => (
                    <div className="col-md-4 mb-3" key={platinum.id}>
                        <div className="card h-100 d-flex flex-column border border-dark" style={{
                            backgroundImage: `url(${PlatinumImage})`,
                            backgroundSize: 'cover',
                            }}
                        >
                            <div className="card-body">
                                <h5 className="card-title text-center" style={{ color: "black" }}>{platinum.name}</h5>
                                <p style={{ color: "black" }}><strong>Purchase Price:</strong> {renderPrice(platinum.purchasePrice)} {currency}</p>
                                <p style={{ color: "black" }}><strong>Buy Date:</strong> {moment(platinum.buyDate).format("DD-MM-YYYY")}</p>
                                <p style={{ color: "black" }}><strong>Quantity:</strong> {platinum.quantity}</p>
                                <p style={{ color: "black" }}><strong>Current Price:</strong> {renderPrice(platinumPrice)} {currency} <strong>/per gram</strong></p>
                                <p style={{ color: "black" }}><strong>Last Update Date:</strong> {moment(platinum.lastUpdateDate).format("DD-MM-YYYY")}</p>

                            </div>
                            {/* <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(platinum) }}></EditIcon>
                                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteGold(platinum.id) }}></DeleteForeverIcon>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{newPlatinumData.id ? 'Edit' : 'Add'} Platinum</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Platinum Name</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder=''
                                    className='border border-dark mb-2'
                                    value={newPlatinumData.name}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Purchase Price</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="number"
                                    name="purchasePrice"
                                    placeholder='50₹'
                                    className='border border-dark mb-2'
                                    value={newPlatinumData.purchasePrice}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Buy Date</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="date"
                                    name="buyDate"
                                    className='border border-dark mb-2'
                                    value={newPlatinumData.buyDate}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Quantity</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="number"
                                    placeholder='In grams'
                                    name="quantity"
                                    className='border border-dark mb-2'
                                    value={newPlatinumData.quantity}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex align-items-center justify-content-center '>
                    <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveGold}>{newPlatinumData.id ? 'Update' : 'Save'} Platinum</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Platinum;
