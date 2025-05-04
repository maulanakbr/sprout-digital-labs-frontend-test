interface BaseStatRowProps {
  label: string;
  value: number;
  isTotal?: boolean;
}

export default function BaseStatRow({ label, value, isTotal = false }: BaseStatRowProps) {
  const max = isTotal ? 720 : 255;
  const percent = Math.min((value / max) * 100, 100);

  const barColor = isTotal ? 'bg-purple-600 font-bold' : value > 60 ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span
          className={`capitalize font-medium text-gray-400 ${isTotal ? 'text-base font-bold' : ''}`}
        >
          {label}
        </span>
        <span className={`text-sm ${isTotal ? 'font-bold' : 'font-semibold'} text-gray-900`}>
          {value}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} transition-all`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
