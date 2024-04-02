// LoadingIndicator.jsx
const LoadingIndicator = () => (
  <div className="mx-5 my-4 grid grid-cols-2 grid-rows-2 gap-5">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="h-64 bg-blue-100 flex items-center justify-center"
      >
        <div>⏳</div>
      </div>
    ))}
  </div>
);

export default LoadingIndicator;
