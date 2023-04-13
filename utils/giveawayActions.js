import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';

const Axios = axios.create({
    baseURL: `${baseUrl}/giveaway`,
    headers: { Authorization: cookie.get('token') }
});

export const createGiveaway = async (giveaway, setShowToster, router) => {
    try {
        await Axios.post(`/`, { giveaway });
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}


export const deleteGiveaway = async (id, setShowToster, router) => {
    try {
        await Axios.delete(`/${id}`);
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}


