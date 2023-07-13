import { useEffect, useState } from "react"

const useFetch = (url:any) => {
    const [data, setData] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
            } catch (error:any) {
                setError(error)
            }
        }
        fetchData();
    }, [url])

    return {error,data}
}

export default useFetch;

