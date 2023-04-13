import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { createMovie } from '../../utils/movieActions';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import { Loading } from '../../components/common/Loading';
import { useRouter } from 'next/router';
import { genre } from '../../utils/genreMovies';
import catchErrors from '../../utils/catchErrors';


const AddMovie = ({ movieGenre }) => {

  const handleGenreSelection = (event) => {
    const selectedOption = event.target.value;
    if (!selectedGenres.includes(selectedOption)) {
      setSelectedGenres([...selectedGenres, selectedOption]);
    }
    console.log(selectedOption)
  };

  const handleGenreDeletion = (genre) => {
    const updatedGenres = selectedGenres.filter((selectedGenre) => selectedGenre !== genre);
    setSelectedGenres(updatedGenres);
  };

  const router = useRouter();
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [subtitle, setSubTitle] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [video, setVideo] = useState('');
  const [pixels, setpixels] = useState('');
  const [title, setTilte] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [duration, setDuration] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  const [showToaster, setShowToaster] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  console.log(selectedGenres);

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
    formData.append('subtitle', subtitle);
    formData.append('trailer', trailer);
    formData.append('video', video);
    formData.append('pixel', pixels);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('year', year);
    formData.append('genre', selectedGenres);
    // formData.append('selectedGenres', selectedGenres);
    formData.append('duration', duration);
    setFormLoading(true);
    await axios.post(`${baseUrl}/movie`, formData).then((res) => {
      console.log(res.data);
      setShowToaster(true);
      router.reload();
    }).catch((err) => {
      const errorMsg = catchErrors(err);
      setError(errorMsg);
    }).finally(() => setFormLoading(false));

  };
  const checkMovieData = {
    img, imgTitle, title, description, year, genre, duration, trailer, video, pixels
  }
  useEffect(() => {
    const isMovie = Object.values({ img, imgTitle, title, description, year, genre, duration, trailer, video, pixels,  }).every(item => Boolean(item));
    isMovie ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [checkMovieData]);


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Create New Movie</h1>
      <form className="addProductForm">
        {error && <ErrorToastr error={error} />}
        {showToaster && <SuccessToaster successMsg="Movie Created Successfully!" />}
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
          <div className="addProductItem">
            <label>Subtitle file</label>
            <input
              type="file"
              id="imgTitle"
              name="subtitle"
              accept='.vtt,.srt,.txt'
              onChange={(e) => setSubTitle(e.target.files[0])}
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
        <div className="addProductItem">
          <label>Video Link add this url before file https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://xyx.com"
            autoComplete='off'
            name="video"
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Trailer add this url before file https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://d31l9z8mg60g9s.cloudfront.net/filename"
            name="trailer"
            autoComplete='off'

            onChange={(e) => setTrailer(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>480p https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://d31l9z8mg60g9s.cloudfront.net/filename"
            name="video480"
            autoComplete='off'

            onChange={(e) => setpixels(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>720p https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://d31l9z8mg60g9s.cloudfront.net/filename"
            name="video720"
            autoComplete='off'

            onChange={(e) => setpixels(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>1080p https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://d31l9z8mg60g9s.cloudfront.net/filename"
            name="video1080"
            autoComplete='off'

            onChange={(e) => setpixels(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            autoComplete='off'
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            autoComplete='off'
            name="year"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            autoComplete='off'
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="genres">genres</label>
          <select name="genre" onChange={handleGenreSelection}>
            <option selected disabled>Select Genre</option>
            {genre.map((genre) => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
          <div className="selected-genres" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedGenres.map((genre) => (
              <div key={genre} className="selected-genre">
                <span style={{ marginRight: '5px' }}>{genre}</span>
                <button className="delete-button" style={{ backgroundColor: 'transparent', border: 'none', color: '#ff0000', cursor: 'pointer', marginLeft: '5px' }} onClick={() => handleGenreDeletion(genre)}>
                  <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#ff0000", }} />
                </button>
              </div>
            ))}
          </div>
        </div>


        <button className="addProductButton" onClick={handleSubmit} disabled={submitDisable}>
          {formLoading ? <Loading h={25} w={25} /> : 'Create/Upload'}
        </button>
      </form>
    </div>
  )
}


export default AddMovie;



