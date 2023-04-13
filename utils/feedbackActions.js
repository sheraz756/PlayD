import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/feedback`,
    headers: { Authorization: cookie.get('token') }
});



export const deleteFeedBack = async (id, setShowToster, router) => {
    try {
        await Axios.delete(`/${id}`);
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}

export const feedbackFullFilled = async (_id, setShowToster, router) => {
    try {
        await Axios.post(`/fullfilled`, { _id });
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}