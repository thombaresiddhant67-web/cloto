import { useForm } from "react-hook-form";
import { api } from "../../api";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gray-100">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-green-600 text-white text-center py-6">
            <h2 className="text-2xl font-bold mb-1">EcoTrack 🌱</h2>
            <p className="text-sm">
              Login to continue managing recycling responsibly
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* Email */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("email", { required: "email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block font-semibold mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember / Forgot */}
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>

                <a href="#" className="text-green-600 text-sm font-semibold">
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
              >
                Login
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 mb-1">
                Same login for Admin & User
              </p>
              <p>
                Don’t have an account?{" "}
                <a href="/register" className="text-green-600 font-semibold">
                  Register
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}