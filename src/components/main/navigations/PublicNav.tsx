"use client";

import { publicNavigations } from "@/utils/common/publicNavigationsLink";
import Link from "next/link";

const PublicNav = () => {
  return (
    <nav className="flex gap-6">
      {Object.entries(publicNavigations).map(([key, nav]) => (
        <Link
          key={key}
          href={nav.path}
          className="text-sm font-medium hover:underline text-gray-700"
        >
          {nav.name}
        </Link>
      ))}
    </nav>
  );
};

export default PublicNav;
