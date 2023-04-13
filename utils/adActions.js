import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/ad`,
    headers: { Authorization: cookie.get('token') }
});

export const createAd = async (adData, setShowToster, router) => {
    try {
        await Axios.post(`/`, { adData });
        setShowToster(true);
        router.reload();
    } catch (error) {
        catchErrors(error);
    }
}