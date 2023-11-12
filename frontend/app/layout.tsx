import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}
        <footer>
            Layout de la Raíz
        </footer>
        </body>
        </html>
    );
}
