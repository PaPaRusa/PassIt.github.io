'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold text-neutral-900">PermitFlow</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/product" className="text-sm text-neutral-600 hover:text-neutral-900">
              Product
            </Link>
            <Link href="/pricing" className="text-sm text-neutral-600 hover:text-neutral-900">
              Pricing
            </Link>
            <Link href="/security" className="text-sm text-neutral-600 hover:text-neutral-900">
              Security
            </Link>
            <Link href="/case-studies" className="text-sm text-neutral-600 hover:text-neutral-900">
              Case Studies
            </Link>
            <Link href="/contact" className="text-sm text-neutral-600 hover:text-neutral-900">
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}