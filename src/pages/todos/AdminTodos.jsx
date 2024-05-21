import { Link, Router } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { Title } from '../../components/Title'
import { Todo } from '../../components/Todo'
import { useRequestData } from '../../hooks/useRequestData'

export const AdminTodos = () => {
    const { makeRequest, isLoading, data, error, errorMessage } = useRequestData()
    const { makeRequest: makeCategoriesRequest, isLoading: isCategoriesLoading, data: categoriesData, error: categoriesError, errorMessage: categoriesErrorMessage } = useRequestData()
    const [searchTerm, setSearchTerm] = useState('')
    const [categories, setCategories] = useState([{
        name: 'All', id: 'all'
    }])
    const [category, setCategory] = useState('All')
    const [completed, setCompleted] = useState('null')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm)
    }

    const handleDeleteTodo = (event) => {
        /* event.preventDefault() */
        const form = event.target
        const formData = new FormData()
        formData.append('id', form.id.value)
        makeRequest(`/todos/`, 'DELETE',
            {
                'Content-Type': 'multipart/form-data'
            },
            null,
            formData
        )
        form.reset()
    }

    useEffect(() => {
        makeRequest(`/todos/`, 'GET')
    }, [])

    useEffect(() => {
        /* makeCategoriesRequest(`/todos/category/${category}`, 'GET') */
    }, [category])


    return (
        <div >
            <div className='flex gap-4 m-5 '>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder='Type to search'
                    className='input input-bordered w-full max-w-xs bg-neutral'
                />

                {
                    /* Dropdown */
                }
                <div className='flex'>
                    <label htmlFor="category" className='mx-2 self-center'>Category</label>
                    <select
                        name='category'
                        value={category}
                        onChange={(event) => {
                            setCurrentPage(1)
                            setCategory(event.target.value)
                        }}
                        className='select select-bordered max-w-xs bg-neutral'
                    >
                        {
                            categories.map((item) => (
                                <option key={`category-${item.id}`} value={item.name}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='flex'>
                    <label htmlFor="filter" className='mx-2 self-center'>Filter</label>
                    <select
                        name='filter'
                        value={completed}
                        onChange={(event) => {
                            setCurrentPage(1)
                            setCompleted(event.target.value)
                        }}
                        className='select select-bordered max-w-xs bg-neutral'
                    >
                        {
                            ['null', 'false', 'true'].map((item) => (
                                item === 'null' ? (
                                    <option key={item} value={'null'}>All</option>
                                ) : item === 'true' ? (
                                    <option key={item} value={'true'}>Completed</option>
                                ) : (
                                    <option key={item} value={'false'}>Uncompleted</option>
                                )
                            ))
                        }
                    </select>
                </div>
                <div className='flex'>
                    <label htmlFor="itemsPerPage" className='mx-2 self-center'>Posts per page</label>
                    <select
                        name='itemsPerPage'
                        value={itemsPerPage}
                        onChange={(event) => {
                            setCurrentPage(1)
                            setItemsPerPage(parseInt(event.target.value))
                        }}
                        className='select select-bordered max-w-xs bg-neutral'
                    >
                        {
                            Array.from({ length: 50 }, (_, i) => i + 1).map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <Title titleText="All Todos" />
            {
                isLoading && <div className='loader'></div>
            }
            {
                error && <div>Error: {errorMessage}</div>
            }
            <div className='flex flex-wrap gap-5 my-10 justify-center'>
                <div className="overflow-x-auto">
                    <table className="table table-lg rounded-xl">
                        <thead>
                            <tr>
                                <th>Todo ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='rounded-xl'>
                            {data && data.todos && data.todos
                                .filter((item) => (item.title.includes(searchTerm) || item._id.includes(searchTerm) || item.description.includes(searchTerm) || item.category.includes(searchTerm) || item.createdAt.includes(searchTerm) || item.updatedAt.includes(searchTerm)) && (item.done.toString() === completed || completed === 'null'))
                                .map((item) => (
                                    <tr key={`todo-${item._id}`} className='bg-zinc-600/10 rounded-xl'>
                                        <th>{item._id}</th>
                                        <td>{item.title}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <Link to={`edit/${item._id}`} className='hover:bg-red-800 p-2 rounded-xl'>✏</Link>
                                        </td>
                                        <td>
                                            <button onClick={(event) => handleDeleteTodo(event, item._id)} className='hover:bg-slate-600 p-2 rounded-xl'>🗑</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex justify-center m-10 gap-20'>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className='btn btn-primary'
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= data?.totalPages}
                    className='btn btn-primary'
                >
                    Next
                </button>
            </div>
        </div>
    )
}
