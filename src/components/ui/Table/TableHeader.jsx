const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr className="bg-blue-50 text-accent">
        {columns.map((col, i) => (
          <th key={i}>{col}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;