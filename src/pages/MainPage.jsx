import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

import StudentsList from '../components/StudentsList';
import AddStudent from '../components/AddStudent';
import { getStudents, getDesiredSkillCount } from '../lib/api';
import Logo from '../images/logo-badge-white.png';

const mockSkillsData = [
    { name: "Potions", level: 0, isExisting: false },
    { name: "Spells", level: 0, isExisting: false },
    { name: "Quidditch", level: 0, isExisting: false },
    { name: "Animagus", level: 0, isExisting: false },
    { name: "Apparition", level: 0, isExisting: false },
    { name: "Metamorphmagi", level: 0, isExisting: false },
    { name: "Parseltongue", level: 0, isExisting: false },
]

const MainPage = () => {
    const [students, setStudents] = useState([]);
    const [addShowing, setAddShowing] = useState(false)
    const [mockSkillsList, setMockSkillsList] = useState([]);
    const [skillCount, setSkillCount] = useState({})

    const chartData = {
        labels: Object.keys(skillCount),
        datasets: [{
            backgroundColor: [
                '#373491',
                '#877df0',
                '#35014F',
                '#c4b1c9',
                '#4de8c4',
                '#2d8a75',
                '#0367a6',
            ],
            hoverBackgroundColor: [
                'rgb(55,52,145, .75)',
                'rgb(135,125,240, .75)',
                'rgb(53,1,79, .75)',
                'rgb(196,177,201, .75)',
                'rgb(77,232,196, .75)',
                'rgb(45,138,117, .75)',
                'rgb(3,103,166, .75)',
            ],
            data: Object.values(skillCount)
        }]
    }

    useEffect(() => {
        getStudents().then(response => {
            setStudents(response.data.students);

            getDesiredSkillCount()
                .then(res => { setSkillCount(res.data) });
        })
    }, [])

    const handleSetLevelState = (e, name) => {
        const value = e.target.textContent;

        if (value === "1" || value === "2" || value === "3" || value === "4" || value === "5") {
            //map through skills array and update value of matching skill
            const parsedValue = parseInt(value);

            const updatedSkills = mockSkillsList.map(skill => {
                if (name === skill.name) {
                    return { ...skill, level: parsedValue }
                }
                return skill
            });

            setMockSkillsList(updatedSkills);
        }
    }

    const handleSaveEdit = (formData, ID) => {
        const studentIndex = students.findIndex(student => ID === student.ID)
        students.splice(studentIndex, 1);

        students.push(formData);
        students.sort((a, b) => a.ID - b.ID);

        //set state of students with updated students list
        setStudents([...students]);
    }

    const handleMakeExistingClick = (name) => {
        const updatedSkills = mockSkillsList.map(skill => {
            if (name === skill.name) {
                return { ...skill, isExisting: !skill.isExisting }
            }
            return skill;
        })

        //sets existing / desired skill level
        const updatedSkillsWithLevel = updatedSkills.map(skill => {
            if (skill.isExisting && name === skill.name) {
                return { ...skill, level: 1 }
            } else if (!skill.isExisting && name === skill.name) {
                return { ...skill, level: 0 }
            }
            return skill;
        });

        setMockSkillsList(updatedSkillsWithLevel);
    }

    return (
        <div>
            <div className="navbar-nav mr-auto navbar-dark bg-dark p-3">
                <div className="nav-item">
                    <img className="logo" src={Logo} />
                    <Link className="nav-link float-right text-light mr-3" to={{ pathname: '/login' }}>Logout</Link>
                </div>
            </div>
            <div className="container">
                <h1 className="my-5">Students Dashboard</h1>
                <div className="my-3">
                    <StudentsList
                        studentsList={students}
                        setStudents={setStudents}
                        handleSaveEdit={handleSaveEdit}
                        handleSetLevelState={handleSetLevelState}
                        mockSkillsList={mockSkillsList}
                        setMockSkillsList={setMockSkillsList}
                        handleMakeExistingClick={handleMakeExistingClick}

                    />
                    <div className="text-center">
                        {!addShowing && <button className="btn-custom" onClick={() => setAddShowing(true)}><AddCircleIcon /> Add a student</button>}
                    </div>
                </div>
                {addShowing && students &&
                    <AddStudent
                        setStudents={setStudents}
                        students={students}
                        setAddShowing={setAddShowing}
                        handleSetLevelState={handleSetLevelState}
                        mockSkillsList={mockSkillsList}
                        mockSkillsData={mockSkillsData}
                        setMockSkillsList={setMockSkillsList}
                        handleMakeExistingClick={handleMakeExistingClick}
                        setStudents={setStudents}
                        setSkillCount={setSkillCount}
                    />}

                <h3 className="my-5 text-center">Desired Skills Count</h3>
                <div className="chart">
                    <Doughnut
                        data={chartData}
                        options={{
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainPage;