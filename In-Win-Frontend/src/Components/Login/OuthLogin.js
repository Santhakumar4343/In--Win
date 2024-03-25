import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import "./Application.css";

const OauthLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Initialize loading state to true
    const ctc = 0;
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userName = params.get('username');


        if (userName) {
            const userData = {
                userName: userName,
                ctc: ctc
            }

            navigate("/userDashBoard", { state: { userData, userData } });
        } else {
            // Handle case where username is not found
            setLoading(false);
        }
    }, [location.search, navigate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <h4 className="me-2">Loading</h4>
                <div className="spinner-grow text-primary " role="status">
                    <span className="sr-only"></span>
                </div>
                <div className="spinner-grow text-secondary ms-2" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }



};

export default OauthLogin;
