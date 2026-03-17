import React from "react";
import { useForm } from "react-hook-form";

export function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
  };

  const inputStyle =
    "w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <section className="bg-gray-100 py-10 min-h-screen flex items-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-green-600 text-white text-center py-6">
            <h3 className="text-xl font-bold">
              Create Your EcoTrack Account
            </h3>
            <p className="text-sm">
              Join us in building a greener future 🌱
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Name */}
              <div className="mb-4">
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={inputStyle}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={inputStyle}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className={inputStyle}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className={inputStyle}
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label className="block mb-1">Phone No</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className={inputStyle}
                  {...register("phoneNo", {
                    required: "Phone number is required",
                  })}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Register
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-green-600 font-semibold">
                  Login
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}