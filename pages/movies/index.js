import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import styles from '../../components/largeWidget/large.module.css';
import { DeleteToastr } from '../../components/layout/Toastr';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';
import EndLoader from '../../components/common/EndLoader';
import EndMessage from '../../components/common/EndMessage';
import CardComponent from '../../components/cardcomponenets/CardComponent';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

let cancel;
const Movies = ({ movieData, errorLoading, user: { role } }) => {
    const router = useRouter();
    const [showToaster, setShowToster] = useState(false);
    const [movies, setMovies] = useState(movieData);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    console.log(results)
    const handleChange = async (e) => {
        const { value } = e.target;
        if (value.trim().length === 0) return setSearchText(value);
        setSearchText(value);
        setShowSearchModal(true);
        // setLoading(true);
        try {
            cancel && cancel();
            const CancelToken = axios.CancelToken;
            const token = cookie.get('token');
            const res = await axios.get(`${baseUrl}/search/${searchText}`, {
                headers: { Authorization: token },
                cancelToken: new CancelToken(canceler => {
                    cancel = canceler;
                })
            });
            setResults(res.data);
        } catch (error) {
            console.log('Error Searching');
        }
        // setLoading(false);
    }
    const fetchDataOnScroll = async () => {
        try {
            const res = await axios.get(`${baseUrl}/movie`,

                {
                    headers: { Authorization: cookie.get('token') },
                    params: { pageNumber }
                },
            ); setMovies(res.data)
            // if (res.data.length === 0) setHasMore(false);
            // setMovies(prev => [...prev, ...res.data]);
            // setPageNumber(prev => prev + 1);
        } catch (error) {
            console.log('Error fetching movies');
        }
    }
    if (movies.length === 0 || errorLoading) {
        return (
            <>
                <div className={styles.widgetLarge}>
                    <h2 className={styles.largeTitle}>Currently No Movies....</h2>
                </div>
            </>
        )
    }

    return (
        <div className='adduser'>
            {showToaster && <DeleteToastr />}
            <div className={styles.widgetLarge}>
                <div className={styles.topSection}>
                    <h3 className={styles.largeTitle}>Movies</h3>
                    <div className='search-box'>
                        <button className="btn-search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowSearchModal(false);
                                }, 100)
                            }}
                            autoComplete='off'
                            onChange={handleChange}
                            name='serachText'
                            type="text"
                            className="input-search"
                            placeholder="Search content..." />
                        {showSearchModal &&
                            <div className='resultRendrer'>
                                {/* {loading && <p>Loading..</p>} */}
                                {results < 1 ?
                                    <p style={{ color: 'crimson', padding: '5px' }}>No results with {searchText}</p>
                                    : results.map((item, i) => (
                                        <Link href={item.type === 'movie' ? `/movies/${item._id}` : `/series/${item._id}`}>
                                            <div className='resultsSection' key={i} onClick={() => setSearchText('')}>
                                                <p>{item.title}</p>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        }
                    </div>
                </div>
                <InfiniteScroll
                    style={{ overflow: 'hidden' }}
                    hasMore={hasMore}
                    next={fetchDataOnScroll}
                    // loader={<EndLoader />}
                    endMessage={<EndMessage message={'No More Movies'} />}
                    dataLength={movies.length}
                >
                    <CardComponent data={movies} setShowToster={setShowToster} role={role} router={router} />
                </InfiniteScroll>
            </div>
        </div>
    )
}

export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const res = await axios.get(`${baseUrl}/movie`, { headers: { Authorization: token }, params: { pageNumber: 1 } });
        return { props: { movieData: res.data } };
    } catch (error) {
        return { props: { errorLoading: true } };
    }
};


export default Movies