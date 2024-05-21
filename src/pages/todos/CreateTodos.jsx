import React, { useEffect, useState } from 'react'

import { Title } from '../../components/Title'
import { Toast } from '../../components/Toast'
import { Todo } from '../../components/Todo'
import { useRequestData } from '../../hooks/useRequestData'
import { useThumbnail } from './../../hooks/useThumbnail';

export const CreateTodos = () => {
    const { thumbnail, makeThumbnail } = useThumbnail()
    const { makeRequest, isLoading, data, error, errorMessage } = useRequestData()


    const handleCreateTodo = (event) => {
        event.preventDefault()
        const form = event.target
        const formData = new FormData()
        formData.append('title', form.title.value)
        formData.append('description', form.description.value)
        formData.append('category', form.category.value)
        formData.append('done', form.done.checked)
        formData.append('image', form.image.files[0])
        makeRequest(`/todos/`, 'POST',
            {
                'Content-Type': 'multipart/form-data'
            },
            null,
            formData
        )
        form.reset()
    }

    useEffect(() => {
        data && console.log(data)
        if (data && data.created.title) {
            console.log('Todo created:', data.created.title)
            alert('Todo created:', data.created.title)
            /* setTimeout(() => {
                data = null
            }, 2000) */
        }
    }, [data])


    return (
        <div className="card w-[40rem] bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Create a todo</h2>
                <form onSubmit={handleCreateTodo} className="card-actions justify-end form-control">
                    <input type="text" name='title' placeholder="Title" className="input input-bordered w-full my-4" required />
                    <textarea name='description' placeholder="Description" className="textarea textarea-bordered w-full mb-4" ></textarea>
                    <input type="text" name='category' placeholder="Category" className="input input-bordered w-full mb-4" />
                    <label className="label cursor-pointer">
                        <input type="checkbox" name='done' className="checkbox" />
                        <span className="label-text ml-4">Is completed?</span>
                    </label>
                    <input type="file" name='image' onChange={(e) => makeThumbnail(e.target.files[0])} className="file-input file-input-bordered w-full mb-4" />
                    { thumbnail && <img src={thumbnail} alt='Thumbnail' className='w-48 h-48 mx-auto invert' /> }
                    <button type='submit' className="btn btn-primary w-48 mx-auto mt-4">Create</button>
                </form>
            </div>
            {/* <div className="toast toast-top toast-start">
                <Toast title='Todo created' message={data.created.title} duration={2000} />
            </div> */}
        </div>
    )
}
