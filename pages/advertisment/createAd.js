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
import { createAd } from '../../utils/adActions';
import catchErrors from '../../utils/catchErrors';

const CreateAd = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [img, setImg] = useState(null);
    const [time, setTime] = useState(0);
    const [submitDisable, setSubmitDisable] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showToaster, setShowToaster] = useState(false);
    // input handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdData(prev => ({ ...prev, [name]: value }));
    }
    // form submit handler
    const submitHandler = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('img', img);
        data.append('title', title);
        data.append('link', link);
        data.append('time', time);
        setFormLoading(true);
        await axios.post(`${baseUrl}/ad`, data).then((res) => {
            setShowToaster(true);
            router.reload();
        }).catch((err) => {
            const errorMsg = catchErrors(err);
            setError(errorMsg);
        });
        setFormLoading(false);
    }
    const adData = {
        link, title, img, time
    }
    useEffect(() => {
        const isAd = Object.values({ link, title, img, time }).every(item => Boolean(item));
        isAd ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [adData])

    useEffect(() => {
        error && setTimeout(() => {
          setError(null);
        }, 3000);
      }, [error])

    return (
        <div className='adduser'>
            {showToaster && <SuccessToaster successMsg="Created Successfully!" />}
            {error && <ErrorToastr error={error} />}
            <h3 className='adduserTitle'>Add Advertisment</h3>
            <form className='formControl'>
                <div className="addProductItem">
                    <label>Add Image must be (200 px width X 300 px height)</label>
                    <input
                        type="file"
                        name="img"
                        accept='image/*'
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>
                <input
                    placeholder='Title'
                    name='title'
                    type='text'
                    onChange={(e) => setTitle(e.target.value)} />
                <input
                    placeholder='Target Link'
                    name='link'
                    type='text'
                    onChange={(e) => setLink(e.target.value)} />

                <input
                    placeholder='Enter time in seconds'
                    name='time'
                    type='number'
                    onChange={(e) => setTime(e.target.value)} />

                <div>
                    <button onClick={submitHandler} disabled={submitDisable}>
                        {formLoading ? <Loading h={25} w={25} /> : 'Create Advertisment'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default CreateAd