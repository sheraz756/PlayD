import React from 'react'
import { useRouter } from 'next/router';
import ProfileSettings from '../components/profile/ProfileSettings';

const Profile = ({ user }) => {
    const router = useRouter();
    return <ProfileSettings user={user} router={router} />
}

export default Profile