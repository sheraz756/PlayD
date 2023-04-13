import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerStaff } from '../../utils/authUser';
import { useRouter } from 'next/router';
import { Loading } from '../../components/common/Loading';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

let cancel;
const addstaff = () => {
  const router = useRouter();
  const [staff, setStaff] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: ''
  });
  const { name, email, password, role, phoneNumber } = staff;
  const [submitDisable, setSubmitDisable] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    const isStaff = Object.values({ name, email, password, role, phoneNumber }).every(item => Boolean(item));
    isStaff ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [staff])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff(prev => ({ ...prev, [name]: value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerStaff(staff, setError, setFormLoading);
    setShowToaster(true);
  }
  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const res = await axios.get(`${baseUrl}/signup/${username}`, {
        cancelToken: new CancelToken(canceler => {
          cancel = canceler;
        })
      })
      if (error !== null) setError(null);
      if (res.data === 'Available') {
        setUsernameAvailable(true);
        setStaff(prev => ({ ...prev, username }));
      }
    } catch (error) {
      setError('Username not available');
      setUsernameAvailable(false);
    }
    setUsernameLoading(false);
  }

  useEffect(() => {
    username === '' ? setUsernameAvailable(false) : checkUsername();
  }, [username]);
  useEffect(() => {
    error && setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

  return (
    <div className='adduser'>
      {showToaster && <SuccessToaster successMsg="Staff Member Created Successfully!" />}
      {error && <ErrorToastr error={error} />}
      <h3 className='adduserTitle'>Add Staff Member</h3>
      <form className='formControl' onSubmit={submitHandler}>
        <input
          placeholder='Name'
          name='name'
          type='text'
          onChange={handleChange} />

        <input
          placeholder='E-mail'
          name='email'
          type='email'
          onChange={handleChange} />

        <div className='customDiv'>
          <input
            placeholder='Username'
            name='username'
            type='text'
            onChange={e => {
              setUsername(e.target.value);
              if (regexUserName.test(e.target.value)) {
                setUsernameAvailable(true)
              } else {
                setUsernameAvailable(false);
              }
            }}
            className={usernameAvailable && 'available'} />
          <div className='customDivIcon'>
            {usernameLoading && <Loading h={25} w={25} />}
            {usernameAvailable ?
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: '13b164', fontSize: '25px' }} />
              :
              <FontAwesomeIcon icon={faCircleXmark} style={username === "" ? { color: 'transparent', fontSize: '25px' } : { color: 'crimson', fontSize: '25px' }} />
            }
          </div>
        </div>


        <div className='customDiv'>
          <input
            placeholder='Password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange} />
          <div className='customDivIcon'>
            {password.length > 0 &&
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                style={{ cursor: 'pointer', fontSize: '25px' }}
                onClick={() => setShowPassword(!showPassword)} />
            }
          </div>
        </div>

        <input
          placeholder='PhoneNo'
          name='phoneNumber'
          type='text'
          onChange={handleChange} />

        <select
          name='role'
          onChange={handleChange}>
          <option selected disabled>Select Role</option>
          <option>Complain Responder</option>
          <option>Request Responder</option>
        </select>

        <div>
          <button disabled={submitDisable || !usernameAvailable} type='submit'>
            {formLoading ? <Loading h={25} w={25} /> : 'Create Staff Member'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default addstaff