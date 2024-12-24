"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function UserDropdownMenu() {
  const pathname = usePathname();
  // const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isOpen) setIsOpen(false);
  // }, [status, pathname]);

  // if (status === "loading")
  //   return <Loader2 className="w-4 h-4 mr-6 animate-spin" />;

  // if (status === "unauthenticated") {
  //   return (
  //     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
  //       <DropdownMenuTrigger asChild>
  //         <Button
  //           className="flex items-center justify-start gap-2 py-1 px-2"
  //           variant="accent"
  //         >
  //           <User2 className="w-4 h-4" />
  //           <span>Sign In Now!</span>
  //           <ChevronDown className="w-4 h-4" />
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent>
  //         <DropdownMenuItem asChild>
  //           <Link href="/auth/login">Log In</Link>
  //         </DropdownMenuItem>
  //         <DropdownMenuItem asChild>
  //           <Link href="/auth/register">Register now for free!</Link>
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   );
  // }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center justify-start gap-2 py-1 px-2"
          variant="accent"
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-pink-400">BM</AvatarFallback>
          </Avatar>
          <span>blm456</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Account
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/account/settings">Account Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/security">Security Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/auth/logout">Log Out</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
