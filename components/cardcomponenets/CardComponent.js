import React from 'react'
import styles from './cardcomp.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import { deleteMovie } from '../../utils/movieActions';
import { deleteSeries } from '../../utils/seriesActions';
const CardComponent = ({ data, setShowToster, role, router }) => {

    const deleteS = (_id, setShowToster, router) => {
        if (confirm('Are you sure?')) {
            deleteSeries(_id, setShowToster, router)
        }
    }

    const deleteM = (_id, setShowToster, router) => {
        if (confirm('Are you sure?')) {
            deleteMovie(_id, setShowToster, router)
        }
    }

    return (
        <>
            <div className={styles.cardComponent}>
                {data.map((currElem) => {
                    const { _id, title, description, year, duration, imgSmPoster, genre, type } = currElem;
                    return (
                        <>
                            <div className={styles.cardParent}>
                                <div className={styles.card}
                                    style={{ backgroundImage: `url(${imgSmPoster})` }}
                                >
                                    <div className={styles.card__delete}>
                                        {role === 'admin' &&
                                            <button onClick={type === "movie" ?
                                                () => deleteM(_id, setShowToster, router) :
                                                () => deleteS(_id, setShowToster, router)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>}
                                    </div>
                                </div>
                                <Link href={type === 'movie' ? `/movies/${_id}` : `/series/${_id}`}>
                                    <div className={styles.card__title}>
                                        <h4>{CapitilizeFirstLetter(title.substring(0,8))}...</h4>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default CardComponent