import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { SuccessToaster } from '../../components/layout/Toastr';
import { updateFundingPost } from '../../utils/fundingActions';


const FundingPostId = ({ donation }) => {
    const router = useRouter();
    const { id } = router.query;
    const [donationData, setdonationData] = useState({
        title: donation.title || '',
        description: donation.description || '',
        ammount: donation.ammount || '',
        img: donation.img || ''
    })
    const [showToaster, setShowToaster] = useState(false);
    const { title, description, ammount, img } = donationData;
    const handleChange = e => {
        const { name, value } = e.target;
        setdonationData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateFundingPost(donationData, id, setShowToaster, router);
    }
    return (
        <>
            {showToaster && <SuccessToaster successMsg="Updated Successfully!" />}
            <form className='staffForm' onSubmit={handleSubmit}>
                <div className='left'>
                    <img src={donation.img} alt={donation.title} />
                </div>
                <div className='right'>
                    <div className='formChild'>
                        <h3>Id:</h3>
                        <input value={donation._id} disabled />
                    </div>
                    <div className='formChild'>
                        <h3>Title:</h3>
                        <input
                            value={title ? title : donation.title}
                            name='title'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Image:</h3>
                        <input
                            value={img ? img : donation.img}
                            name='img'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Ammount:</h3>
                        <input
                            value={ammount ? ammount : donation.ammount}
                            name='ammount'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Description:</h3>
                        <textarea
                            value={description ? description : donation.description}
                            cols={30}
                            rows={10}
                            draggable={false}
                            name="description"
                            onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className='buttonSection'>
                        <button className='update'>
                            Update Post
                        </button>
                        <Link href={'/funding'}>
                            <button className='cancel'>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </>
    )
}


FundingPostId.getInitialProps = async (ctx) => {
    const { token } = parseCookies(ctx);
    try {
        const res = await axios.get(`${baseUrl}/funding/${ctx.query.id}`, { headers: { Authorization: token } });
        const { donation } = res.data;
        return { donation }
    } catch (error) {
        return { errorLoading: true }
    }
}

export default FundingPostId