import Link from 'next/link';
import React from 'react'
import styles from './featured.module.css';


const FeaturedCard = ({ Title, subTitle, ammount, Icon, link }) => {
    return (
        <Link href={link}>
            <div className={styles.featuredItem}>
                <span className={styles.featuredTitle}>{Title}</span>
                <div className={styles.featuredMoneyContainer}>
                    <span className={styles.featuredMoney}>{ammount}</span>
                    <span className={styles.featuredMoneyRate}>
                        {Icon}
                    </span>
                </div>
                <span className={styles.featuredSub}>{subTitle}</span>
            </div>
        </Link>
    )
}

export default FeaturedCard