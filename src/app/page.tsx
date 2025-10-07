'use client';
import * as React from 'react';
import packageJson from '../../package.json';
import { Logo } from '@/components/ui/logo';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Card className="flex flex-col items-center justify-center gap-4">
        <CardContent>
          <div className="flex items-center gap-4">
            <Logo variant="icon" width={64} height={64} />
            <div>
              <h1 className="text-2xl font-bold">Algenium UI </h1>
              <Badge>v{packageJson.version}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
