"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, isAdmin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      if (isAdmin) {
        router.push("/admin");
      } else {
        setError("You don't have admin privileges");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    // ... similar to your sign-in page but with admin-specific messaging
  );
} 