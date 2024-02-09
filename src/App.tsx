import './App.css'
import { useGetEmployees } from './api/api.ts'
import { IEmployee } from './types/employee.ts'
import { useEffect, useState } from 'react'

function App() {
    const [response, loading, error] = useGetEmployees({
        page: 1,
        count: 10,
    })
    const [employees, setEmployees] = useState<IEmployee[]>([])
    useEffect(() => {
        if (response) {
            setEmployees(response as IEmployee[])
        }
    }, [response])
    if (error) {
        return <div>Error</div>
    }
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <>
            {(employees as IEmployee[]).map((employee) => (
                <div key={employee.id}>{employee.name}</div>
            ))}
        </>
    )
}

export default App
