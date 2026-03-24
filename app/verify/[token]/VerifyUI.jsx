export default function VerifyUI({ token }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Email Verification</h2>
      <p>Token: {token}</p>
      <p>Verification successful</p>
    </div>
  );
}