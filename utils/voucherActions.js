import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const GoldAxios = axios.create({
    baseURL: `${baseUrl}/voucher/gold`,
    headers: { Authorization: cookie.get('token') }
});

const Axios = axios.create({
    baseURL: `${baseUrl}/voucher`,
    headers: { Authorization: cookie.get('token') }
});

export const createVouchers = async (data, setShowToster, router) => {
    try {
        await Axios.post(`/`, { data });
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}

export const createCustomVoucher = async (customCode, parsedTime, setShowToster, router) => {
    try {
        await GoldAxios.post(`/custom`, { customCode, parsedTime });
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}


export const deleteVoucher = async (id, setShowToster, router) => {
    try {
        await Axios.delete(`/${id}`);
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}


export const createGoldVouchers = async (data, setShowToster, router) => {
    try {
        await GoldAxios.post(`/`, { data });
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}