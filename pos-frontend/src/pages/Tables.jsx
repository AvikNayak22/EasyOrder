import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";

import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";
import TableCard from "../components/tables/TableCard";

import { enqueueSnackbar } from "notistack";

const Tables = () => {
  const [status, setStatus] = useState("all");

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] h-full overflow-y-auto">
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>

        <div className="flex items-center justify-around gap-4 mr-8">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" && "bg-[#383838]  rounded-lg px-4 py-2"
            }  font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] text-lg ${
              status === "booked" && "bg-[#383838]  rounded-lg px-4 py-2"
            }  font-semibold`}
          >
            Booked
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 px-10 py-4 mb-16">
        {resData?.data.data.map((table) => {
          return (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          );
        })}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
