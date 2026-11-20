import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MS Admin UI",
  description: "Administration UI",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
