import axios from "axios";
import baseUrl from "./baseUrl";
import cookie from "js-cookie";
import catchErrors from '../utils/catchErrors';


// const errorMsg = catchErrors(error);
// setError(errorMsg);


const Axios = axios.create({
    baseURL: `${baseUrl}/movie`,
    headers: { Authorization: cookie.get('token') }
});


export const createMovie = async (movie, setError, router, setFormLoading, setShowToster) => {
    setFormLoading(true);
    try {
        await Axios.post('/', { movie });
        setShowToster(true);
        router.reload();
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}


export const updateMovie = async (movieData, id, setShowToster, router) => {
    try {
        await Axios.put(`/${id}`, { movieData });
        setShowToster(true);
        router.push('/movies');
    } catch (error) {
        alert(catchErrors(error));
    }
}



export const deleteMovie = async (id, setShowToster, router) => {
    try {
        await Axios.delete(`/${id}`);
        setShowToster(true);
        router.reload();
    } catch (error) {
        alert(catchErrors(error));
    }
}















