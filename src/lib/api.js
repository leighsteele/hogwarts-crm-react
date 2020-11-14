import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function handleAdminLogin(adminCredentials) {
    return axios.post(`${baseUrl}/login`, adminCredentials)
}

export function handleAdminSignup(adminDetails) {
    return axios.post(`${baseUrl}/signup`, adminDetails)
}

export function getStudents() {
    return axios.get(`${baseUrl}/students`)
}

export function addStudent(student) {
    return axios.post(`${baseUrl}/student`, student);
}

export function editStudent(student) {
    return axios.put(`${baseUrl}/student`, student);
}

export function deleteStudent(id) {
    return axios.delete(`${baseUrl}/student/${id}`)
}

export function getDesiredSkillCount() {
    return axios.get(`${baseUrl}/students/desiredskills`)
}