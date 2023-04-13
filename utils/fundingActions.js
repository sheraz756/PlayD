import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';



const Axios = axios.create({
    baseURL: `${baseUrl}/funding`,
    headers: { Authorization: cookie.get('token') }
});



export const createFundingPost = async (donation, setError, router, setFormLoading, setShowToster) => {
    setFormLoading(true);
    try {
        await Axios.post('/', { donation });
        setShowToster(true);
        router.reload();
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}


export const updateFundingPost = async (donationData, id, setShowToster, router) => {
    try {
        await Axios.put(`/${id}`, { donationData });
        setShowToster(true);
        router.push('/fundingpanel');
    } catch (error) {
        alert(catchErrors(error));
    }
}



export const deletePost = async (id, setShowToster, router) => {
    try {
        await Axios.delete(`/${id}`);
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}
