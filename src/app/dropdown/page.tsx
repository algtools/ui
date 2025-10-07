'use client';

import { Input } from '@/components/ui/input';
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function DropdownPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
      <Input type="text" placeholder="Enter your name" />
      <Button variant="outline">Click me</Button>
    </div>
  );
}
