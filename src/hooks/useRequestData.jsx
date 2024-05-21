import axios from 'axios'
import { useState } from 'react'

export const useRequestData = (baseUrl = 'http://127.0.0.1:5000/') => {
	let axiosBase = axios.create({
		baseURL: baseUrl,
		timeout: 1000,
		headers: { 'Content-Type': 'application/json' }
	})
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState(null)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")


	const makeRequest = async (url, method = 'GET', headers = null, params = null, body = null) => {
		setIsLoading(true)
		let response;
		setTimeout(async () => {
			try {
				switch (method) {
					case 'POST':
						response = await axiosBase.post(url, body, { headers: headers, params: params, })
						break;
					case 'PUT':
						response = await axiosBase.put(url, { headers: headers, params: params, })
						break;
					case 'DELETE':
						response = await axiosBase.delete(url, { headers: headers, params: params, })
						break;
					default:
						response = await axiosBase.get(url, { headers: headers, params: params, })
						break;
				}

				if (response && response.data !== undefined) {
					setData(response.data)
					setError(false)
					setErrorMessage("")
				} else {
					setData(null)
					setError(true)
					setErrorMessage("No data or empty response from API")
					throw new Error("ERROR: No data or empty response from API")
				}
			}
			catch (error) {
				setData(null)
				setError(true)
				setErrorMessage(error.message)
				console.log("ERROR", error)
			} finally {
				setIsLoading(false)
				console.log("Request done...")
			}
		}, 1000)
	}

	return { makeRequest, isLoading, data, error, errorMessage }
}
