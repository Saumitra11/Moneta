import React from "react";
import CARD from "../../assets/images/card.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-slate-900 text-white">
        <h2 className="text-xl font-bold text-emerald-400 tracking-wide">
          MONETA
        </h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen relative bg-gradient-to-tr from-slate-800 via-slate-900 to-slate-950 p-8 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 z-0" />

        <div className="grid grid-cols-1 z-20 relative">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Monitor Your Cash Flow"
            value="₹22,400"
            color="bg-emerald-500"
          />
        </div>

        <img
          src={CARD}
          alt="Charts Visualization"
          className="w-60 lg:w-[85%] absolute bottom-8 right-6 drop-shadow-xl shadow-emerald-300/30 z-10"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 bg-slate-800 p-4 rounded-lg shadow-md shadow-emerald-300/20 border border-slate-700 z-10 max-w-xs">
      <div
        className={`w-10 h-10 flex items-center justify-center text-lg text-white ${color} rounded-full shadow-md`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <h3 className="text-xl font-semibold text-white">{value}</h3>
      </div>
    </div>
  );
};
