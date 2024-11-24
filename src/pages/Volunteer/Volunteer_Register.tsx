import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import "../HP/HP_Register.css"
import SuccessMessage from '../../components/SuccessMessage';
import { useToggle } from '../../pages/HP/useToggle';
import loading_gif from '../../resources/prosecing.gif';

const Volunteer_Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [confomationPassword, setConfomationPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [zip, setZip] = useState('');
    const [experiences, setExperiences] = useState('');
    const [message, setMessage] = useState('');
    const [passwordPattonError, setpasswordPattonError] = useState('');
    const [passwordPattenErrorShow, setPasswordPattenErrorShow] = useState(false);
    const [previousWorksPdf, setPreviousWorksPdf] = useState<File | null>(null);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [phoneNumberError, setPhoneNumberError] = useState<JSX.Element | null>(null);
    const [showPopup, togglePopup] = useToggle();
    const [successState, setSuccessState] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showLoadingPopup, toggleLoadingPopup] = useState(false);
    const [successFlag, setSuccessFlag] = useState(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /@/;
        if (!emailRegex.test(value)) {
            setEmailError('Email must contain "@" character ');
        } else {
            setEmailError(null);
        }
    };

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const phoneRegex = /^0\d{9}$/;

        if (!phoneRegex.test(value)) {
            setPhoneNumberError(
                <div>
                    <span>Mobile number must start with 0</span><br />
                    <span>and have exactly 10 digits</span>
                </div>
            );
        } else {
            setPhoneNumberError(null);
        }

        setPhoneNumber(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        const minLength = 8;
        const maxLength = 15;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/;
    
        if (newPassword.length < minLength || newPassword.length > maxLength) {
            setpasswordPattonError(`Password must be between ${minLength} and ${maxLength} characters long.`);
            setPasswordPattenErrorShow(true);
        } else if (!regex.test(newPassword)) {
            setpasswordPattonError('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            setPasswordPattenErrorShow(true);
        } else {
            setpasswordPattonError('');
            setPasswordPattenErrorShow(false);
        }
      };

    const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfilePicture(e.target.files[0]);
        }
    };

    const handlePreviousWorksPdf = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPreviousWorksPdf(e.target.files[0]);
        }
    };

    useEffect(() => {
        if ((password != confomationPassword) && confomationPassword != '') {
            setMessage("Passwords are not matching");
        }else{
            setMessage('');
        }
    }, [password, confomationPassword]);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        if((message != '') || (passwordPattonError != '') || (emailError != null) || (phoneNumberError != null)){
            alert("Something wrong in your data");
            return;
        }
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('address', address);
        formData.append('address2', address2);
        formData.append('city', city);
        formData.append('district', district);
        formData.append('province', province);
        formData.append('zip', zip);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        if (profilePicture) formData.append('profilePicture', profilePicture);
        formData.append('password', password);
        formData.append('experiences', experiences);
        if (previousWorksPdf) formData.append('previousWorksPdf', previousWorksPdf);
    
        try {
            toggleLoadingPopup(true);
          const response = await axios.post('http://localhost:15000/volunteerRegistrationRequestSave', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setSuccessMessage('Your registration request has been created successfully. After verifying it we will inform you about it via an email. Thank you!');
          setSuccessState('Success');
          toggleLoadingPopup(false);
          setSuccessFlag(true);
          togglePopup();

        } catch (error) {
          setMessage('Error registering user');
        }
      };

    return (
        <div className='hp_form'>
            <div className='form_div'>
                <form onSubmit={handleRegister}>
                <label className='hp_header'>Volunteer Registration</label>
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
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <select 
                                id="inputState" 
                                className="form-control" 
                                value={district}
                                required
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
                                required
                                onChange={(e) => setProvince(e.target.value)}
                            >
                                <option value="" disabled>Province</option>
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
                                placeholder="Postal Code" 
                                required
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </div>
                    </div>
                    <h1 className='Profession'>Account Details</h1>
                    <div className="name-group">
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Email" 
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <label className='passwordNotMatchingErrorHpRegister'>{emailError}</label>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Mobile Number" 
                            required
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </div>
                    <label className='passwordNotMatchingErrorHpRegister phoneNumberError_HP_Resister'>{phoneNumberError}</label>
                    </div>
                    <div className="form-group">
                       <label htmlFor="exampleFormControlFile1">Profile Picture</label>
                       <input 
                       type="file" 
                       className="form-control-file" 
                       required
                       id="exampleFormControlFile1" 
                       onChange={handleProfilePictureChange}/>
                     </div>
                    <div className="name-group">
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password for New Account" 
                            maxLength={15}
                            required
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            required
                            aria-describedby="emailHelp" 
                            placeholder="Confirmation Password" 
                            value={confomationPassword}
                            onChange={(e) => setConfomationPassword(e.target.value)}
                        />
                    </div>
                    <label className='passwordNotMatchingErrorHpRegister'>{message}</label>
                    </div>
                    <div className={`${passwordPattenErrorShow ? 'passwordPattenErrorHpRegisterDiv' : 'passwordPattenErrorHpRegisterNotShow'}`}>
                    <p className='passwordPattenErrorHpRegister'>{passwordPattonError}</p>
                    </div>
                    <h1 className='Profession_2' style={{marginLeft: '-580px'}}>Previous Experiences</h1>
                    <div className="name-group">
                    <div className="form-group">
                            <textarea 
                                id="inputState" 
                                className="form-control" 
                                placeholder='Previous Experiences...'
                                value={experiences}
                                required
                                onChange={(e) => setExperiences(e.target.value)}
                            />
                    </div>
                    </div>
                    <div className="form-group">
                       <label htmlFor="exampleFormControlFile1">Previous Works (PDF Format)</label>
                       <input 
                       type="file" 
                       className="form-control-file" 
                       required
                       id="exampleFormControlFile1" 
                       onChange={handlePreviousWorksPdf}/>
                     </div>
                    <button type="submit" className="btn btn-primary">Submit the Request</button>
                </form>
            </div>
            <img className={`${showLoadingPopup ? 'showLoading HP_Register_loading_gif' : 'HP_Register_loading_gif_notShow'}`} src={loading_gif}/>
            {successFlag && <SuccessMessage  show={showPopup} handleClose={togglePopup} message={successMessage} successState={successState}/>}
        </div>
    );
};

export default Volunteer_Register;
