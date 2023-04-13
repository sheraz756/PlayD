import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/staff`,
    headers: { Authorization: cookie.get('token') }
});

export const updateUser = async (staffData, id, setShowToster, router) => {
    try {
        await Axios.put(`/${id}`, { staffData });
        setShowToster(true);
        router.push('/staff');
    } catch (error) {
        alert(catchErrors(error));
    }
}