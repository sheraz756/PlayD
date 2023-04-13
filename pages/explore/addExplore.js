import React, { useState, useEffect } from 'react'
import { createExploreContent } from '../../utils/exploreActions';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import { useRouter } from 'next/router';
const AddExplore = () => {
    const router = useRouter();
    const [data, setData] = useState({
        nameTxt: '',
        shortVideo: ''
    });
    const [error, setError] = useState(null);
    const [showToaster, setShowToaster] = useState(false);
    const { nameTxt, shortVideo } = data;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createExploreContent(data, setError, setShowToaster, router);
    }

    useEffect(() => {
        error && setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error]);

    return (
        <>
            {showToaster && <SuccessToaster successMsg="Short Created Successfully!" />}
            {error && <ErrorToastr error={error} />}
            <div className='adduser'>
                <h3 className='adduserTitle'>Add Short Video</h3>
                <form
                    className='formControl'
                    onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='nameTxt'
                        placeholder='Enter Movie/Series name'
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='shortVideo'
                        placeholder='Video Link Here'
                        onChange={handleChange}
                    />

                    <button
                        disabled={nameTxt === "" && shortVideo === ""}
                    >
                        Create Short Video
                    </button>
                </form>

            </div>
        </>
    )
}

export default AddExplore