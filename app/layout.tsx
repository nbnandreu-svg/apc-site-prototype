import type { Metadata } from 'next';
import './globals.css';
import './sections.css';
export const metadata: Metadata = {
  title: 'Агропромцифра | Цифровизация АПК',
  description:
    'Единый центр компетенций в цифровизации агропромышленного комплекса',
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
