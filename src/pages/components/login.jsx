import React from "react";
import { useForm } from "react-hook-form";
import {api} from "../../api";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response=await api.post("/auth/login",data);
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
    
    
  };

  return (
    <section className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4">
              {/* Header */}
              <div className="card-header bg-success text-white text-center py-4 rounded-top-4">
                <h2 className="fw-bold mb-1">EcoTrack 🌱</h2>
                <p className="mb-0 small">
                  Login to continue managing recycling responsibly
                </p>
              </div>

              {/* Body */}
              <div className="card-body p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      {...register("email", { required: "email is required" })}
                    />
                  </div>

                  {errors.email && <small className="text-danger">{errors.email.message}</small>}

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "password is required",
                      })}
                    />
                  </div>

                  {errors.password && <small className="text-danger">{errors.password.message}</small>}

                  {/* Remember / Forgot */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        className="form-check-label small"
                        htmlFor="rememberMe"
                      >
                        Remember me
                      </label>
                    </div>

                    <a href="#" className="text-success small fw-semibold">
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg fw-semibold"
                    >
                      Login
                    </button>
                  </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="mb-1 small text-muted">
                    Same login for Admin & User
                  </p>
                  <p className="mb-0">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-success fw-semibold">
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;