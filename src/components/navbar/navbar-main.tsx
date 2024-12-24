import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { UserDropdownMenu } from "./user-dropdown";

export function NavbarComponent() {
  return (
    <>
      <Button variant="outline" size="icon" className="sm:hidden">
        <Menu className="w-4 h-4" />
      </Button>
      <div className="hidden sm:flex sticky top-0 left-0 px-8 py-2 items-center gap-x-4 bg-accent/40 shadow-lg mb-4 backdrop-blur-lg z-[100]">
        <Link
          href="/"
          className="font-primary-title text-3xl font-extrabold text-muted drop-shadow-lg"
        >
          BLMChat
        </Link>

        <div className="ml-auto">
          <UserDropdownMenu />
        </div>
      </div>
    </>
  );
}
