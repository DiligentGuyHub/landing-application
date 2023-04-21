

export const DataTable = ({data}) => {
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const headers = Object.keys(data[0]);

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map(row => (
                    <tr key={row.id}>
                        {headers.map(header => (
                            <td key={`${row.id}-${header}`}>
                                {header === 'answers' ? (
                                    <button onClick={() => console.log(row[header])}>
                                        View Answers
                                    </button>
                                ) : (
                                    row[header]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>);
};