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
}