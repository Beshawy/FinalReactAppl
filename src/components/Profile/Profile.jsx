import jwtDecode from 'jwt-decode'
import React, { useContext } from 'react'
import profile from '../../Assets/images/Untitled.png'
import { UserContext } from '../../Context/UserContext'

export default function Profile() {
    let decodedToken = jwtDecode((localStorage.getItem(`userToken`)))
    let {userData} = useContext(UserContext)
return <>
    <div className="container">
        <div className="row mx-auto">
            <img src={profile} alt="" className='w-25 mx-auto m-5'/>
            <div className="box p-3 mb-5 bg-light rounded">
                <label htmlFor="name" className='form-label mt-4'>Your Name :</label>
                <input id='name' type="text" className='form-control mt-2 mb-5' value={userData?.name} readOnly />

                <label htmlFor="email" className='form-label mt-4'>Your Email :</label>
                <input id='email' type="text" className='form-control mt-2 mb-5' value={userData?.email} readOnly/>

            </div>
        </div>
    </div>
</>
}
