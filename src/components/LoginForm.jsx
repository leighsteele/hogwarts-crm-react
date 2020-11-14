import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import OutlinedTextFields from '../elements/TextField';
import { handleAdminLogin } from '../lib/api';

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

const LoginForm = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleNewLogin = (event) => {
        event.preventDefault();

        const adminCredentials = {
            email,
            password
        }

        handleAdminLogin(adminCredentials)
            .then(response => {
                if (response.status === 200) {
                    console.log("Login successful!", email + password)
                    history.push("/home");
                } else {
                    console.log("Email or password is incorrect")
                }
            });
    }

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={(event) => handleNewLogin(event)}>
            <OutlinedTextFields
                label="Email"
                onChange={(event) => setEmail(event.target.value)}
            />
            <OutlinedTextFields
                label="Password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Login
            </Button>
        </form>
    );
}

export default LoginForm;