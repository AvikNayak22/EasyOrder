import { useState } from "react";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";

const Orders = () => {
  const [status, setStatus] = useState("all");

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] h-full overflow-y-auto">
      <div className="flex items-center justify-between px-10 py-4 mt-2">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Orders
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
            onClick={() => setStatus("progress")}
            className={`text-[#ababab] text-lg ${
              status === "progress" && "bg-[#383838]  rounded-lg px-4 py-2"
            }  font-semibold`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatus("ready")}
            className={`text-[#ababab] text-lg ${
              status === "ready" && "bg-[#383838]  rounded-lg px-4 py-2"
            }  font-semibold`}
          >
            Ready
          </button>
          <button
            onClick={() => setStatus("completed")}
            className={`text-[#ababab] text-lg ${
              status === "completed" && "bg-[#383838]  rounded-lg px-4 py-2"
            }  font-semibold`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 px-10 py-4 mb-16">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
