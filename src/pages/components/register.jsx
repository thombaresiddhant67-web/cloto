import React from 'react';
import { useForm } from 'react-hook-form';

function Register() {


  const {register,
    handleSubmit,
    watch,
    formState:{errors}
  }=useForm();

  const onSubmit=(data)=>{
    console.log(data);
  }

  watch("password");
  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg">

              {/* Header */}
              <div className="card-header bg-success text-white text-center py-4">
                <h3 className="fw-bold mb-0">Create Your EcoTrack Account</h3>
                <p className="mb-0 small">Join us in building a greener future 🌱</p>
              </div>

              {/* Body */}
              <div className="card-body p-4">

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      name='name'
                      {...register("name",{required:"name is required"})}
                    />

                   {errors.name && <small className="text-danger">{errors.name.message}</small>}

                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      name='email'
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Create a password"
                      name='password'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-enter password"
                      name="confirmPassword"
                    />
                  </div>

                   <div className="mb-3">
                    <label className="form-label">Phoneno</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your email"
                      name='phoneNo'
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg">
                      Register
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <a href="/login" className="text-success fw-semibold">
                      Login
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

export default Register;