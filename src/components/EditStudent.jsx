import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import OutlinedTextFields from '../elements/TextField';
import SkillsList from './SkillsList';
import { editStudent } from '../lib/api';

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

const EditStudent = (props) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState(props.student.first_name);
    const [lastName, setLastName] = useState(props.student.last_name);

    let existingList = [];
    let desiredList = [];
    props.mockSkillsList.forEach(skill => {
        if (skill.isExisting) {
            existingList.push(skill)
        } else {
            desiredList.push(skill)
        }
    })

    const onSaveEdit = (event) => {
        event.preventDefault();

        const updatedStudent = {
            ID: props.student.ID,
            email: props.student.email,
            created_at: props.student.created_at.toISOString(),
            last_modified: props.student.last_modified,
            house: props.student.house,
            first_name: firstName,
            last_name: lastName,
            existing_skills: existingList,
            desired_skills: desiredList
        }

        editStudent(updatedStudent).then(response => {
            if (response.status === 200) {
                props.handleSaveEdit(updatedStudent, props.student.ID);
                props.setIsEditing(false);
            }
        })
    }

    //add isExisting property to each skill object
    useEffect(() => {
        let newSkillsList = [];
        props.student.existing_skills.forEach(skill => {
            skill.isExisting = true;
            newSkillsList.push(skill);
        });
        props.student.desired_skills.forEach(skill => {
            skill.isExisting = false;
            newSkillsList.push(skill);
        });
        props.setMockSkillsList(newSkillsList);
    }, [])

    return (
        <div className="card pop-up my-5">
            <div className="card-body">
                <div className="clearfix">
                    <button className="float-right" onClick={() => props.setIsEditing(false)}><CancelIcon /></button>
                </div>
                <h4 className="mt-2 text-primary">Edit student</h4>
                <form className="tweet-input" onSubmit={(event) => onSaveEdit(event)}>
                    <TextField
                        label="Student ID"
                        value={props.student.ID}
                        variant="outlined"
                        margin="normal"
                        disabled
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={props.student.email}
                        variant="outlined"
                        margin="normal"
                        disabled
                        fullWidth
                    />

                    <OutlinedTextFields
                        label="First"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <OutlinedTextFields
                        label="Last"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <TextField
                        label="House"
                        value={props.student.house}
                        variant="outlined"
                        margin="normal"
                        disabled
                        fullWidth
                    />

                    <h4 className="my-3 border-top pt-3">Existing Skills</h4>
                    <h6 className="my-3">Edit student's existing skills level:</h6>
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
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default EditStudent;