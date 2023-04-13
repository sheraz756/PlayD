import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Loading } from '../../components/common/Loading';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import baseUrl from '../../utils/baseUrl';
import { createGiveaway } from '../../utils/giveawayActions';

const Giveaway = () => {
    const router = useRouter();
    const [title, setTitle] = useState('')
    const [img, setImg] = useState(null)
    const [submitDisable, setSubmitDisable] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showToaster, setShowToaster] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('img', img);
        data.append('title', title);
        setFormLoading(true);
        await axios.post(`${baseUrl}/giveaway`, data).then((res) => {
            setShowToaster(true);
            router.reload();
        }).catch((err) => console.log(err));
        setFormLoading(false);
    }
    const giveaway = {
        title, img
    }
    useEffect(() => {
        const isGiveaway = Object.values({ title, img }).every(item => Boolean(item));
        isGiveaway ? setSubmitDisable(false) : setSubmitDisable(true);
    }, [giveaway])
    return (
        <div className='adduser'>
            {showToaster && <SuccessToaster successMsg="Created Successfully!" />}
            {error && <ErrorToastr error={error} />}
            <h3 className='adduserTitle'>Create Giveaway</h3>
            <form className='formControl'>
                <div className="addProductItem">
                    <label>Add Giveaway Poster</label>
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

                <div>
                    <button onClick={submitHandler} disabled={submitDisable}>
                        {formLoading ? <Loading h={25} w={25} /> : 'Create Giveaway Post'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Giveaway