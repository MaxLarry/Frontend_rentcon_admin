import React, { useState } from "react";
import axios from "axios";
import RentLogo from "../../img/rentconv2-fwhite.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await axios.post("/auth/login", { email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
      toast({
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex min-h-screen text-slate-100">
      <div className="hidden lg:flex flex-1 py-20 bg-gradient-to-r log-img">
        <div className="px-16">
          <img
            alt="Rent-Connect"
            src={RentLogo}
            className="mx-auto h-11 w-auto"
          />
        </div>
      </div>
      <div className="flex-1 flex-col flex p-5 items-center justify-center bg-neutral-950">
        <div className="w-full max-w-md space-y-6">
          <div className="mb-9">
            <div className="px-16">
              <img
                alt="Rent-Connect"
                src={RentLogo}
                className="mx-auto h-11 w-auto mb-10 lg:hidden"
              />
            </div>
            <h2 className="text-2xl font-bold">Admin Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address<span className="text-rose-600"> *</span>
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl bg-black border-gray-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password<span className="text-rose-600"> *</span>
                </label>
              </div>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="•••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl bg-zinc-950"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5 text-zinc-700" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5 text-zinc-700" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <Checkbox id="remember" className="h-4 w-4 border-teal-500" />
                <label htmlFor="remember" className="ml-2 text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            <div>
              <Button
                variant="default"
                type="submit"
                disabled={loading}
                className={`w-full justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 ${
                  loading
                    ? "bg-gray-600 text-gray-400 cursor-none"
                    : "bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-500 shadow-lg hover:shadow-teal-400 transition-all duration-300"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <ClipLoader color="#fff" size={20} />
                    Logging in
                  </span>
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
