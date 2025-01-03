interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="w-full flex justify-center p-8">{children}</div>;
}
