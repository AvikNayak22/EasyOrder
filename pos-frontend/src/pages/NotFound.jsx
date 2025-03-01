import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1F1F1F] text-white p-4">
      <div className="max-w-md w-full bg-[#1A1A1A] rounded-lg shadow-md p-8 text-center">
        <IoWarningOutline className="mx-auto mb-4 text-[#f6b100]" size={64} />

        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>

        <p className="text-[#ababab] mb-6">
          The page you are looking for doesn&apos;t exist.
        </p>

        <div className="flex flex-col space-y-4">
          <button
            className="px-4 py-2 bg-[#f6b100] hover:bg-yellow-600 font-semibold rounded-md transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
