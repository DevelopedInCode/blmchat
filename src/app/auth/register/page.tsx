import { RegisterForm } from "@/components/forms/register/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StyledLink } from "@/components/ui/styled-link";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>BLMChat Registration</CardTitle>
        <CardDescription className="font-primary-desc text-xs">
          First find a username, then either complete the form or choose another
          option below to register faster!
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2">
        <RegisterForm />
        <div className="p-2 space-y-2">
          <Button className="w-full">Register with Discord</Button>
          <Button className="w-full">Register with Google</Button>
          <Button className="w-full">Register with Steam</Button>
          <Button className="w-full">Register with Twitch</Button>
        </div>
        <p className="col-span-full font-primary-desc text-sm text-red-600 text-center">
          By making an account and using this app, you agree to our terms of
          service and privacy policy
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-center text-xs w-full">
          Already have an account?{" "}
          <StyledLink href="/auth/login" variant="underlined" weight="medium">
            Log In Here!
          </StyledLink>
        </p>
      </CardFooter>
    </Card>
  );
}
