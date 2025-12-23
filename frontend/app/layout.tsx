import "./globals.css";
import "./styles/styleguide.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "SpotJam Legacy Export (EN Slugs)", description: "Pages converted from 2.zip with English slugs" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return (<html lang="ja"><body>{children}</body></html>); }
