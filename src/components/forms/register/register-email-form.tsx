"use client";

import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { VerifyTextInput } from "@/components/ui/verify-text-input";
import { sa_isEmailAvailable } from "@/lib/server-actions/auth";
import { preventEnterAction } from "@/lib/utils/form";
import {
  emailRegisterFormValues,
  emailRegisterSchema,
  emailSchema,
} from "@/types/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfDay, sub } from "date-fns";
import { Mail } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RegisterEmailFormProps {
  validUsername?: string | null;
}

export function RegisterEmailForm({ validUsername }: RegisterEmailFormProps) {
  const minDate = startOfDay(sub(new Date(), { years: 13, days: 1 }));
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<emailRegisterFormValues>({
    resolver: zodResolver(emailRegisterSchema),
    defaultValues: {
      username: validUsername ?? "",
      email: "",
      dob: minDate,
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    form.setValue("username", validUsername ?? "");
  }, [validUsername]);

  const verifyEmail = useCallback(async (newEmail: string) => {
    try {
      const email = emailSchema.parse(newEmail);
      const result = await sa_isEmailAvailable({ rawEmail: email });

      if (result.code === 200 && result.data) {
        return result.data.isAvailable;
      } else {
        console.log(result);
        return false;
      }
    } catch (ex) {
      if (ex instanceof z.ZodError) return false;
      console.error(ex);
      return false;
    }
  }, []);

  const handleSubmit = useCallback((values: emailRegisterFormValues) => {}, []);

  return (
    <Form {...form}>
      <form
        className="p-2 space-y-2 border-b-2 md:border-b-0 md:border-r-2 border-accent"
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <h3>Email Signup</h3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  readOnly
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <VerifyTextInput
                  type="email"
                  placeholder="name@domain.com"
                  disableEnter
                  /** @ts-ignore */
                  formRef={formRef}
                  verify={verifyEmail}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="font-primary-desc text-xs">
                Use a valid email, you will need to verify this to unlock your
                account
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <DatePickerInput
                  date={field.value}
                  onDateUpdate={(date) => form.setValue("dob", date ?? minDate)}
                  dateProps={{ hidden: { after: minDate } }}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="font-primary-desc text-xs"></FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  {...field}
                  validatePassword={true}
                  onKeyDown={preventEnterAction(() =>
                    formRef.current?.requestSubmit()
                  )}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password Again"
                  {...field}
                  onKeyDown={preventEnterAction(() =>
                    formRef.current?.requestSubmit()
                  )}
                  disabled={isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-x-2"
          disabled={isSubmitting}
        >
          <Mail className="w-4 h-4" />
          <span>Register with email</span>
        </Button>
      </form>
    </Form>
  );
}
