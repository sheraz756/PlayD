import baseUrl from './baseUrl';
import Router from 'next/router';
import catchErrors from './catchErrors';
import axios from "axios";
import cookie from 'js-cookie';



export const registerUser = async (user, setError, setFormLoading) => {
    setFormLoading(true);
    try {
        await axios.post(`${baseUrl}/signup/register`, { user });
        Router.push('/');
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}

export const registerStaff = async (staff, setError, setFormLoading) => {
    setFormLoading(true);
    try {
        await axios.post(`${baseUrl}/staff`, { staff });
        Router.push('/');
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}

export const loginUser = async (user, setError, setFormLoading) => {
    setFormLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/auth`, { user });
        setToken(res.data);
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}

export const loginAdmin = async (user, setError, setFormLoading) => {
    setFormLoading(true);
    try {
        const res = await axios.post(`${baseUrl}/auth/adminLogin`, { user });
        setToken(res.data);
    } catch (error) {
        const errorMsg = catchErrors(error);
        setError(errorMsg);
    }
    setFormLoading(false);
}

export const redirectUser = (ctx, location) => {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location })
        ctx.res.end();
    } else {
        Router.push(location);
    }
}

const setToken = (token) => {
    cookie.set('token', token);
    Router.push('/');
}

export const logoutUser = username => {
    cookie.set('userName', username);
    cookie.remove('token');
    Router.push('/login');
    Router.reload();
}