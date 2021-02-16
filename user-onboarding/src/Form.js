import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
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

    const changeHandler = event => {
        event.persist()

        const FormData = {
            ...formState,
            [event.target.name] : event.target.type === 'checkbox' ? event.target.checked : event.target.value
        }

        validateChange(event)

        setFormState(FormData)
    }

    const formSubmit = event => {
        event.preventDefault()
        axios
        .post('https://reqres.in/api/users', formState)
        .then(response => {
            setUsers([...users, response.data])
            setFormState({
                name: '',
                email: '',
                password: '',
                terms: true
            })
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor='name'>
                Name
            <input
                id='name'
                type='text'
                name='name'
                value={formState.name}
                onChange={changeHandler}
            />
            {errors.name.length > 0 ? (<p className ='error'>{errors.name}</p>) : null}
            </label>
            <label htmlFor='email'>
                Email
            <input
                id='email'
                type='text'
                name='email'
                value={formState.email}
                onChange={changeHandler}
            />
            {errors.email.length > 0 ? (<p className='error'>{errors.email}</p>) : null}
            </label>
            <label htmlFor='password'>
                Password
            <input
                id='password'
                type='password'
                name='password'
                value={formState.password}
                onChange={changeHandler}
            />
            {errors.password.length > 0 ? (<p className='error'>{errors.password}</p>) : null}
            </label>
            <label htmlFor='terms' className='terms'>
            <input
                id='terms'
                type='checkbox'
                name='terms'
                value={formState.terms}
                onChange={changeHandler}
            />
            Accept Terms and Conditions?
            {errors.terms.length > 0 ? (<p className='error'>{errors.terms}</p>) : null}
            </label>
            <button type='submit' disabled={buttonDisabled}>Submit</button>

            <pre>{JSON.stringify(users, null, 1)}</pre>
            </form>
    )
}

export default Form;