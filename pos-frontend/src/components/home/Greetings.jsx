import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { formatDate, formatTime, getTimeOfDay } from "../../utils";

const Greetings = () => {
  const userData = useSelector((state) => state.user);

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center px-8 mt-5">
      <div>
        <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">{`Good ${getTimeOfDay()}, ${
          userData.name || "TEST USER"
        }`}</h1>

        <p className="text-[#ababab] text-sm">
          Here&apos;s what&apos;s happening with your business today!
        </p>
      </div>
      <div>
        <h1 className="text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px] ">
          {formatTime(dateTime)}
        </h1>
        <p className="text-[#ababab] text-sm">{formatDate(dateTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;
