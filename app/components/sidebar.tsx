"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSidebarState } from "@/app/hooks/useSidebarState";
import * as React from "react";
import Divider from "./divider";
import { GetSession } from "@/actions/get-session";

interface props {
  categories: { slug: string; name: string }[] | [];
}

export default function Sidebar({ categories }: props) {
  const { isOpen, setIsOpen } = useSidebarState();
  const [role, setRole] = React.useState<string | null>(null);

  const FetchRole = async () => {
    const session = await GetSession();
    if (session) {
      setRole(session.user.role);
    }
  };

  React.useEffect(() => {
    FetchRole()
  },[])

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-background border border-border rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`
      fixed top-0 left-0 z-20 h-full w-full md:w-64 bg-background border-r border-border
      transform transition-transform duration-300 ease-in-out overflow-y-auto 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0
    `}
      >
        <div className="p-4 pt-16 md:pt-4">
          <div className="relative my-4">
            <Link
              href="/"
              className={` mx-0 text-2xl font-bold font-mono transition-transform duration-300 ${
                isOpen ? "translate-x-64 md:translate-x-0" : "translate-x-0"
              }`}
            >
              DevMode
            </Link>
          </div>
          <h2 className="text-xl font-bold mb-4 font-mono">Categories</h2>
          <ul className="space-y-2 max-h-96 overflow-y-scroll">
            {categories.length > 0
              ? categories.map((category: { slug: string; name: string }) => (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-muted-foreground hover:text-foreground transition-colors font-mono"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              : null}
          </ul>
          <Divider />
          {role && (
            <ul className="space-y-2 flex flex-col justify-center items-center">
              <Link
                href={`/profile`}
                className="text-muted-foreground hover:text-foreground transition-colors font-mono"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                href={`/profile/posts`}
                className="text-muted-foreground hover:text-foreground transition-colors font-mono"
                onClick={() => setIsOpen(false)}
              >
                My Posts
              </Link>
              {role == "admin" ? (
                <Link
                  href={`/profile`}
                  className="text-muted-foreground hover:text-foreground transition-colors font-mono"
                  onClick={() => setIsOpen(false)}
                >
                  Manage
                </Link>
              ) : null}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
