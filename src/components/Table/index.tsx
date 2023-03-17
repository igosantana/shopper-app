import { useQuery } from 'react-query';
import { useTable } from 'react-table'
import { api } from '../../services/api';

const Table = () => {
  const { data, isLoading } = useQuery('user-list', api.getUsers)
  const columns =
    [
      {
        Header: "ID",
        accessor: "id" as const
      },
      {
        Header: "Nome",
        accessor: "name" as const
      },
      {
        Header: "Sobrenome",
        accessor: "lastName" as const
      },
      {
        Header: "Telefone",
        accessor: "phone" as const
      },
      {
        Header: "Aniversário",
        accessor: "birthDate" as const
      },
      {
        Header: "Profissão",
        accessor: "job" as const
      },
    ]
  if (!data) return <div>Element error...</div>
  if (isLoading) return <div>Loading...</div>
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isLoading ? <h1>Loading</h1> :
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        }
      </table>
    </div>
  )
}

export default Table


