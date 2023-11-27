'use client';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
//import AcmeLogo from '@/app/ui/acme-logo';
import UnmsmLogo from '@/app/ui/unmsm-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import axios from "@/app/api/apiR";
import {useRouter} from "next/navigation";

export default function SideNav() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Realizar una solicitud al endpoint de logout en tu servidor
            await axios.post('http://localhost:8080/api/logout')
                .then((res) => {
                    // Después de cerrar sesión con éxito, redirigir al usuario a la página de inicio de sesión
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                });


        } catch (error) {
            console.error('Error al cerrar sesión:', error.response?.data || error.message);
            // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
    };

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
                style={{ background: '#6d1115' }}
            >
                <div className="w-32 text-white md:w-40">
                    <UnmsmLogo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form>
                    <button onClick={handleLogout} className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Cerrar Sesión</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
