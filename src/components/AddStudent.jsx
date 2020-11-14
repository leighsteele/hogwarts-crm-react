import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

import { addStudent, getStudents, getDesiredSkillCount } from '../lib/api';
import SkillsList from './SkillsList';
import OutlinedTextFields from '../elements/TextField';
import SimpleSelect from '../elements/SimpleSelect';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddStudent = (props) => {
    const classes = useStyles();
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [house, setHouse] = useState('');

    const handleAddStudent = (event) => {
        event.preventDefault();

        const newStudent = {
            first_name: first,
            last_name: last,
            house,
            existing_skills: existingList,
            desired_skills: desiredList
        }

        addStudent(newStudent).then(response => {
            if (response.status === 200) {
                props.setStudents([...props.students, newStudent]);
                props.setAddShowing(false);

                getStudents().then(response => {
                    props.setStudents(response.data.students);
                    getDesiredSkillCount().then(res => {
                        props.setSkillCount(res.data);
                    })
                })
            }
        });
    }

    useEffect(() => {
        setFirst('');
        setLast('');
        setHouse('');
        //resets form skills after student added
        props.setMockSkillsList(props.mockSkillsData)
    }, [props.students])

    let existingList = [];
    let desiredList = [];
    props.mockSkillsList.forEach(skill => {
        if (skill.isExisting) {
            existingList.push(skill)
        } else {
            desiredList.push(skill)
        }
    })

    useEffect(() => {
    }, [props.mockSkillsList])

    return (
        <div className="card pop-up mb-5">
            <div className="card-body">
                <div className="clearfix">
                    <button className="float-right" onClick={() => props.setAddShowing(false)}><CancelIcon /></button>
                </div>
                <h4 className="mt-2 text-primary">Add student</h4>
                <form onSubmit={(event) => handleAddStudent(event)}>
                    <OutlinedTextFields
                        label="First Name"
                        value={first}
                        onChange={(event) => setFirst(event.target.value)}
                    />
                    <OutlinedTextFields
                        label="Last Name"
                        value={last}
                        onChange={(event) => setLast(event.target.value)}
                    />
                    <SimpleSelect
                        value={house}
                        onChange={(event) => setHouse(event.target.value)}
                    />

                    <h4 className="my-3 border-top pt-3">Existing Skills</h4>
                    <h6 className="my-3">Select student's existing skills level:</h6>
                    <SkillsList
                        handleSetLevelState={props.handleSetLevelState}
                        mockSkillsList={existingList}
                        handleMakeExistingClick={props.handleMakeExistingClick}
                    />

                    <h4 className="my-3 border-top pt-3">Desired Skills</h4>
                    <SkillsList
                        handleSetLevelState={props.handleSetLevelState}
                        mockSkillsList={desiredList}
                        handleMakeExistingClick={props.handleMakeExistingClick}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add Student
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;