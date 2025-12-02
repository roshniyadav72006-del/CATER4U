import VerifyUI from "./VerifyUI";

export default async function Verify({ params }) {
  const { token } = await params;
  return <VerifyUI token={token} />;
}
