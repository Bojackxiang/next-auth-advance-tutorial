import React, { useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from "react-hook-form";
import { twofactorSchema } from '@/schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from '../ui/input';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '../ui/button';
import loginWithTwoDigits from '@/actions/login-with-two-digits';

interface LoginFormTwoFactorsInput {
  email: string;
  password: string;
}

const LoginFormTwoFactorsInput: React.FC<LoginFormTwoFactorsInput> = (props) => {
  const { email, password } = props;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof twofactorSchema>>({
    resolver: zodResolver(twofactorSchema),
    defaultValues: {
      twoFacorCode: "",
    },
  });

  const onSubmit = (value: z.infer<typeof twofactorSchema>) => {
    setError("")

    startTransition(() => {
      loginWithTwoDigits(form.getValues().twoFacorCode, email, password)
        .then((data) => {
          if (data?.error) {
            setError(data?.error)
          }
        })
        .catch(error => {
          setError(error.message)
        })
    })
  }

  return (
    < Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="twoFacorCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="6 digitals code "
                    type="code"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button className="w-full" type="submit" disabled={isPending}>
          Verify
        </Button>
      </form>
    </Form>
  )
}

export default LoginFormTwoFactorsInput