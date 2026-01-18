export async function POST(req: Request) {
const { paymentId, txid } = await req.json();

const res = await fetch(
`https://api.minepi.com/v2/payments/${paymentId}/complete`,
{
method: "POST",
headers: {
Authorization: `Key ${process.env.PI_API_KEY}`,
"Content-Type": "application/json",
},
body: JSON.stringify({ txid }),
}
);

return new Response(JSON.stringify(await res.json()));
}