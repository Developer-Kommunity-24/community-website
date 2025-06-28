"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const isDark = resolvedTheme === "dark";

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label="Toggle theme"
			className="cursor-pointer"
		>
			{isDark ? (
				<Moon className="h-[1.2rem] w-[1.2rem] transition-transform rotate-0 scale-100" />
			) : (
				<Sun className="h-[1.2rem] w-[1.2rem] transition-transform rotate-0 scale-100" />
			)}
		</Button>
	);
}
