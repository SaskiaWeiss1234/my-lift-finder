import VerifyEmailForm from "@/components/VerifyEmailForm";


export default async function VerifyEmailPage({ searchParams }) {
    const { token } = await searchParams;
    return <VerifyEmailForm token={token} />;
}