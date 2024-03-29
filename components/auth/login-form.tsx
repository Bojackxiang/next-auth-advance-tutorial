"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { loginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import LoginFormTwoFactorsInput from "./login-form-two-factors-input";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const [twoFactors, setTwoFactors] = useState(false)
  const loginError = searchParams.get("error")
    ? "Email Already used with other provider!"
    : "";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error)
        }

        if (data.success) {
          setSuccess(data.success)
        }

        if (data.twoFactors) {
          setTwoFactors(true)
        }
      }).catch(e => {
        setError("Something went wrong")
      })
    });
  };

  return (
    <CardWrapper
      headLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      {
        twoFactors ? <LoginFormTwoFactorsInput email={form.getValues().email} password={form.getValues().password} /> : < Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="john@email.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <Button className="px-0 font-bold" size={'sm'} variant={'link'} asChild>
                      <Link href="/auth/reset">Forgot password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || loginError} />
            <FormSuccess message={success} />
            <Button className="w-full" type="submit" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      }

    </CardWrapper >
  );
};

export default LoginForm;
