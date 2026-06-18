import AccountDeletion from "../components/Policies/AccountDeletion";

export const metadata = {
  title: "Account Deletion Policy",
  description:
    "Request the deletion of your Accredian account. Learn about what data is deleted, what data is retained, and how deletion requests are processed.",
};

export default function AccountDeletionPage() {
  return <AccountDeletion />;
}
