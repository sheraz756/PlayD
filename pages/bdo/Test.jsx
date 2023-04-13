import React,{useEffect,useState} from 'react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl';
const Test = ({item}) => {
    const BdoId = item;
    const [userapi1, setUserApi1] = useState([]);
    const getUser1 = async () => {
        const res = await axios.post(`${baseUrl}/signup/getBdo/Id`,{BdoId})
        setUserApi1(res.data.users);
    }

    useEffect(() => {
        getUser1();
    }, [])

    const BdoLen = userapi1.length
  return (
    <div>{BdoLen}</div>
  )
}

export default Test