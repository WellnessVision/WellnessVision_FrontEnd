import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import "./HP_Register.css"

const HP_Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confomationPassword, setConfomationPassword] = useState('');
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
    const [passwordPattonError, setpasswordPattonError] = useState('');
    const user_type = "HP";
    const [passwordPattenErrorShow, setPasswordPattenErrorShow] = useState(false);
    const [certificateImage, setCertificateImage] = useState<File | null>(null);
    const [otherVerificationPdf, setOtherVerificationPdf] = useState<File | null>(null);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

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

      const handleCertificateFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCertificateImage(e.target.files[0]);
        }
    };

    const handleOtherVerificationPdfChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setOtherVerificationPdf(e.target.files[0]);
        }
    };

    const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfilePicture(e.target.files[0]);
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
        if((message != '') || (passwordPattonError != '')){
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
        if (profilePicture) formData.append('profilePicture', profilePicture);
        formData.append('password', password);
        formData.append('profession', profession);
        formData.append('organization', organization);
        formData.append('regNo', regNo);
        formData.append('ownership', ownership);
        if (certificateImage) formData.append('certificateImage', certificateImage);
        if (otherVerificationPdf) formData.append('otherVerificationPdf', otherVerificationPdf);
    
        try {
          const response = await axios.post('http://localhost:15000/healthProfessionalRegistrationRequest', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setMessage(response.data.message || 'Registration successful');
        } catch (error) {
          setMessage('Error registering user');
        }
      };

    return (
        <div className='hp_form'>
            <div className='form_div'>
                <form onSubmit={handleRegister}>
                <label className='hp_header'>Health Professional Registration</label>
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
                                required
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </div>
                    </div>
                    <h1 className='Profession'>Account Details</h1>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                            placeholder="Conformation Password" 
                            value={confomationPassword}
                            onChange={(e) => setConfomationPassword(e.target.value)}
                        />
                    </div>
                    <label className='passwordNotMatchingErrorHpRegister'>{message}</label>
                    </div>
                    <div className={`${passwordPattenErrorShow ? 'passwordPattenErrorHpRegisterDiv' : 'passwordPattenErrorHpRegisterNotShow'}`}>
                    <p className='passwordPattenErrorHpRegister'>{passwordPattonError}</p>
                    </div>
                    <h1 className='Profession_2'>Profession Details</h1>
                    <div className="name-group">
                    <div className="form-group">
                            <select 
                                id="inputState" 
                                className="form-control" 
                                value={profession}
                                required
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
                                required
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
                                required
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
                                required
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
                                required
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
                       id="exampleFormControlFile1" 
                       onChange={handleCertificateFileChange}/>
                     </div>
                     <div className="form-group">
                       <label htmlFor="exampleFormControlFile1">Any Other Verification Details (PDF)</label>
                       <input 
                       type="file" 
                       className="form-control-file" 
                       required
                       id="exampleFormControlFile1" 
                       onChange={handleOtherVerificationPdfChange}/>
                     </div>
                    <button type="submit" className="btn btn-primary">Submit the Request</button>
                </form>
            </div>
        </div>
    );
};

export default HP_Register;
