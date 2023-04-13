import nProgress from 'nprogress'
import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Router from 'next/router';
import Head from 'next/head';
const Layout = ({ children, user }) => {
    Router.onRouteChangeStart = () => nProgress.start();
    Router.onRouteChangeComplete = () => nProgress.done();
    Router.onRouteChangeError = () => nProgress.done();
    return (
        <>
            <Head>
                <title>Playeon Dashboard</title>
            </Head>
            {user ? <>
                <Navbar user={user} />
                <div className='container'>
                    <Sidebar user={user} />
                    <div className='flex-4' user={user}>
                        {children}
                    </div>
                </div>
            </> : <>{children}</>}
        </>
    )
}

export default Layout