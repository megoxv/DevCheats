import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-6 mx-auto">
            <p className="text-center text-sm leading-loose text-muted-foreground">
                Built by the community. Open source on GitHub.
            </p>
            <Link
                href="https://github.com/megoxv/DevCheats"
                className="sm:hidden flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
                <Github className="h-5 w-5" />
                <span>Contribute</span>
            </Link>
        </div>
    </footer>
    )
}