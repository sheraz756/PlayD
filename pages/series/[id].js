import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { SuccessToaster } from '../../components/layout/Toastr';
import { genreMovies } from '../../utils/genreMovies';
import { updateSeries } from '../../utils/seriesActions';
import AddSeasino from '../../components/seasonComp/AddSeasino';
const { uuid } = require('uuidv4');
const Series = ({ series }) => {
    const [addSeries, setAddSeries] = useState(false);
    const [formValues, setFormValues] = useState([{ episodeName: "", video: "" }]);
    let allEpisodes = [...series.episodes, ...formValues];
    const handleChangeAdd = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }
    const router = useRouter();
    const { id } = router.query;
    const [seriesData, setSeriesData] = useState({
        title: series.title || '',
        description: series.description || '',
        duration: series.duration || '',
        imgLgPoster: series.imgLgPoster || '',
        imgSmPoster: series.imgSmPoster || '',
        genre: series.genre || '',
        trailer: series.trailer || '',
        episodes: allEpisodes,
        year: series.year || ''
    })
    const [showToaster, setShowToaster] = useState(false);
    const { title, description, year, duration, imgSmPoster, imgLgPoster, trailer, episodes } = seriesData;
    const handleChange = e => {
        const { name, value } = e.target;
        setSeriesData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateSeries(seriesData, id, setShowToaster, router);
    }
    return (
        <>
        
            {showToaster && <SuccessToaster successMsg="Updated Successfully!" />}
            <form className='staffForm' onSubmit={handleSubmit}>
                <div className='left'>
                    <img src={series.imgSmPoster} alt={series.title} />
                </div>
                <div className='right'>
                    <div className='formChild'>
                        <h3>Id:</h3>
                        <input value={series._id} disabled />
                    </div>
                    <div className='formChild'>
                        <h3>Title:</h3>
                        <input
                            value={title ? title : series.title}
                            name='title'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Description:</h3>
                        <input
                            value={description ? description : series.description}
                            name='description'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Year:</h3>
                        <input
                            value={year ? year : series.year}
                            name='year'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Duration:</h3>
                        <input
                            value={duration ? duration : series.duration}
                            name='duration'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Img Poster:</h3>
                        <input
                            value={imgLgPoster ? imgLgPoster : series.imgLgPoster}
                            name='imgLgPoster'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Small Poster:</h3>
                        <input
                            value={imgSmPoster ? imgSmPoster : series.imgSmPoster}
                            name='imgSmPoster'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Trailer:</h3>
                        <input
                            value={trailer ? trailer : series.trailer}
                            name='trailer'
                            onChange={handleChange} />
                    </div>
                    {series.episodes.map(e => (
                        <div className='formChild'>
                            <h3>{e.episodeName}:</h3>
                            <input
                                value={episodes ? e.video : ''}
                                name='episodeName'
                                onChange={handleChange} />
                        </div>
                    ))}
                    {addSeries && (
                        <>
                            {formValues.map((element, index) => (
                                <>
                                    <div className='formChild'>
                                        <h3>Episode Name:</h3>
                                        <input
                                            value={element.episodeName || ""}
                                            name='episodeName'
                                            placeholder='ex: S1Episode 1'
                                            onChange={e => handleChangeAdd(index, e)} />
                                    </div>
                                    <div className='formChild'>
                                        <h3>Video :</h3>
                                        <input
                                            value={element.video || ""}
                                            name='video'
                                            placeholder='"https://d31l9z8mg60g9s.cloudfront.net/filename"'
                                            onChange={e => handleChangeAdd(index, e)} />
                                    </div>
                                </>
                            ))}

                        </>
                    )}
                    <button style={addSeries ? {color:'crimson'} : {color:'black'}} type='button' onClick={() => setAddSeries(!addSeries)}>
                    {addSeries ? 'CLOSE' : 'Add Episode'}
                    </button>
                    {/* <AddSeasino formValues={formValues} setFormValues={setFormValues} /> */}

                    <div className='formChild'>
                        <h3>Genre:</h3>
                        <select name="genre" onChange={handleChange}>
                            <option selected>{series.genre}</option>
                            {genreMovies.map((genre) => (
                                <option>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='buttonSection'>
                        <button className='update' disabled={formValues[0].episodeName === "" || formValues[0].video === ""}>
                            Update Series
                        </button>
                        <Link href={'/series'}>
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

Series.getInitialProps = async (ctx) => {
    const { token } = parseCookies(ctx);
    try {
        const res = await axios.get(`${baseUrl}/series/${ctx.query.id}`, { headers: { Authorization: token } });
        const { series } = res.data;
        return { series }
    } catch (error) {
        return { errorLoading: true }
    }
}

export default Series