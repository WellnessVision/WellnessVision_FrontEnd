import React, { useState } from 'react';
import axios from 'axios';
import "./HP_Register.css"

const HP_Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [organization, setOrganization] = useState('');
    const [regNo, setRegNo] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [zip, setZip] = useState('');
    const [ownership, setOwnership] = useState('');
    const [profession, setProfession] = useState('');
    const [otherProfession, setOtherProfession] = useState('');
    const [message, setMessage] = useState('');
    const user_type = "HP";

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:15000/register', {
                user_type,
                email,
                password,
                firstName,
                lastName,
                organization,
                regNo,
                address,
                address2,
                city,
                district,
                zip
            });
            setMessage(response.data.message || 'Registration successful');
        } catch (error) {
            setMessage('Error registering user');
        }
    };

    return (
        <div className='hp_form'>
            <div className='form_div'>
                <h1 className='hp_header'>Health Professional Registration</h1>
                <form onSubmit={handleRegister}>
                <h1 className='personal'>Personal Details</h1>
                    <div className="name-group">
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="FirstName" 
                                placeholder="First Name" 
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="LastName" 
                                placeholder="Last Name" 
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputAddress" 
                            placeholder="Address 1" 
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputAddress2" 
                            placeholder="Address 2 (Optional)" 
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>
                    <div className="name-group">
                        <div className="form-group col-md-6">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="inputCity" 
                                placeholder="City" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <select 
                                id="inputState" 
                                className="form-control" 
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            >
                                <option value="" disabled>District</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Galle">Galle</option>
                                <option value="Ampara">Ampara</option>
                                <option value="Anuradhapura">Anuradhapura</option>
                                <option value="Badulla">Badulla</option>
                                <option value="Batticaloa">Batticaloa</option>
                                <option value="Gampaha">Gampaha</option>
                                <option value="Hambantota">Hambantota</option>
                                <option value="Jaffna">Jaffna</option>
                                <option value="Kalutara">Kalutara</option>
                                <option value="Kegalle">Kegalle</option>
                                <option value="Kilinochchi">Kilinochchi</option>
                                <option value="Kurunegala">Kurunegala</option>
                                <option value="Mannar">Mannar</option>
                                <option value="Matale">Matale</option>
                                <option value="Matara">Matara</option>
                                <option value="Moneragala">Moneragala</option>
                                <option value="Mullativu">Mullativu</option>
                                <option value="Nuwara Eliya">Nuwara Eliya</option>
                                <option value="Polonnaruwa">Polonnaruwa</option>
                                <option value="Puttalam">Puttalam</option>
                                <option value="Ratnapura">Ratnapura</option>
                                <option value="Trincomalee">Trincomalee</option>
                                <option value="Vavuniya">Vavuniya</option>
                            </select>
                        </div>
                        </div>
                        <div className="name-group">
                        <div className="form-group col-md-4">
                            <select 
                                id="inputState" 
                                className="form-control" 
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            >
                                <option value="" disabled>province</option>
                                <option value="Central">Central</option>
                                <option value="North Central">North Central</option>
                                <option value="Northern">Northern</option>
                                <option value="Eastern">Eastern</option>
                                <option value="North Western">North Western</option>
                                <option value="Southern">Southern</option>
                                <option value="Uva">Uva</option>
                                <option value="Sabaragamuwa">Sabaragamuwa</option>
                                <option value="Western">Western</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="inputZip" 
                                placeholder="Zip" 
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </div>
                    </div>
                    <h1 className='Profession'>Profession Details</h1>
                    <div className="name-group">
                    <div className="form-group">
                            <select 
                                id="inputState" 
                                className="form-control" 
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                            >
                                <option value="" disabled>Profession</option>
                                <option value="Non-Communicable Diseases (Specialist)">Non-Communicable Diseases (Specialist)</option>
                                <option value="Non-Communicable Diseases">Non-Communicable Diseases</option>
                                <option value="Yoga Masters">Yoga Masters</option>
                                <option value="Consultant (Counselor)">Consultant (Counselor)</option>
                                <option value="Other">Other</option>
                        </select>
                    </div>
                    {profession === 'Other' && (
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="otherProfession" 
                                placeholder="Please specify your profession" 
                                value={otherProfession}
                                onChange={(e) => setOtherProfession(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="form-group">
                            <select 
                                id="inputState" 
                                className="form-control" 
                                value={ownership}
                                onChange={(e) => setOwnership(e.target.value)}
                            >
                                <option value="" disabled>Ownership of Organization</option>
                                <option value="Central">Government Organization</option>
                                <option value="North Central">Private Organization</option>
                                <option value="Northern">Semi Govt Organization</option>
                            </select>
                        </div>
                    </div>
                    <div className="name-group">
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="organization" 
                                placeholder="Registered Organization" 
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="regNo" 
                                placeholder="Registration Number" 
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                       <label htmlFor="exampleFormControlFile1">Verification certificate</label>
                       <input 
                       type="file" 
                       className="form-control-file" 
                       required
                       id="exampleFormControlFile1" />
                     </div>
                     <div className="form-group">
                       <label htmlFor="exampleFormControlFile1">Any Other Verification Details (PDF)</label>
                       <input 
                       type="file" 
                       className="form-control-file" 
                       required
                       id="exampleFormControlFile1" />
                     </div>
                    <button type="submit" className="btn btn-primary">Submit the Request</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default HP_Register;
