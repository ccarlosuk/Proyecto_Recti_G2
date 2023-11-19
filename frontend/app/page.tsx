import UNMSMLogo from '@/app/ui/unmsm-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

import Link from 'next/link';

import styles from '@/app/ui/home.module.css';

import Image from 'next/image';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6" >
            <div className="flex h-20 shrink-0 items-end rounded-lg p-4 md:h-42" style={{backgroundColor: "rgb(115, 32, 31)"}}>
                <UNMSMLogo />
            </div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg   md:w-2/5 md:px-10" style={{backgroundColor: "rgb(255,255,255)"}}>
                    <div className="flex items-center justify-center p-1 md:w-4/5 md:px-2 md:py-6">
                            <Image
                                src="/unmsm_logopng.png"
                                width={300}
                                height={300}
                                className="hidden md:block"
                                alt="Screenshots of the dashboard project showing desktop and mobile versions"
                            />
                    </div>

                    <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`} >
                        <strong>Bienvenidos.</strong> Este es el sistema de Rectificación{' '}
                        {/*<a href="https://nextjs.org/learn/" className="text-blue-500">
                            Next.js Learn Course
                        </a>*/}
                        de la facultad de Ingenieria de Sistemas e Informatica
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base" style={{backgroundColor: "rgb(115, 32, 31)"}}
                    >
                        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>


                <div className="flex items-center justify-center rounded-lg p-6 md:w-3/5 md:px-10 md:py-12" style={{backgroundColor: "rgb(255,255,255)"}}>
                    <Image
                        src="/facultad_sistemas.jpg"
                        width={1000}
                        height={760}
                        className="hidden md:block rounded-lg"
                        alt="Screenshots of the dashboard project showing desktop and mobile versions"
                    />
                    <Image
                        src="/hero-mobile.png"
                        width={560}
                        height={620}
                        className="block md:hidden"
                        alt="Screenshot of the dashboard project showing mobile version"
                    />
                </div>
            </div>
        </main>
    );
}
