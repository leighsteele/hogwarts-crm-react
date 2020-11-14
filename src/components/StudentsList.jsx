import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import EditStudent from './EditStudent';
import SimpleModal from '../elements/SimpleModal';

const StudentsList = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState('');

    const handleShowEdit = (e) => {
        setStudentToEdit(e.currentTarget.value);
        setIsEditing(true);
    }

    return (
        <div className="card my-3 mx-auto">
            <div className="list-group list-group-flush">

                {props.studentsList.map(student =>
                    <div className="d-flex justify-content-between align-items-center list-group-item" key={student.first_name}>

                        <Link to={{
                            pathname: 'student/profile',
                            state: { student: student }
                        }}>
                            {student.first_name} {student.last_name}
                        </Link>

                        <div>
                            <button className="btn-custom" value={student.first_name} onClick={(e) => handleShowEdit(e)}><EditIcon /></button>
                            {isEditing && studentToEdit === student.first_name &&
                                <EditStudent
                                    handleSaveEdit={props.handleSaveEdit}
                                    student={student}
                                    setStudents={props.setStudents}
                                    students={props.students}
                                    setIsEditing={setIsEditing}
                                    handleSetLevelState={props.handleSetLevelState}
                                    handleMakeExistingClick={props.handleMakeExistingClick}
                                    mockSkillsList={props.mockSkillsList}
                                    setMockSkillsList={props.setMockSkillsList}
                                />}

                            <SimpleModal
                                student={student}
                                setStudents={props.setStudents}
                                studentsList={props.studentsList}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentsList;