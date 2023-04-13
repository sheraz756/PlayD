import Chart from "../components/chart/Chart";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import { userData } from '../utils/dummyData';
import LargeWidget from '../components/largeWidget/LargeWidget';
import SmallWidget from "../components/smallWidget/SmallWidget";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import FeedBack from "../components/conditionalComp/FeedBack";
import Request from "../components/conditionalComp/Request";
import { useEffect, useMemo, useState } from "react";
import BarChartUser from "../components/chart/BarChartUser";
import CityBarChart from "../components/chart/CityBarChart";

export default function Home({ users, user: { role } }) {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  const [usersByCity, setUsersByCity] = useState([]);
  const [oldNewUsers, setOldNewUsers] = useState([]);

  useEffect(() => {
    const getUsersByCityes = async () => {
      const res = await axios.get(`${baseUrl}/auth/userbycity`);
      setUsersByCity(res.data);
    }
    getUsersByCityes()
  }, [])


  useEffect(() => {
    const getOldNewUsers = async () => {
      const res = await axios.get(`${baseUrl}/users/stats`);
      setOldNewUsers(res.data);
    }
    getOldNewUsers()
  }, [])

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/userstats`);
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Users": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);





  return (
    <>
      {role === 'complain responder' && <FeedBack />}
      {role === 'request responder' && <Request />}
      {role === 'admin' &&
        <>
          <FeaturedInfo users={users} />
          <Chart data={userStats} title='User Analytics' dataKey='Users' grid />
          <CityBarChart title="Users By Cities" data={usersByCity} dataKey='totalUsers' />
          <div className="homeWidgets">
            <LargeWidget />
            <BarChartUser data={oldNewUsers} dataKey='Users' />
          </div>
        </>
      }
    </>
  )
}




export const getServerSideProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/users`, { headers: { Authorization: token } });
    const { users } = res.data;
    return { props: { users } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};