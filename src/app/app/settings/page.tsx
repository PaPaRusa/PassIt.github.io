'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [supabase]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-neutral-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Settings</h1>
        <p className="text-neutral-600">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Profile</h2>
        <div className="space-y-6">
          <Input
            label="Email"
            type="email"
            value={user?.email || ''}
            disabled
          />
          <p className="text-sm text-neutral-600">
            To change your email address, please contact support.
          </p>
        </div>
      </Card>

      {/* Billing */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Billing</h2>
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-1">Free Trial</h3>
              <p className="text-sm text-neutral-600">14 days remaining</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="text-sm text-neutral-600 mb-4">
            Your trial includes 10 risk analyses per month and access to all core features.
          </p>
          <Button>Upgrade to Professional</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <h3 className="font-medium text-neutral-900">Delete Account</h3>
              <p className="text-sm text-neutral-600">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="danger" size="sm">Delete</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}