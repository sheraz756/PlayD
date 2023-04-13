import React, { useEffect, useState } from 'react';
import styles from './featured.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHouse, faCaretDown, faUsers, faUserPlus, faPersonCane, faRulerVertical, faClipboardQuestion, faClapperboard, faPlus, faBarsStaggered, faSolarPanel, faCodeCommit, faCreditCard, faGifts, faTrophy, faRectangleAd, faFaceGrinWink, faTv, faTvAlt, faAd, faGolfBall, faHandHoldingDollar, faDollar, faReceipt, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import FeaturedCard from './FeaturedCard';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';

const FeaturedInfo = ({ users }) => {
  const [movies, setMovies] = useState(0);
  const [series, setSeries] = useState([]);
  const [ad, setAd] = useState(0);
  const [goldVouchers, setGoldVouchers] = useState(0);
  const [stanVouchers, setStanVouchers] = useState(0);
  const [giveaway, setGiveaway] = useState(0);
  const [donation, setDonation] = useState(0);
  const [complain, setComplain] = useState(0);
  const [request, setRequest] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const [card, setCard] = useState(0);
  const [freetrail, setfreetrail] = useState([]);
  const [users1, setUsers1] = useState([])
  const [pageNumber, setPageNumber] = useState(2);
  useEffect(() => {
    const freeUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users/category/free`);
        setfreetrail(res.data);
        console.log(res.data)
      }
      catch (error) {
        console.log(error);
      }
    }
    freeUsers()
  }, [])
  const len = freetrail.length;
  useEffect(() => {
    const fetchDataOnScroll = async () => {
      try {
        const res = await axios.get(`${baseUrl}/series`, {
          headers: { Authorization: cookie.get('token') },
          params: { pageNumber }
        });
        setSeries(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataOnScroll()
  }, [])
  const mylen = series.length;
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/signup/getuser/list`)
        setUsers1(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllUsers()
  }, [])

  const myArr = users1.length;

  useEffect(() => {
    const getDashboardStats = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/dashboardstats`);
        const { movies, ad, goldVouchers, standardVouchers, giveaways, fundings, complainResponder, requestResponder, paymentMethodVoucher, paymentMethodCard } = res.data;
        setMovies(movies);
        // setSeries(series);
        setAd(ad);
        setGoldVouchers(goldVouchers);
        setStanVouchers(standardVouchers);
        setGiveaway(giveaways);
        setDonation(fundings);
        setComplain(complainResponder);
        setRequest(requestResponder);
        setVoucher(paymentMethodVoucher);
        setCard(paymentMethodCard)
      } catch (err) {
        console.log(err);
      }
    };
    getDashboardStats();
  }, []);

  return (
    <div className={styles.featured}>
      <FeaturedCard
        Title='Total Number of Streamers'
        Icon={<FontAwesomeIcon icon={faBell} color={'white'} />}
        ammount={users.length}
        link={'/users'}
        subTitle='Playeon total users'
      />
      <FeaturedCard
        Title='Total Movies'
        Icon={<FontAwesomeIcon icon={faClapperboard} color={'white'} />}
        ammount={movies}
        link={'/movies'}
        subTitle='Movies'
      />
      <FeaturedCard
        Title='Total Series'
        Icon={<FontAwesomeIcon icon={faTvAlt} color={'white'} />}
        ammount={mylen}
        link={'/series'}
        subTitle='Series'
      />
      <FeaturedCard
        Title='Total Advertisment'
        Icon={<FontAwesomeIcon icon={faAd} color={'white'} />}
        ammount={ad}
        link={'/advertisment'}
        subTitle='Advertisment'
      />
      <FeaturedCard
        Title='Total Gold Vouchers'
        Icon={<FontAwesomeIcon icon={faReceipt} color={'white'} />}
        ammount={goldVouchers}
        link={'/voucher/goldvoucher'}
        subTitle='Gold'
      />
      <FeaturedCard
        Title='Total Standard Vouchers'
        Icon={<FontAwesomeIcon icon={faReceipt} color={'white'} />}
        ammount={stanVouchers}
        link={'/voucher'}
        subTitle='Standard'
      />
      <FeaturedCard
        Title='Total Giveaways'
        Icon={<FontAwesomeIcon icon={faGifts} color={'white'} />}
        ammount={giveaway}
        link={'/giveaway/giveawaywinners'}
        subTitle='Giveaway'
      />
      <FeaturedCard
        Title='Total Donation Post'
        Icon={<FontAwesomeIcon icon={faHandHoldingDollar} color={'white'} />}
        ammount={donation}
        link={'/fundingpanel'}
        subTitle='Donation'
      />
      <FeaturedCard
        Title='Total Users With CardPayment'
        Icon={<FontAwesomeIcon icon={faDollar} color={'white'} />}
        ammount={card}
        link={'/'}
        subTitle='Card'
      />
      <FeaturedCard
        Title='Total Users With Voucher'
        Icon={<FontAwesomeIcon icon={faReceipt} color={'white'} />}
        ammount={voucher}
        link={'/'}
        subTitle='Voucher'
      />
      <FeaturedCard
        Title='Total Request Responder'
        Icon={<FontAwesomeIcon icon={faUsers} color={'white'} />}
        ammount={request}
        link={'/'}
        subTitle='Request'
      />
      <FeaturedCard
        Title='Total Complain Responder'
        Icon={<FontAwesomeIcon icon={faUsers} color={'white'} />}
        ammount={complain}
        link={'/'}
        subTitle='Complain'
      />
      <FeaturedCard
        Title='Total Live View'
        Icon={<FontAwesomeIcon icon={faEye} myArr={myArr} color={'white'} />}
        ammount={myArr}
        link={'/currentuser'}
        subTitle='Number of Live Steamers'
      />
      <FeaturedCard
        Title='Total Free Trail Users'
        Icon={<FontAwesomeIcon icon={faUser} color={'white'} />}
        ammount={len}
        link={'/freetrailuser'}
        subTitle='Total Free Trail Users'
      />
      <FeaturedCard
        Title='Total Hollywood Movies'
        Icon={<FontAwesomeIcon icon={faClapperboard} color={'white'} />}
        ammount={complain}
        link={'/'}
        subTitle='Total Hollywood Movies'
      />
      <FeaturedCard
        Title='Total Bollywood Movies'
        Icon={<FontAwesomeIcon icon={faClapperboard} color={'white'} />}
        ammount={complain}
        link={'/'}
        subTitle='Total Bollywood Movies'
      />
    </div>
  )
}
export default FeaturedInfo