'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navItems = [
    { href: '/app', label: 'Dashboard' },
    { href: '/app/projects', label: 'Projects' },
    { href: '/app/jurisdictions', label: 'Jurisdictions' },
    { href: '/app/settings', label: 'Settings' },
  ];

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/app" className="flex items-center">
            <span className="text-xl font-semibold text-neutral-900">PermitFlow</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  pathname === item.href
                    ? 'text-primary-600 font-medium'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}