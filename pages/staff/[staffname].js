import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { updateUser } from '../../utils/staffActions';
import { SuccessToaster } from '../../components/layout/Toastr';
import ChangePassword from '../../components/profile/ChangePassword';
import cookie from 'js-cookie';

const StaffName = ({ staff, user }) => {
    const router = useRouter();
    const { staffname } = router.query;
    const [changePassword, setChangePassword] = useState(false);

    const [staffData, setStaffData] = useState({
        name: staff.name || '',
        email: staff.email || '',
        phoneNumber: staff.phoneNumber || '',
        role: staff.role || ''
    })
    const [showToaster, setShowToaster] = useState(false);
    const [passwordToaster, setShowPasswordToaster] = useState(false);
    const { name, email, phoneNumber } = staffData;
    const handleChange = e => {
        const { name, value } = e.target;
        setStaffData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(staffData, staffname, setShowToaster, router);
    }
    useEffect(() => {
        showToaster && setTimeout(() => {
            setShowToaster(false);
        }, 3000);
    }, [showToaster])
    useEffect(() => {
        passwordToaster && setTimeout(() => {
            setShowPasswordToaster(false);
        }, 3000);
    }, [passwordToaster])

    return (
        <>
            {showToaster && <SuccessToaster successMsg="Staff Updated Successfully!" />}
            {passwordToaster && <SuccessToaster successMsg="Password Changed Successfully!" />}
            <form className='staffForm' onSubmit={handleSubmit}>
                <div className='left'>
                    <img src={staff.profilePicture} alt={staff.name} />
                    <button type='button' onClick={() => setChangePassword(!changePassword)}>
                        Change Password
                    </button>
                </div>
                <div className='right'>
                    <div className='formChild'>
                        <h3>Id:</h3>
                        <input value={staff._id} disabled />
                    </div>
                    <div className='formChild'>
                        <h3>Username:</h3>
                        <input value={staff.username} disabled />
                    </div>
                    <div className='formChild'>
                        <h3>Name:</h3>
                        <input
                            value={name ? name : staff.name}
                            name='name'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Email:</h3>
                        <input
                            value={email ? email : staff.email}
                            name='email'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Phone No:</h3>
                        <input
                            value={phoneNumber ? phoneNumber : staff.phoneNumber}
                            name='phoneNumber'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Role:</h3>
                        <select
                            className='updateStaffSelect'
                            name='role'
                            onChange={handleChange}>
                            <option selected={staff.role === 'complain responder'}>complain responder</option>
                            <option selected={staff.role === 'request responder'}>request responder</option>
                        </select>
                    </div>
                    <div className='buttonSection'>
                        <button className='update'>
                            Update User
                        </button>
                        <Link href={'/staff'}>
                            <button className='cancel'>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </form>

            {changePassword &&
                <ChangePassword
                    setChangePassword={setChangePassword}
                    staff={staff}
                    setShowPasswordToaster={setShowPasswordToaster}
                />
            }
        </>
    )
}


StaffName.getInitialProps = async (ctx) => {
    const { token } = parseCookies(ctx);
    try {
        const res = await axios.get(`${baseUrl}/staff/${ctx.query.staffname}`, { headers: { Authorization: token } });
        const { staff } = res.data;
        return { staff }
    } catch (error) {
        return { errorLoading: true }
    }
}


export default StaffName