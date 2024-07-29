import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Email: contact@wellnessvision.com</li>
                            <li>Phone: +1 234 567 890</li>
                            <li>Address: 123 Wellness St, Health City, HV 12345</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>WellnessVision is dedicated to promoting health and wellness through innovative events and programs.</p>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>&copy; 2024 WellnessVision. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
