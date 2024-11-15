"use client"

import Link from "next/link";

export default function End() {

    return (
        <div>
            <h2>Thank you, a therapist will be in touch</h2>
            <Link href="/end/report">
                <button className="mt-12 w-full py-2 rounded-full bg-primary text-white font-medium">
                    See Report
                </button>
            </Link>
        </div>
    );
}