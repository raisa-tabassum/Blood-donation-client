const Table = ({ children, className = "" }) => {
  return (
    <div className={`overflow-x-auto bg-white rounded-2xl shadow p-4 ${className}`}>
      <table className="table w-full">
        {children}
      </table>
    </div>
  );
};

export default Table;