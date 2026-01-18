import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
title: "Life with Pi",
description: "Life with Pi App",
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body>
<Script
src="https://sdk.minepi.com/pi-sdk.js"
strategy="beforeInteractive"
/>
{children}
</body>
</html>
);
}