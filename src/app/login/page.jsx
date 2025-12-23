"use client";
import GoogleButton from "@/components/auth/GoogleButton";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter()
  const callBack = params.get("callbackUrl") || "";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      // redirect: false,
      callbackUrl: params.get("callback") || "/",
    });

    if (!result.ok) {
      Swal.fire("Error", "Email or password not matched. Try Google Login or Register", "error");
    } else {
      Swal.fire("Success", "Welcome to Kidz Hub", "success");
      router.push(callBack);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <GoogleButton />

          <p className="text-center mt-2">
            Don’t have an account?{" "}
            <Link
              href={`/register?callbackUrl=${callBack}`}
              className="link link-primary"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
