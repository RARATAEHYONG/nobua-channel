"use client";

import Link from "next/link";
import { Menu, X, Youtube } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/data/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link href="/" aria-label="のぶあチャンネル ホーム" onClick={closeMenu}>
          <Logo size="sm" />
        </Link>

        <nav
          aria-label="メインナビゲーション"
          className="hidden items-center gap-10 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-bold tracking-widest text-white/90 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="https://www.youtube.com/channel/UCfiCrUkkcrlJO_JflFKgBow"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 font-sans text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90"
          >
            <Youtube size={18} aria-hidden="true" />
            登録する
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center border border-white/10 text-white lg:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav
          aria-label="モバイルナビゲーション"
          className="border-t border-white/10 bg-background px-6 py-5 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-white/10 py-4 font-sans text-sm font-bold tracking-widest text-white/90 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://www.youtube.com/channel/UCfiCrUkkcrlJO_JflFKgBow"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-4 flex items-center justify-center gap-2 bg-accent px-5 py-3 font-sans text-sm font-bold tracking-wide text-white"
            >
              <Youtube size={18} aria-hidden="true" />
              登録する
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
