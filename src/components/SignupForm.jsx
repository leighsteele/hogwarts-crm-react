import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import OutlinedTextFields from '../elements/TextField';
import { handleAdminSignup } from '../lib/api';

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

const SignupForm = () => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const history = useHistory();

    const handleSignup = (event) => {
        event.preventDefault();

        const adminDetails = {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        }

        if (!firstName || !lastName || !email || !password || !repeatPassword) {
            console.log("Please complete all fields")
        } else if (password !== repeatPassword) {
            console.log("Passwords do not match")
        } else {
            handleAdminSignup(adminDetails).then(response => {
                if (response.status === 200) {
                    console.log("Signup successful! Please login to continue", firstName, lastName, email, password)
                    history.push("/login");
                } else {
                    console.log("Signup unsuccessful")
                }
            })
        }
    }

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={(event) => handleSignup(event)}>
            <OutlinedTextFields
                label="First name"
                onChange={(event) => setFirstName(event.target.value)}
            />
            <OutlinedTextFields
                label="Last name"
                onChange={(event) => setLastName(event.target.value)}
            />
            <OutlinedTextFields
                label="Email"
                onChange={(event) => setEmail(event.target.value)}
            />
            <OutlinedTextFields
                label="Password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <OutlinedTextFields
                label="Confirm password"
                type="password"
                onChange={(event) => setRepeatPassword(event.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
        </form>
    );
}

export default SignupForm;