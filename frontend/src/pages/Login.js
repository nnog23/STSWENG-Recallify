import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-xs w-full">
          <h1 className="text-center text-2xl font-semibold mb-6" id="form-title">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          {/* Login Form */}
          {isLogin && (
            <div id="login-form">
              <form noValidate>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Email"
                />

                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Password"
                />

                <button
                  type="submit"
                  className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
                >
                  Login
                </button>
              </form>
            </div>
          )}

          {/* Sign Up Form */}
          {!isLogin && (
            <div id="signup-form">
              <form noValidate>
                <label
                  htmlFor="signup-username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="signup-username"
                  className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Username"
                />

                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Email"
                />

                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Password"
                />

                <button
                  type="submit"
                  className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}

          {/* Toggle Button */}
          <div className="text-center mt-4">
            <button
              onClick={toggleForm}
              className="text-gray-800 font-medium hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
