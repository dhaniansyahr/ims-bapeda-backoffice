"use client";

import Image from "next/image";

export default function Illustrations() {
    return (
        <div className="col-span-2 h-full">
            <div className="bg-foreground/80 h-full w-full rounded-2xl bg-[url('/illustrations.jpg')] bg-cover bg-center">
                <div className="h-full p-8">
                    <div className="flex h-full items-end justify-start">
                        <div className="mb-4">
                            <div className="mb-4 flex items-center gap-4">
                                <Image
                                    src="/logo.png"
                                    alt="illustration"
                                    width={240}
                                    height={240}
                                    className="h-10 w-auto"
                                />
                                <h2 className="text-4xl font-semibold text-white">
                                    IMS Adhi
                                </h2>
                            </div>
                            <p className="text-xl font-semibold text-white">
                                Sistem Absensi Online Magang
                            </p>
                            <p className="text-sm font-light text-white">
                                Sistem Absensi online magang bapeda adalah
                                sistem yang membantu dalam mengelola absensi
                                online magang bapeda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
