import ResetPasswordForm from "@/components/ResetPasswordForm";


export default async function ResetPasswordPage({ searchParams }) {
    const { token } =  await searchParams;
    return <ResetPasswordForm token={token} />;
}