import React from 'react'
import styles from './cardcomp.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';

import { deleteExploreContent } from '../../utils/exploreActions';

const ShortCardComponent = ({ data, setShowToster, role, router }) => {
    const deleteContent = (_id, setShowToster, router) => {
        if (confirm('Are you sure?')) {
            deleteExploreContent(_id, setShowToster, router)
        }
    }

    return (
        <>
            <div className={styles.cardComponent}>
                {data.map((currElem) => {
                    const { movie, series, _id } = currElem;
                    {/* const { _id, title, description, year, duration, imgSmPoster, genre, type } = movie; */ }

                    if (movie) return (
                        <>
                            <div className={styles.cardParent}>
                                <div className={styles.card}
                                    style={{ backgroundImage: `url(${movie.imgSmPoster})` }}
                                >
                                    <div className={styles.card__delete}>
                                        {role === 'admin' &&
                                            <button
                                                onClick={() => deleteContent(_id, setShowToster, router)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>}
                                    </div>
                                </div>
                                <div className={styles.card__title}>
                                    <h4>{CapitilizeFirstLetter(movie.title.substring(0, 8))}...</h4>
                                </div>
                            </div>

                        </>
                    )
                    else return (
                        <>
                            <div className={styles.cardParent}>
                                <div className={styles.card}
                                    style={{ backgroundImage: `url(${series.imgSmPoster})` }}
                                >
                                    <div className={styles.card__delete}>
                                        {role === 'admin' &&
                                            <button
                                                onClick={() => deleteContent(_id, setShowToster, router)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>}
                                    </div>
                                </div>
                                <div className={styles.card__title}>
                                    <h4>{CapitilizeFirstLetter(series.title.substring(0, 8))}...</h4>
                                </div>
                            </div>

                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ShortCardComponent