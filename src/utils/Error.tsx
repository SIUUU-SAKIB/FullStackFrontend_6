

type ErrorProps = {
  message: string;
  onClose?: () => void;
};

const Error = ({ message, onClose }: ErrorProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg shadow">
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 text-red-700 hover:text-red-900 font-bold"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Error;
