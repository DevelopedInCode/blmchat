import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Authorization Error",
};

type ErrorMessageType = keyof typeof ErrorMessages;
const ErrorMessages = {
  OAuthSignin: "Internal error constructing authorization URL",
  OAuthCallback: "Internal error handling OAuth provider response",
  OAuthCreateAccount: "Could not create OAuth provider user in the database",
  EmailCreateAccount: "Could not create email provider user in the database",
  Callback: "Error in the OAuth callback handler route",
  OAuthAccountNotLinked: "The email on the account exists for another account",
  EmailSignIn: "Sending the email with the verification token failed",
  CredentialsSignIn: "Invalid username or password",
  SessionRequired:
    "The contents of the current page requires you to be signed in",
  Default: "Internal server error occurred",
};

interface AuthErrorPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  let error = (await searchParams).error;
  if (!error) error = "Default";
  const errorMessage = ErrorMessages[error as ErrorMessageType];
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Authorization Error</CardTitle>
        <CardDescription className="font-primary-desc">
          An error occurred while processing your auth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3>{error}</h3>
        <p>{errorMessage}</p>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-4">
        <Button asChild>
          <Link href="/">Homepage</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/register">Register</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
