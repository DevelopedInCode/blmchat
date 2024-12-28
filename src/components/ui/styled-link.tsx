import { cn } from "@/lib/utils/misc";
import { cva, VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import React from "react";

const linkVariants = cva("", {
  variants: {
    variant: {
      default: "",
      underlined: "underline hover:no-underline",
    },
    weight: {
      default: "",
      medium: "font-medium",
    },
  },
  defaultVariants: {
    variant: "default",
    weight: "default",
  },
});

type ILinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode | undefined;
  } & React.RefAttributes<HTMLAnchorElement>;

interface StyledLinkProps
  extends ILinkProps,
    VariantProps<typeof linkVariants> {}

export const StyledLink = React.forwardRef<HTMLAnchorElement, StyledLinkProps>(
  ({ variant, weight, className, ...props }, ref) => (
    <Link
      className={cn(linkVariants({ variant, weight }), className)}
      {...props}
      ref={ref}
    />
  )
);
