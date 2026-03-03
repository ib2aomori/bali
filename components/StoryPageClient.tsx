"use client";

import Story from "@/components/Story";
import { checkStoryAccess } from "@/lib/session";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function StoryPageClient() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (checkStoryAccess()) {
      setAllowed(true);
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!allowed) return null;
  return <Story />;
}
