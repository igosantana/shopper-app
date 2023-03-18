import { useMemo } from 'react';
import { Column, useTable } from 'react-table'
import { IUser } from '../../interfaces/interface';
interface ITableProps {
  data: IUser[]
}
const Table = ({ data }: ITableProps) => {
  const columns = useMemo<Column<IUser>[]>(
    () => [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Nome",
        accessor: "name"
      },
      {
        Header: "Sobrenome",
        accessor: "lastName"
      },
      {
        Header: "Telefone",
        accessor: "phone"
      },
      {
        Header: "Aniversário",
        accessor: "birthDate"
      },
      {
        Header: "Profissão",
        accessor: "job"
      },
    ], [data]
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
  return (
    <div className="w-full flex align-middle justify-center px-10">
      <table className="w-full text-center" {...getTableProps()}>
        <thead className="border-black bg-gray-200 py-5">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="uppercase">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
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
      </table>
    </div>
  )
}

export default Table
