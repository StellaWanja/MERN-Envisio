/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useTable } from 'react-table';
import styled from 'styled-components'

const Styles = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border: none;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th{
        text-align: left;
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: none;
      border-right: none;
      :last-child {
        border-right: 0;
      }
    }
  }
`

export default function Table({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

    // Render Data Table UI
    return (
        <>
            <Styles>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup
                                    .headers
                                    .map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row
                                        .cells
                                        .map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Styles>
        </>
    )
}