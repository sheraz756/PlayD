import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { countryList } from '../../utils/countries';
import { Loading } from '../../components/common/Loading';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerUser } from '../../utils/authUser';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
import styles from '../../components/voucherComps/voucher.module.css';

let cancel;

const adduser = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    plan: 'planOne',
    paymentMethod: 'voucher',
    voucher: ''
  })

  const [submitDisable, setSubmitDisable] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const { name, email, password, country, phoneNumber, plan, voucher } = user;
  // if fields empty disable next button
  useEffect(() => {
    const isUser = Object.values({ name, username, email, password, country, phoneNumber, plan, voucher }).every(item => Boolean(item));
    isUser ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [user])

  // input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  }
  // form submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(user, setError, setFormLoading);
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
        setUser(prev => ({ ...prev, username }));
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
  }, [error])

  return (
    <div className='adduser'>
      {showToaster && <SuccessToaster successMsg="User Created Successfully!" />}
      {error && <ErrorToastr error={error} />}
      <h3 className='adduserTitle'>Add user</h3>
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
            autoComplete='off'
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
            autoComplete='off'
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

        {/* <div className={styles.plan__grid__content}>
          <label>
            <input type='radio' name='plan' value='planOne' onChange={handleChange} />
            <span className={user.plan === 'planOne' ? styles.active : ''}>Pack 1</span>
          </label>
          <label>
            <input type='radio' name='plan' value='planTwo' onChange={handleChange} />
            <span className={user.plan === 'planTwo' ? styles.active : ''}>Pack 2</span>
          </label>
          <label>
            <input type='radio' name='plan' value='planThree' onChange={handleChange} />
            <span className={user.plan === 'planThree' ? styles.active : ''}>Pack 3</span>
          </label>
        </div> */}

        <input
          type='text'
          name='voucher'
          placeholder='Enter Voucher Code'
          onChange={handleChange}
          autoComplete='off'
        />

        <select
          name='country'
          onChange={handleChange}>
          <option selected disabled>Select City</option>
          {countryList.map((data, i) => (
            <option>{data}</option>
          ))}
        </select>

        <div>
          <button disabled={submitDisable || !usernameAvailable} type='submit'>
            {formLoading ? <Loading h={25} w={25} /> : 'Create User'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default adduser