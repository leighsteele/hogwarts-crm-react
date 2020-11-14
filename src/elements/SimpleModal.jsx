import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteStudent } from '../lib/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <div>
        Are you sure you want to delete this student?
            <button onClick={() => handleDelete(props.student)}>Yes</button>
        <button onClick={handleClose}>No</button>
      </div>
    </div>
  );

  const handleDelete = (studentObj) => {
    deleteStudent(studentObj.ID)
      .then(response => {
        if (response.status === 200) {
          const arrayCopy = [...props.studentsList];
          const studentIndex = arrayCopy.findIndex(student => studentObj === student);
          arrayCopy.splice(studentIndex, 1);
          props.setStudents(arrayCopy);
        } else {
          console.log("There was an error trying to delete student")
        }
      })
      .catch((error) => {
        throw error.response.data
      })
  }

  return (
    <>
      <button className="btn-custom" type="button" onClick={handleOpen}>
        <DeleteIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
