import React, { useEffect, useState } from 'react'

import { Title } from '../../components/Title'
import { Toast } from '../../components/Toast'
import { Todo } from '../../components/Todo'
import { useLocation } from 'react-router-dom'
import { useRequestData } from '../../hooks/useRequestData'

export const EditTodos = () => {
    const { makeRequest, isLoading, data, error, errorMessage } = useRequestData()
    const { makeRequest: makeTodoRequest, isLoading: isTodoLoading, data: todo, error: todoError, errorMessage: todoErrorMessage } = useRequestData()
    const [id, setId] = useState('')
    const location = useLocation()


    const handleEditTodo = (event) => {
        event.preventDefault()
        const form = event.target
        const formData = new FormData()
        console.log('Form:', form.title.value, form.description.value, form.category.value, form.done.checked, form.image.files[0])
        formData.append('title', form.title.value)
        formData.append('description', form.description.value)
        formData.append('category', form.category.value)
        formData.append('done', form.done.checked)
        if (form.image.files[0] !== undefined) formData.append('image', form.image.files[0])
        makeRequest(`/todos/${id}`, 'PUT',
            {
                'Content-Type': 'multipart/form-data'
            },
            null,
            formData
        )
        //form.reset()
    }

    useEffect(() => {
        data && console.log(data)
        if (data && data.created.title) {
            console.log('Todo edited:', data.created.title)
            alert('Todo edited:', data.created.title)
            /* setTimeout(() => {
                data = null
            }, 2000) */
        }
    }, [data])

    useEffect(() => {
        console.log('ID:', id)
        makeTodoRequest(`/todos/${id}`, 'GET')
    }, [id])

    useEffect(() => {
        setId(location.pathname.split('/')[4])
    }, [])


    return (
        <div className="card w-[40rem] bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Edit a todo</h2>
                <form onSubmit={handleEditTodo} className="card-actions justify-end form-control">
                    <input type="text" name='title' placeholder="Title" className="input input-bordered w-full my-4" defaultValue={todo?.todo?.title} />
                    <textarea name='description' placeholder="Description" className="textarea textarea-bordered w-full mb-4" defaultValue={todo?.todo?.description} ></textarea>
                    <input type="text" name='category' placeholder="Category" className="input input-bordered w-full mb-4" defaultValue={todo?.todo?.category} />
                    <input type="file" name='image' className="file-input file-input-bordered w-full mb-4" />
                    <label className="label cursor-pointer">
                        <input type="checkbox" name='done' className="checkbox" checked={todo?.todo?.done} />
                        <span className="label-text ml-4">Is completed?</span>
                    </label>
                    <button type='submit' className="btn btn-primary w-48 mx-auto mt-4">Edit</button>
                </form>
            </div>
            {/* <div className="toast toast-top toast-start">
                <Toast title='Todo created' message={data.created.title} duration={2000} />
            </div> */}
        </div>
    )
}
