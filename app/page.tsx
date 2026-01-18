"use client";

import { useEffect, useState } from "react";

declare global {
interface Window {
Pi: any;
}
}

export default function HomePage() {
const [ready, setReady] = useState(false);
const [status, setStatus] = useState("");

useEffect(() => {
if (!window.Pi) return;

window.Pi.init({ version: "2.0", sandbox: false });

window.Pi.authenticate(["payments"]).then(() => {
setReady(true);
});
}, []);

const payWithPi = async () => {
setStatus("Opening Pi Wallet...");

await window.Pi.createPayment(
{
amount: 1,
memo: "Life with Pi - Test payment",
metadata: { app: "life-with-pi" },
},
{
onReadyForServerApproval: async (paymentId: string) => {
setStatus("Approving payment...");
await fetch("/api/pi/approve-payment", {
method: "POST",
body: JSON.stringify({ paymentId }),
});
},
onReadyForServerCompletion: async (
paymentId: string,
txid: string
) => {
setStatus("Completing payment...");
await fetch("/api/pi/complete-payment", {
method: "POST",
body: JSON.stringify({ paymentId, txid }),
});
setStatus("Payment completed ✅");
},
}
);
};

return (
<main style={{ padding: 40 }}>
<h1>Life with Pi</h1>
{ready ? (
<button onClick={payWithPi}>Pay with Pi</button>
) : (
<p>Authenticating Pi user...</p>
)}
{status && <p>{status}</p>}
</main>
);
}