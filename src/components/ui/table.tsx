interface TableProps<T extends { id: string | number }> {
  headers: string[];
  data: T[];
  renderRow: (row: T, index: number) => React.ReactNode;
  selectedRows?: T[];
  onRowSelect?: (row: T) => void;
  onSelectAll?: () => void;
}

const Table = <T extends { id: string | number }>({
  headers,
  data,
  renderRow,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-100 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Header */}
        <thead className="bg-gray-50">
          <tr>
            {/* "Select All" Checkbox in Header */}
            {onRowSelect && onSelectAll && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={onSelectAll}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </th>
            )}
            {headers.map((header, index) => (
              <th 
                key={index} 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr 
              key={row.id} 
              className={`transition-colors ${selectedRows.some(selectedOrder => selectedOrder.id === row.id) 
                ? 'bg-blue-50' 
                : 'hover:bg-gray-50'}`}
            >
              {/* Row Selection Checkbox */}
              {onRowSelect && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.some(selectedOrder => selectedOrder.id === row.id)}
                      onChange={() => onRowSelect(row)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </td>
              )}
              {renderRow(row, index)}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Optional: Empty state */}
      {data.length === 0 && (
        <div className="bg-white p-8 text-center">
          <div className="text-gray-500">No data available</div>
        </div>
      )}
    </div>
  );
};

export default Table;