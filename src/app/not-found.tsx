import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative">
        <h1 className="text-9xl font-extrabold tracking-tighter bg-linear-to-r from-green-500 to-green-400 bg-clip-text text-transparent select-none">
          404
        </h1>
        <div className="absolute -top-6 -right-6 text-green-500 rotate-12 bg-secondary p-3 rounded-full">
          <FileQuestion className="w-10 h-10" />
        </div>
      </div>

      <div className="space-y-2 max-w-150">
        <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground text-lg">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed, renamed, or doesn't exist.
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild variant="default" size="lg" className="gap-2">
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
