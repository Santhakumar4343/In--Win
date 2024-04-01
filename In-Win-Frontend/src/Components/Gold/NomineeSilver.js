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
import SilverImage from "../../assets/silver1.jpg"
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function Silver() {
    const location = useLocation();
    const { state: { userData } = {} } = location;
    const [showModal, setShowModal] = useState(false);
    const [silver, setSilver] = useState([]);
    const [selectedSilver, setSelectedSilver] = useState(null);
    const { exchangeRate, currency } = CurrencyState();
    const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];

    useEffect(() => {
        populateModal(selectedSilver);
    }, [selectedSilver]);

    const populateModal = (selectedSilver) => {
        if (!selectedSilver) return;
        setNewSilverData({
            id: selectedSilver.id,
            name: selectedSilver.name,
            purchasePrice: selectedSilver.purchasePrice,
            buyDate: selectedSilver.buyDate,
            quantity: selectedSilver.quantity,
        });
    };


    const [newSilverData, setNewSilverData] = useState({
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
        axios.get(`${BASE_URl}/api/silver/getSilverForUser/${userData.owner}`)
            .then(response => {
                setSilver(response.data);
            })
            .catch(error => {
                console.error('Error fetching Silver:', error);
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
        setNewSilverData({ ...newSilverData, [name]: value });
    };

    const handleDeleteGold = (silverId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this Silver.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URl}/api/silver/deleteSilver/${silverId}`)
                    .then(response => {
                        if (response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Silver Deleted',
                                text: 'The Silver has been deleted successfully.',
                            });
                            fetchGold();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed to Delete Silver',
                                text: 'An error occurred while deleting the Silver. Please try again later.',
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting Silver:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to Delete Silver',
                            text: 'An error occurred while deleting the Silver. Please try again later.',
                        });
                    });
            }
        });
    };

    const handleSaveGold = () => {
        if (newSilverData.id) {
            axios.put(`${BASE_URl}/api/silver/updateSilver/${newSilverData.id}`, newSilverData)
                .then(response => {
                    console.log('Silver updated successfully:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Silver Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Update local state after successful update
                    fetchGold();
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error updating Silver:', error);
                });
        } else {
            axios.post(`${BASE_URl}/api/silver/save`, newSilverData)
                .then(response => {
                    console.log('Silver saved successfully:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Silver Created',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    fetchGold();
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error saving Silver:', error);
                });
        }
    };
    const handleEdit = (silver) => {
        setSelectedSilver(silver);
        setNewSilverData({
            id: silver.id,
            name: silver.name,
            purchasePrice: silver.purchasePrice,
            buyDate: silver.buyDate,
            quantity: silver.quantity,
            currentPrice: silver.currentPrice,
            lastUpdateDate: silver.lastUpdateDate,
            userName: silver.userName
        });
        setShowModal(true);
    };



    useEffect(() => {
        fetchGoldPrice();
    }, []);

    const [silverPrice, setSilverPrice] = useState(0);

    const fetchGoldPrice = async () => {
        try {
            const response = await axios.get(`${BASE_URl}/api/silver/silver-price`);


            // Store both prices separately in the state
            setSilverPrice(response.data.pricePerKg);
        } catch (error) {
            console.error('Error fetching silver price:', error);
        }
    };

    return (
        <div>
          
            <div className="row row-cols-1 row-cols-md-3 g-4 " style={{ marginTop: "1px" }}>
                {silver.map((silver, index) => (
                    <div className="col-md-4 mb-3" key={silver.id}>
                        <div className="card h-100 d-flex flex-column border border-dark" style={{ backgroundImage: `url(${SilverImage})`, backgroundSize: 'cover' }}>
                            <div className="card-body">
                                <h5 className="card-title text-center" style={{ color: "black" }}>{silver.name}</h5>
                                <p style={{ color: "black" }}><strong>Purchase Price:</strong> {renderPrice(silver.purchasePrice)} {currency}</p>
                                <p style={{ color: "black" }}><strong>Buy Date:</strong> {moment(silver.buyDate).format("DD-MM-YYYY")}</p>
                                <p style={{ color: "black" }}><strong>Quantity:</strong> {silver.quantity}</p>
                                <p style={{ color: "black" }}><strong>Current Price:</strong> {renderPrice(silverPrice)} {currency} <strong>/per gram</strong></p>
                                <p style={{ color: "black" }}><strong>Last Update Date:</strong> {moment(silver.lastUpdateDate).format("DD-MM-YYYY")}</p>

                            </div>
                            {/* <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(silver) }}></EditIcon>
                                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteGold(silver.id) }}></DeleteForeverIcon>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{newSilverData.id ? 'Edit' : 'Add'} Silver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Silver Name</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder=''
                                    className='border border-dark mb-2'
                                    value={newSilverData.name}
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
                                    value={newSilverData.purchasePrice}
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
                                    value={newSilverData.buyDate}
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
                                    value={newSilverData.quantity}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex align-items-center justify-content-center '>
                    <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveGold}>{newSilverData.id ? 'Update' : 'Save'} Silver</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Silver;
