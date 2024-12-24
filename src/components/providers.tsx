"use client";

import { Toaster } from "@/components/ui/sonner";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProvidersWrapperProps {
  session?: Session | null;
  children?: React.ReactNode;
}

export function ProvidersWrapper({ session, children }: ProvidersWrapperProps) {
  return (
    <>
      <SessionProvider session={session}>
        {children}
        <Toaster richColors />
      </SessionProvider>
    </>
  );
}
