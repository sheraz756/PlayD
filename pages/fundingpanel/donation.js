import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import { Loading } from '../../components/common/Loading';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import baseUrl from '../../utils/baseUrl';
import { createFundingPost } from '../../utils/fundingActions';

const Donation = () => {
    const router = useRouter();
    useEffect(() => {
        error && setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error]);
    useEffect(() => {
        uploaded && setTimeout(() => {
            setUploaded(false);
        }, 2000);
    }, [uploaded]);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ammount, setAmmount] = useState('')
    const [img, setImg] = useState(null)
    const [submitDisable, setSubmitDisable] = useState(true);
    const [uploaded, setUploaded] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showToaster, setShowToaster] = useState(false);


    const submitHandler = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('img', img);
        data.append('title', title);
        data.append('description', description);
        data.append('ammount', ammount);
        setFormLoading(true);
        await axios.post(`${baseUrl}/funding`, data).then((res) => {
            setShowToaster(true);
            router.reload();
        }).catch((err) => console.log(err));
        setFormLoading(false);
    }
    const checkDonationData = {
        title, description, ammount, img
    }
    useEffect(() => {
        const isPost = Object.values({ title, description, ammount, img }).every(item => Boolean(item));
        isPost ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [checkDonationData])
    return (
        <div className='adduser'>
            {showToaster && <SuccessToaster successMsg="Created Successfully!" />}
            {uploaded && <SuccessToaster successMsg="Image Upload" />}
            {error && <ErrorToastr error={error} />}
            <h3 className='adduserTitle'>Create Donation Post</h3>
            <form className='formControl'>
                <div className="addProductItem">
                    <label>Image</label>
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
                    placeholder='Ammount'
                    name='ammount'
                    type='text'
                    onChange={(e) => setAmmount(e.target.value)} />

                <textarea
                    cols={30}
                    rows={10}
                    draggable={false}
                    name="description"
                    placeholder='Enter Description Here'
                    onChange={(e) => setDescription(e.target.value)}></textarea>

                <div>
                    <button onClick={submitHandler} disabled={submitDisable}>
                        {formLoading ? <Loading h={25} w={25} /> : 'Create Donation Post'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Donation