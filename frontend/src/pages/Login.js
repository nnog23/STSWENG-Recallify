import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate(); // Replacing useHistory with useNavigate
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear any previous errors when toggling forms
    setSuccess(""); // Clear success message
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Dynamically update the correct field based on `id`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:8000/login" : "http://localhost:8000/signup";  //remove localhost when deployed
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        setSuccess(data.message); // Assuming the API sends a success message
        setError(""); // Clear any previous errors

        // Redirect to a new page after successful login/signup
        if (isLogin) {
          // Assuming the response contains the user ID or other relevant data
          const userId = data.userId; // Adjust based on actual response
          navigate(`/users/${userId}/decks/decklist`); // Redirect to the user dashboard
        }
      } else {
        setError(data.message); // Assuming the API sends an error message
        setSuccess(""); // Clear success message
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setSuccess(""); // Clear success message
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-xs w-full">
          <h1 className="text-center text-2xl font-semibold mb-6" id="form-title">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          {/* Error or Success Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          {/* Login Form */}
          {isLogin && (
            <div id="login-form">
              <form onSubmit={handleSubmit} noValidate>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Email"
                />

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
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
              <form onSubmit={handleSubmit} noValidate>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Username"
                />

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                  required
                  placeholder="Email"
                />

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
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