import React, { useEffect, useState } from 'react'

import { Title } from '../../components/Title'
import { Toast } from '../../components/Toast'
import { Todo } from '../../components/Todo'
import { useRequestData } from '../../hooks/useRequestData'

export const DeleteTodos = () => {
    const { makeRequest, isLoading, data, error, errorMessage } = useRequestData()
    const { makeRequest: makeTodosRequest, isLoading: isTodosLoading, data: todos, error: todosError, errorMessage: todosErrorMessage } = useRequestData()
    const [searchTerm, setSearchTerm] = useState('')


    const handleDeleteTodo = (event) => {
        event.preventDefault()
        const form = event.target
        const formData = new FormData()
        formData.append('id', form.id.value)
        makeRequest(`/todos/`, 'POST',
            {
                'Content-Type': 'multipart/form-data'
            },
            null,
            formData
        )
        form.reset()
    }

    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm)
    }

    useEffect(() => {
        data && console.log(data)
        data && alert('Todo deleted')
    }, [data])

    useEffect(() => {
        makeTodosRequest(`/todos/`, 'GET')
    }, [searchTerm])


    return (
        <div className="card w-[40rem] bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Delete a todo</h2>
                <form autoComplete="off" onSubmit={handleDeleteTodo} className="card-actions justify-end form-control">
                    <input type="text" name='id' placeholder="Todo ID" onChange={handleInputChange} className="input input-bordered w-full my-4" />
                    <button type='submit' className="btn btn-accent bg-red-700 hover:bg-red-900 w-48 mx-auto mt-4">Delete</button>
                </form>
            </div>
            {/* <div className="toast toast-top toast-start">
                <Toast title='Todo created' message={data.created.title} duration={2000} />
            </div> */}
        </div>
    )
}
