import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import MetaData from "../layout/MetaData.jsx"
import Loader from "../layout/Loader.jsx"
import { Link } from 'react-router-dom'

function Profile() {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <MetaData title={"Profile"} />
                        <div className="container container-fluid">

                            <h2 className="mt-5 ml-5">My Profile</h2>
                            <div className="row justify-content-around mt-5 user-info shadow-lg" style={{ paddingTop: "20px" }}>
                                <div className="col-12 col-md-3 d-flex align-items-center flex-column">
                                    <figure className='d-block avatar avatar-profile'>
                                        <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                                    </figure>
                                    <Link to="/user/profile/update" id="edit_profile" className="btn btn-primary d-block my-5">
                                        Edit Profile
                                    </Link>
                                </div>

                                <div className="col-12 col-md-5">
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>

                                    <h4>Email Address</h4>
                                    <p>{user.email}</p>

                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substring(0, 10)}</p>

                                    <div className=' d-flex align-items-center justify-content-space-between'>
                                        {
                                            user.role != "admin" && (
                                                <Link to="#" className="btn btn-danger btn-block my-5">
                                                    My Orders
                                                </Link>
                                            )
                                        }

                                        <Link to="/user/password/update" className="btn btn-primary btn-block my-5" style={{ marginLeft: "10px" }}>
                                            Change Password
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment >
    )
}

export default Profile