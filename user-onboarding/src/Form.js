import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

const Form = () => {

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        terms: ''
    })

    const formSchema = yup.object().shape({
        name: yup.string().required('Please Enter a valid name'),
        email: yup.string().required('Please enter a valid email address'),
        password: yup.string().required('Please enter a valid password'),
        terms: yup.boolean().oneOf([true])
    })

    const completeForm = () => {
        formSchema.isValid(formState)
        .then(isValid => {
            setButtonDisabled(!isValid)
        })
    }

    useEffect(completeForm, [formState])

    const validateChange = event => {
        yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [event.target.name] : ''
            })
        })
        .catch(error => {
            setErrors({
                ...errors,
                [event.target.name] : error.errors[0]
            })
        })
    }
}