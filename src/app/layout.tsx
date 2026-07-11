import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata = {
  title: "HireTrack",
  description: "Recruitment Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}