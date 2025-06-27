// components/GlobalRouteLoader.tsx
"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalRouteLoader() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();


    useEffect(() => {
        setLoading(true);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500); // adjust duration as needed

        return () => clearTimeout(timeout);
    }, [pathname]);

    return loading ? (
        <div className="fixed top-0 left-0 z-50 w-full h-1 bg-blue-600 animate-pulse" />
    ) : null;
}