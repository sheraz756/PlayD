import React from 'react';
import styles from './giveaway.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CapitilizeFirstLetter } from '../../utils/utilityFunctions';
import Link from 'next/link';
import { deleteGiveaway } from '../../utils/giveawayActions';

const GridGiveaway = ({ giveaway, router, setShowToster, role }) => {
    return (
        <div className={styles.giveaway}>
            {giveaway.map((currElem) => {
                const { _id, title, poster, participants, createdAt } = currElem;
                return (
                    <>

                        <div className={styles.giveaway__grid} key={_id}>
                            <div className={styles.giveaway__delete}>
                                <p>CreatedAt: {createdAt.substring(0, 10)}</p>
                                {role === 'admin' &&
                                    <button onClick={() => deleteGiveaway(_id, setShowToster, router)}>
                                        <FontAwesomeIcon icon={faTrash} style={{ color: 'crimson' }} />
                                    </button>}
                            </div>
                            <Link href={`/giveaway/${_id}`}>
                                <div className={styles.giveaway__poster}>
                                    <img src={poster} alt={title} />
                                </div>
                            </Link>
                            <div className={styles.giveaway__title}>
                                <h3>{CapitilizeFirstLetter(title)}</h3>
                                <span>Participants: {participants.length}</span>
                            </div>

                        </div>

                    </>
                )
            })}
        </div>
    )
}

export default GridGiveaway