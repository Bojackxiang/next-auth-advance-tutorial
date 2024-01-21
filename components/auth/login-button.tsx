"use client";


import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

interface LoginBUttonProps extends PropsWithChildren {
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginBUtton = ({ mode = "redirect", asChild, children }: LoginBUttonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login")
  }

  if(mode ==="modal"){
    return <span>
      Todo:
    </span>
  }


  return <span onClick={onClick} className="cursor-pointer">
    {children}
  </span>;
};

export default LoginBUtton;
