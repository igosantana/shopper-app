import 'react-datepicker/dist/react-datepicker.css'
import Table from './components/Table/Table'
import Form from './components/Form/Form'
import { useQuery } from 'react-query'
import { api } from './services/api'
import { IUser } from './interfaces/interface'

function App() {
  const { data, isLoading, isError, error } = useQuery<IUser[], Error>('user-list', api.getUsers)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (!data) return <div>Sem dados...</div>
  return (
    <>
      <Form />
      <Table data={data} />
    </>
  )
}

export default App
