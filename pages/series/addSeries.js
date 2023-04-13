import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr'
import AddSeasino from '../../components/seasonComp/AddSeasino';
import baseUrl from '../../utils/baseUrl';
import { genreMovies } from '../../utils/genreMovies';
import { useRouter } from 'next/router';
import catchErrors from '../../utils/catchErrors';
import { Loading } from '../../components/common/Loading';

const AddSeries = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState([{ episodeName: "", video: "" }]);
    console.log(formValues);
    const { episodeName, video } = formValues;
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [trailer, setTrailer] = useState('');
    const [title, setTilte] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [duration, setDuration] = useState('');
    const [submitDisable, setSubmitDisable] = useState(true);
    const [showToaster, setShowToaster] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState(null);
    const checkData = {
        img, imgTitle, title, description, year, genre, duration, trailer
    }
    useEffect(() => {
        formValues.map((current) => {
            const { episodeName, video } = current;
            const isSeries = Object.values({ img, imgTitle, title, description, year, genre, duration, trailer, episodeName, video }).every(item => Boolean(item));
            isSeries ? setSubmitDisable(false) : setSubmitDisable(true);
        })
    }, [checkData]);
    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 3000);
    }, [error])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append('img', img);
        formData.append('imgTitle', imgTitle);
        formData.append('trailer', trailer);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('year', year);
        formData.append('genre', genre);
        formData.append('duration', duration);
        formData.append('episode', JSON.stringify(formValues));
        setFormLoading(true);
        await axios.post(`${baseUrl}/series`, formData).then((res) => {
            setShowToaster(true);
            router.reload();
        }).catch((err) => {
            const errorMsg = catchErrors(err);
            setError(errorMsg);
        }).finally(() => setFormLoading(false));
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Create New Series</h1>
            <form className="addProductForm">
                {error && <ErrorToastr error={error} />}
                {showToaster && <SuccessToaster successMsg="Series Created Successfully!" />}
                <div className='movieUploadSection'>
                    <div className="addProductItem">
                        <label>Large Poster</label>
                        <input
                            type="file"
                            name="img"
                            accept='image/*'
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Small Poster</label>
                        <input
                            type="file"
                            id="imgTitle"
                            name="imgTitle"
                            accept='image/*'
                            onChange={(e) => setImgTitle(e.target.files[0])}
                        />
                    </div>
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="ex: John Wick"
                        name="title"
                        autoComplete='off'
                        onChange={(e) => setTilte(e.target.value)}
                    />
                </div>
                <AddSeasino formValues={formValues} setFormValues={setFormValues} />
                <div className="addProductItem">
                    <label>(Trailer) add this url before file https://d31l9z8mg60g9s.cloudfront.net/</label>
                    <input
                        type="text"
                        placeholder="https://d31l9z8mg60g9s.cloudfront.net/filename"
                        name="trailer"
                        autoComplete='off'
                        onChange={(e) => setTrailer(e.target.value)}
                    />
                </div>

                <div className="addProductItem">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="description"
                        name="description"
                        autoComplete='off'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="addProductItem">
                    <label>Year</label>
                    <input
                        type="text"
                        placeholder="Year"
                        name="year"
                        autoComplete='off'
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div className="addProductItem">
                    <label>Duration</label>
                    <input
                        type="text"
                        placeholder="Duration"
                        name="duration"
                        autoComplete='off'
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <select name="genre" onChange={(e) => setGenre(e.target.value)}>
                        <option selected disabled>Select Genre</option>
                        {genreMovies.map((genre) => (
                            <option>{genre}</option>
                        ))}
                    </select>
                </div>

                <button className="addProductButton" onClick={handleSubmit} disabled={submitDisable}>
                    {formLoading ? <Loading h={25} w={25} /> : 'Create/Upload'}
                </button>
            </form>
        </div>
    )
}

export default AddSeries