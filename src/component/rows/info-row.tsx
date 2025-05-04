import * as React from 'react';

interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[120px_1fr] w-full gap-4">
      <span className="font-medium text-gray-400">{label}</span>
      <span className="text-gray-900">{value || '-'}</span>
    </div>
  );
}
