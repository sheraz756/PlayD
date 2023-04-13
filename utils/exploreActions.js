import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';


const Axios = axios.create({
    baseURL: `${baseUrl}/explore`,
    headers: { Authorization: cookie.get('token') }
});




export const createExploreContent = async (data, setError, setShowToaster, router) => {
    try {
        await Axios.post(`/`, { data });
        setShowToaster(true);
        router.reload();
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
}



export const deleteExploreContent = async (id, setShowToster, router) => {
    try {
        await Axios.delete(`/${id}`);
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}