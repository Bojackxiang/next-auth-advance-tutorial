"use client";

import ResetPasswordForm from "@/components/auth/reset-password-form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NewPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");

  useEffect(() => {
    // check if password token in url
    if (!token) {
      setError("Missing token!");
      return 
    }

    // check if password token in db 

  }, [token]);




  return <div>
    {
      token ? <ResetPasswordForm/> : <div>{error}</div>
    }
    
  </div>;
};

export default NewPasswordPage;
