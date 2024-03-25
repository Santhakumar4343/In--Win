import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation } from "react-router-dom";
import { BASE_URl } from '../API/Api';
import { CurrencyState } from '../../CurrencyContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";


function Profile() {
    const Navigate = useNavigate();
    const location = useLocation();
    const { state: { userData } = {} } = location;
    const [showModal, setShowModal] = useState(false);
    const [showProfessionalModal, setShowProfessionalModal] = useState(false);
    const { exchangeRate,currency } = CurrencyState(); 
    const renderPrice = (price) => {
        return (price / exchangeRate).toFixed(2);
      };
    const [editedUserData, setEditedUserData] = useState({
        userName: userData ? userData.userName : "",
        email: userData ? userData.email : "",
        password: userData ? userData.password : "",
        mobileNumber: userData ? userData.mobileNumber : "",
        gender: userData ? userData.gender : "",
        fatherName: userData ? userData.fatherName : "",
        dob: userData ? moment(userData.dob).format('YYYY-MM-DD') : "",
        bloodGroup: userData ? userData.bloodGroup : "",
        panNumber: userData ? userData.panNumber : "",
        aadhar: userData ? userData.aadhar : "",
        voterId: userData ? userData.voterId : "",
        drivingLicense: userData ? userData.drivingLicense : "",
        presentAddress: userData ? userData.presentAddress : "",
        permanentAddress: userData ? userData.permanentAddress : ""
    });

    const [editedProfessionalData, setEditedProfessionalData] = useState({
        ctc: userData ? userData.ctc : "",
        yearlyBonus: userData ? userData.yearlyBonus : "",
        pfUAN: userData ? userData.pfUAN : "",
        pfStartDate: userData ? userData.pfStartDate : "",
        pfTotalPaid: userData ? userData.pfTotalPaid : "",
        monthlyEMI: userData ? userData.monthlyEMI : "",
        occupation: userData ? userData.occupation : "",
        designation: userData ? userData.designation : "",
        companyAddress: userData ? userData.companyAddress : "",
        empId: userData ? userData.empId : "",
        companyContact: userData ? userData.companyContact : "",
        companyName: userData ? userData.companyName : "",
        companyPhoneNumber: userData ? userData.companyPhoneNumber : "",
        companyEmail: userData ? userData.companyEmail : "",
        companyLandline: userData ? userData.companyLandline : "",
        emergencyContact: userData ? userData.emergencyContact : ""
    });
    const handleEditProfessional = () => {
        setShowProfessionalModal(true);
    };
    const handleCloseProfessionalModal = () => {
        setShowProfessionalModal(false);
    };

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleInputChangeProfessional = (e) => {
        const { name, value } = e.target;
        setEditedProfessionalData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    

    const handleSaveUserDetails = () => {
        axios.put(`${BASE_URl}/api/users/updateUser-personal/${userData.id}`, editedUserData)
            .then(response => {
                console.log('User details updated successfully:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'User Details Updated',
                    showConfirmButton: false,
                    timer: 1500
                });
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error updating user details:', error);
            });
    };
    const handleSaveProfessionalDetails = () => {
        axios.put(`${BASE_URl}/api/users/updateUser-professional/${userData.id}`, editedProfessionalData)
            .then(response => {
                console.log('User details updated successfully:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'User Details Updated',
                    showConfirmButton: false,
                    timer: 1500
                });
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error updating user details:', error);
            });
    };
    const handleLogout = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout'
        }).then((result) => {
          if (result.isConfirmed) {
            window.history.replaceState(null, '', '/');
            Navigate('/');
          }
        });
      }
      

      const [nominees, setNominees] = useState([]);

      useEffect(() => {
        // Fetch data from the API when the component mounts
        axios.get(`${BASE_URl}/api/nominees/getNomineesForOwner/${userData.userName}`)
          .then(response => {
            setNominees(response.data);
          })
          .catch(error => {
            console.error('Error fetching nominees:', error);
          });
      }, []); 
    return (
        <div>
            <Button variant="primary" onClick={handleEdit}>Edit Personal Details</Button>
            <Button variant="primary" className='m-1 mb-2' onClick={handleEditProfessional}>Edit Professional Details</Button>
            <LogoutIcon variant="primary" style={{marginLeft:"560px",fontSize:"36px"}}  onClick={handleLogout}>Edit Personal Details</LogoutIcon>
            <h5 >Personal Details</h5>
            <table class="table table-striped mt-3" style={{borderRadius:"10px"}}>
                <thead>
                </thead>
                <tbody  >
                 
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>User Name</th>
                        <td className='border border-dark'>{userData.userName}</td>
                        <th className='border border-dark'>Email</th>
                        <td className='border border-dark'>{userData.email}</td>
                        <th className='border border-dark'>Password</th>
                        <td className='border border-dark'>{userData.password}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>Mobile Number </th>
                        <td className='border border-dark'>{userData.mobileNumber}</td>
                        <th className='border border-dark'>Gender</th>
                        <td className='border border-dark'>{userData.gender}</td>
                        <th className='border border-dark'>Father Name</th>
                        <td className='border border-dark'>{userData.fatherName}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'> D-O-B </th>
                        <td className='border border-dark'>{userData.dob}</td>
                        <th className='border border-dark'>PAN Number</th>
                        <td className='border border-dark'>{userData.panNumber}</td>
                        <th className='border border-dark'> Aadhar Number</th>
                        <td className='border border-dark'>{userData.aadhar}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>Voter ID</th>
                        <td className='border border-dark'>{userData.voterId}</td>
                        <th className='border border-dark'>Driving License</th>
                        <td className='border border-dark'>{userData.drivingLicense}</td>
                        <th className='border border-dark'> Blood Group </th>
                        <td className='border border-dark'>{userData.bloodGroup}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>Father Name</th>
                        <td className='border border-dark'>{userData.fatherName}</td>
                        <th className='border border-dark'> Present Address</th>
                        <td className='border border-dark'>{userData.presentAddress}</td>
                        <th className='border border-dark'> Permanent Address </th>
                        <td className='border border-dark'>{userData.permanentAddress}</td>
                  
                    </tr>
                   
                </tbody>
            </table>
            <h5 >Professional Details</h5>
            <table class="table table-striped mt-3" style={{borderRadius:"10px"}}>
                <thead>
                </thead>
                <tbody  >
                 
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>Company Name</th>
                        <td className='border border-dark'>{userData.companyName}</td>
            
                        <th className='border border-dark'>Designation</th>
                        <td className='border border-dark'>{userData.designation}</td>
                        <th scope="row" className='border border-dark'>Occupation  </th>
                        <td className='border border-dark'>{userData.occupation}</td>
                    </tr>
                    <tr className='border border-dark'>
                    <th scope="row" className='border border-dark'>Employee ID  </th>
                        <td className='border border-dark'>{userData.empId}</td>
                        <th className='border border-dark'>CTC</th>
                        <td className='border border-dark'>{renderPrice(userData.ctc)} {currency}</td>
                        <th className='border border-dark'>UAN Number</th>
                        <td className='border border-dark'>{userData.pfUAN}</td>
                       
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'> PF Start Date </th>
                        <td className='border border-dark'>{userData.pfStartDate}</td>
                        <th className='border border-dark'>PF Amount </th>
                        <td className='border border-dark'>{renderPrice(userData.pfTotalPaid)} {currency}</td>
                        <th className='border border-dark'>  Monthly EMI</th>
                        <td className='border border-dark'>{renderPrice(userData.monthlyEMI)}{currency}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                        <th scope="row" className='border border-dark'>Yearly Bonus</th>
                        <td className='border border-dark'>{renderPrice(userData.yearlyBonus)}{currency}</td>
                        <th scope="row" className='border border-dark'>Company Email</th>
                        <td className='border border-dark'>{userData.companyEmail}</td>
                        <th className='border border-dark'>Company Contact</th>
                        <td className='border border-dark'>{userData.companyContact}</td>
                  
                    </tr>
                    <tr className='border border-dark'>
                       
                        <th className='border border-dark'> Company Landline </th>
                        <td className='border border-dark'>{userData.companyLandline}</td>
                        <th scope="row" className='border border-dark'>companyAddress</th>
                        <td className='border border-dark'>{userData.companyAddress}</td>
                        <th className='border border-dark'>Emergency Contact</th>
                        <td className='border border-dark'>{userData.emergencyContact}</td>
                      
                    </tr>
                  
                </tbody>
            </table>

            <h5>Nominees</h5>
      <table className="table table-striped">
        <thead className='border border-dark'>
          <tr>
            <th className='border border-dark'> ID</th>
            <th className='border border-dark'>User Name</th>
            <th className='border border-dark'>Email</th>
            <th className='border border-dark'>Mobile Number</th>
            <th className='border border-dark'>User Type</th>
          </tr>
        </thead>
        <tbody className='border border-dark'>
          {nominees.map(nominee => (
            <tr key={nominee.id}>
              <td className='border border-dark'>{nominee.id}</td>
              <td className='border border-dark'>{nominee.userName}</td>
              <td className='border border-dark'>{nominee.email}</td>
              <td className='border border-dark'>{nominee.mobileNumber}</td>
              <td className='border border-dark'> {nominee.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
            
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Username</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="userName"
                                    className='border border-dark mb-2'
                                    value={editedUserData.userName}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    className='border border-dark mb-2'
                                    value={editedUserData.email}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Password</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    className='border border-dark mb-2'
                                    value={editedUserData.password}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Mobile Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="mobileNumber"
                                    className='border border-dark mb-2'
                                    value={editedUserData.mobileNumber}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Gender</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    className='border border-dark mb-2'
                                    value={editedUserData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Father's Name</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="fatherName"
                                    className='border border-dark mb-2'
                                    value={editedUserData.fatherName}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Date of Birth</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    className='border border-dark mb-2'
                                    value={editedUserData.dob}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Blood Group</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="bloodGroup"
                                    className='border border-dark mb-2'
                                    value={editedUserData.bloodGroup}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>PAN Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="panNumber"
                                    className='border border-dark mb-2'
                                    value={editedUserData.panNumber}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Aadhar Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="aadhar"
                                    className='border border-dark mb-2'
                                    value={editedUserData.aadhar}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Voter ID</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="voterId"
                                    className='border border-dark mb-2'
                                    value={editedUserData.voterId}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Driving License</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="drivingLicense"
                                    className='border border-dark mb-2'
                                    value={editedUserData.drivingLicense}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Present Address</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="presentAddress"
                                    className='border border-dark mb-2'
                                    value={editedUserData.presentAddress}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Permanent Address</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="permanentAddress"
                                    className='border border-dark mb-2'
                                    value={editedUserData.permanentAddress}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer  className='d-flex justify-content-center align-items-center'>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveUserDetails}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showProfessionalModal} onHide={handleCloseProfessionalModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Professional Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Label>CTC</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="ctc"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.ctc}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Yearly Bonus</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="yearlyBonus"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.yearlyBonus}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>PF UAN</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="pfUAN"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.pfUAN}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>PF Start Date</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="date"
                                    name="pfStartDate"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.pfStartDate}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>PF Amount</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="pfTotalPaid"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.pfTotalPaid}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Monthly EMI</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="monthlyEMI"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.monthlyEMI}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Occupation</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="occupation"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.occupation}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Designation</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="designation"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.designation}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Company Address</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="companyAddress"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.companyAddress}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Employee ID</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="empId"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.empId}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Company Contact</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="companyContact"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.companyContact}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Company Name</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="companyName"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.companyName}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Company Phone Number</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="companyPhoneNumber"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.companyPhoneNumber}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Company Email</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="companyEmail"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.companyEmail}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Company Landline</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="companyLandline"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.companyLandline}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>Emergency Contact</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control
                                    type="text"
                                    name="emergencyContact"
                                    className='border border-dark mb-2'
                                    value={editedProfessionalData.emergencyContact}
                                    onChange={handleInputChangeProfessional}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center align-items-center'>
                    <Button variant="secondary" onClick={handleCloseProfessionalModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveProfessionalDetails}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Profile;
