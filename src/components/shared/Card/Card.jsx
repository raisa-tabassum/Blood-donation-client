const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;