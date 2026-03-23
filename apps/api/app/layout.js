import "./globals.css";
import AnalyticsClientTracker from "@/components/AnalyticsClientTracker";

export const metadata = {
  title: "DefenseIQ",
  description: "DefenseIQ Cybersecurity Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsClientTracker />
        {children}
      </body>
    </html>
  );
}