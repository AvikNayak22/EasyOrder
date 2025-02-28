import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-[#f6b100] p-3 text-2xl font-bold rounded-full text-white"
    >
      <TiArrowBack />
    </button>
  );
};

export default BackButton;
