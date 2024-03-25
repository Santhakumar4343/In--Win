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
import BikeImage from "../../assets/Bike.jpg"
import BikeImage2 from "../../assets/Bike_1.jpg"
import CarImage from "../../assets/Car.jpg"
import CarImage2 from "../../assets/Car_1.jpg"
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';

function Vehicles() {
    const location = useLocation();
    const { state: { userData } = {} } = location;
    const [showModal, setShowModal] = useState(false);
    const [vehicle, setVehicle] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const { exchangeRate ,currency} = CurrencyState();
    console.log(exchangeRate)
    const titleColors = ["#42ff75", "#3ba3ed", "#fc47ed", "#e82e44", "#f5c802", "#f2a04e"];
    const VehicleImages=[BikeImage,CarImage,BikeImage2,CarImage2];
    const backgroundImageStyle = (index) => {
        return {
            backgroundImage: `url(${VehicleImages[index % VehicleImages.length]})`,
            backgroundSize: 'cover',
          
        };
    };
    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowModal(true);
    };

    const populateModal = () => {
        if (!selectedVehicle) return;
        setNewVehicleData({
            id: selectedVehicle.id,
            vehicleName: selectedVehicle.vehicleName,
            vehicleNumber: selectedVehicle.vehicleNumber,
            buyDate: selectedVehicle.buyDate,
            purchasePrice: selectedVehicle.purchasePrice,
            quantity: selectedVehicle.quantity,
        });
    };

    useEffect(() => {
        populateModal();
    }, [selectedVehicle]);

    const [newVehicleData, setNewVehicleData] = useState({
        id: '',
        vehicleName: '',
        purchasePrice: "",
        buyDate: '',
        vehicleNumber: '',
        lastUpdateDate: '',
        quantity: "",
        userName: userData ? userData.userName : ''
    });

    useEffect(() => {
        if (userData && userData.userName) { // Check if userData and userName are defined
            fetchInsurance(); // Fetch stocks only if userName is available
        }
    }, [userData]);
    const fetchInsurance = () => {
        axios.get(`${BASE_URl}/api/vehicles/getVehiclesForUser/${userData.userName}`)
            .then(response => {
                setVehicle(response.data);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
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
        setNewVehicleData({ ...newVehicleData, [name]: value });
    };
    const handleDeleteStock = (vehicleId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this vehicle.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URl}/api/vehicles/deleteVehicle/${vehicleId}`)
                    .then(response => {
                        if (response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Vehicle Deleted',
                                text: 'The vehicle has been deleted successfully.',
                            });
                            fetchInsurance();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed to Delete Insurance',
                                text: 'An error occurred while deleting the vehicle. Please try again later.',
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting vehicle:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to Delete vehicle',
                            text: 'An error occurred while deleting the vehicles. Please try again later.',
                        });
                    });
            }
        });
    };

    const handleSaveStock = () => {
        if (newVehicleData.id) {
            axios.put(`${BASE_URl}/api/vehicles/updateVehicle/${newVehicleData.id}`, newVehicleData)
                .then(response => {
                    console.log('Vehicle updated successfully:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Vehicle Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Update local state after successful update
                    fetchInsurance();
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error updating Realestate:', error);
                });
        } else {
            axios.post(`${BASE_URl}/api/vehicles/save`, newVehicleData)
                .then(response => {
                    console.log('Vehicle saved successfully:', response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Vehicle Created',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    fetchInsurance();
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error saving Vehicle:', error);
                });
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Vehicle</Button>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {vehicle.map((vehicle, index) => (
                    <div className="col-md-4 mb-3" key={vehicle.id}>
                        <div className="card h-100 d-flex flex-column border border-dark" style={backgroundImageStyle(index)}>
                            <div className="card-body">
                                <h5 className="card-title text-center" style={{ color: "white" }}>{vehicle.vehicleName}</h5>
                                <p style={{ color: "white" }}><strong>Vehicle Number:</strong>{vehicle.vehicleNumber}</p>
                                <p style={{ color: "white" }}><strong>Purchase Price:</strong> {renderPrice(vehicle.purchasePrice)} {currency}</p>
                                <p style={{ color: "white" }}><strong>Buy Date:</strong> {moment(vehicle.buyDate).format("DD-MM-YYYY")}</p>
                                <p style={{ color: "white" }}><strong>Quantity :</strong>{vehicle.quantity}</p>
                                <p style={{ color: "white" }}><strong>Last Update Date:</strong> {moment(vehicle.lastUpdateDate).format("DD-MM-YYYY")}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-center align-items-center border border-dark ">
                                <EditIcon className='fs-4 m-2' onClick={() => { handleEdit(vehicle) }} style={{ color: "white" }}></EditIcon>
                                <DeleteForeverIcon className='fs-4' onClick={() => { handleDeleteStock(vehicle.id) }} style={{ color: "white" }}></DeleteForeverIcon>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{newVehicleData.id ? 'Edit' : 'Add'} Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Vehicle Name</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="vehicleName"
                                    placeholder='Car/Bike'
                                    className='border border-dark mb-2'
                                    value={newVehicleData.vehicleName}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Label>Vehicle Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="vehicleNumber"
                                    placeholder='AP 37 AR 5656'
                                    className='border border-dark mb-2'
                                    value={newVehicleData.vehicleNumber}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Purchase Price </Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="purchasePrice"
                                    placeholder='50₹'
                                    className='border border-dark mb-2'
                                    value={newVehicleData.purchasePrice}
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
                                    value={newVehicleData.buyDate}
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
                                    name="quantity"
                                    className='border border-dark mb-2'
                                    value={newVehicleData.quantity}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>


                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex align-items-center justify-content-center '>
                    <Button variant="secondary " onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveStock}>{newVehicleData.id ? 'Update' : 'Save'} Vehicle</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Vehicles;
