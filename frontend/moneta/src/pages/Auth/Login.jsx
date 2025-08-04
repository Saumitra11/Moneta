import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white">
          Sign In to Continue
        </h3>
        <p className="text-sm text-slate-400 mt-1 mb-6">
          Track your expenses and stay on top of your goals.
        </p>
        
      </div>
    </AuthLayout>
  );
};

export default Login;
