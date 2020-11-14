import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const gryffindorSrc = 'https://i.imgur.com/jnHkdOy.gif';
const ravenclawSrc = 'https://i.imgur.com/tpBdVgT.gif';
const slytherinSrc = 'https://i.imgur.com/NGKcOK5.gif';
const hufflepuffSrc = 'https://i.imgur.com/cV2E3T0.gif';

const ProfilePage = (props) => {
    const { student } = props.location.state;
    
    let houseCrestSrc;

    if (student.house === 'Gryffindor') {
        houseCrestSrc = gryffindorSrc
    } else if (student.house === 'Ravenclaw') {
        houseCrestSrc = ravenclawSrc
    } else if (student.house === 'Slytherin') {
        houseCrestSrc = slytherinSrc
    } else {
        houseCrestSrc = hufflepuffSrc
    }

    return (
        <div>
            <div className="navbar-nav mr-auto navbar-dark bg-dark p-3">
                <div className="nav-item">
                    <Link className="nav-link float-left text-light mr-3" to={{ pathname: '/home' }}>&larr; Back to students dashboard</Link>
                    <Link className="nav-link float-right text-light mr-3" to={{ pathname: '/login' }}>Logout</Link>
                </div>
            </div>
            <div className="container">
                <div className="profile-container mx-auto">

                    <h1 className="my-5">Student Profile</h1>
                    <div className="d-flex justify-content-between mt-5">
                        <div>
                            <div className="card m-2 mb-3 profile-card-info">
                                <div className="card-body">
                                    <div>Student ID:</div>
                                    <h5>{student.ID}</h5>
                                    <div>Name:</div>
                                    <h5>{student.first_name} {student.last_name}</h5>
                                    <div>Email: </div>
                                    <h5>{student.email}</h5>
                                </div>
                            </div>
                            <div className="card m-2 house-img-container">
                                <img className="border rounded center house-img"
                                    src={houseCrestSrc}
                                    alt="house-crest">
                                </img>
                            </div>
                        </div>

                        <div>
                            <div className="card m-2 profile-card">
                                <div className="card-body">

                                    <h3>Existing Skills</h3>
                                    {student.existing_skills.map(skill =>
                                        <div className="skill-div my-3" key={skill.name}>
                                            <h5>{skill.name}</h5>
                                            <div>Level: {skill.level} / 5</div>
                                            {skill.level === 0 &&
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: "0%" }}></div>
                                                </div>}
                                            {skill.level === 1 &&
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: "20%" }}></div>
                                                </div>}
                                            {skill.level === 2 &&
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: "40%" }}></div>
                                                </div>}
                                            {skill.level === 3 &&
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: "60%" }}></div>
                                                </div>}
                                            {skill.level === 4 &&
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: "80%" }}></div>
                                                </div>}
                                            {skill.level === 5 &&
                                                <div className="progress">
                                                    <div className="progress-bar" style={{ width: "100%" }}></div>
                                                </div>}
                                        </div>)}
                                </div>
                            </div>

                            <div className="card m-2 profile-card">
                                <div className="card-body">
                                    <h3>Desired Skills</h3>
                                    <div className="list-group list-group-flush">
                                        {student.desired_skills.map(skill =>
                                            <h5 className="my-2 pb-3 border-bottom border-muted" key={skill.name}>{skill.name}</h5>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;