import AccountPage from "@/components/main/profile-components/AccountPage";


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccountPage>{children}</AccountPage>;
}