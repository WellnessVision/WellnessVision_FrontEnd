import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import "./NU_Register.css";

const NU_Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [preferences, setPreferences] = useState('');
    const [message, setMessage] = useState('');
    const [passwordErrMessage, setPasswordErrMessage] = useState('');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const user_type = "NU";


    useEffect(() => {
        
        if(!(password.length >= 8)){
            setPasswordErrMessage('Password length should be 8 characters or more');
        }
        else if(!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password))){
            setPasswordErrMessage('Password should contain an uppercase, a lowercase, a number, and a special character');
        }else {
            setPasswordErrMessage('');
        }

    }, [password]);


    useEffect(() => {
        if (password != passwordConfirm) {
            setPasswordErrMessage("Password and confirmation do not match");
        }
        else {
        setPasswordErrMessage('');
    }
    }, [passwordConfirm]);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfilePic(e.target.files[0]);
        }
    };

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();

        if (password === passwordConfirm && !passwordErrMessage) {
            if (profilePic) {
                try {
                    const formData = new FormData();
                    formData.append('user_type', user_type);
                    formData.append('email', email);
                    formData.append('phone', phone);
                    formData.append('firstName', firstName);
                    formData.append('lastName', lastName);
                    formData.append('preferences', preferences);
                    formData.append('address', address);
                    formData.append('address2', address2);
                    formData.append('city', city);
                    formData.append('district', district);
                    formData.append('province', province);
                    formData.append('password', password);
                    formData.append('profilePic', profilePic);

                    const response = await axios.post('http://localhost:15000/userRegister', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    setMessage(response.data.message || 'Registration successful');
                } catch (error) {
                    setMessage('Error registering user');
                }
            }
        } else {
            setMessage('Password error');
        }
    };
    return (
        <div className='hp_form user_form_div_NU_Registration'>
            <div className='form_div'>
                <h1 className='hp_header user-header'>User Registration</h1>
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
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="name-group">
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control" 
                                id="Password" 
                                placeholder="Password" 
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setMessage('')}}
                            />
                        </div>
                        <div className="form-group">
                        <input 
                                type="password" 
                                className="form-control" 
                                id="Password_confirm" 
                                placeholder="Confirm Password" 
                                required
                                value={passwordConfirm}
                                onChange={(e) => { setPasswordConfirm(e.target.value); setMessage('') }}
                            />
                        </div>
                        
                        
                        {passwordErrMessage &&<div className="name-group"> <div className="alert alert-danger alertplacement_NU_Registration" role="alert">{passwordErrMessage}</div></div>}
                        
                        
                    </div>
                    
                    
                    <div className="name-group">
                    <div className="form-group">
                    <label className="dob">phone number   </label> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="eg: 0770123456" 
                            required
                            value={phone}
                            id='phone'
                            onChange={(e) => setPhone(e.target.value)}
                        />
                  
                    </div>

                      
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
                                required
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
                       
                    </div>
                    <div className="name-group">
                    
                    <div className="form-group">
                    <label className="Lable-on-left_NU_Registration">Please enter any specifications you want to get notified on..  </label>
                        <input 
                                type="text" 
                                className="form-control" 
                                id="preferences" 
                                placeholder="Eg: diabetes, yoga" 
                                required
                                value={preferences}
                                onChange={(e) => setPreferences(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                    <label className="Lable-on-left">Profile pic  </label>
                        <input 
                                type="file" 
                                className="form-control" 
                                id="preferences" 
                                placeholder="Eg: diabetes, yoga" 
                                required
                                onChange={handleFileChange}
                            />
                        </div>
                
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                
                
                {message && <div className="alert alert-danger alertplacement_NU_Registration" role="alert">{message}</div>}
                </div>
            
        </div>
    );
};

export default NU_Register;
