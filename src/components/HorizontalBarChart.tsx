import React from 'react';

interface BarData {
  label: string;
  score: number;
}

interface Props {
  data: BarData[];
}

export default function HorizontalBarChart({ data }: Props) {
  const maxScore = 1;

  return (
    <div className="space-y-2">
      {data.map((item) => {
        const percentage = (item.score / maxScore) * 100;

        return (
          <div key={item.label} className="flex flex-col">
            <div className="mb-1 flex justify-between">
              <span className="font-medium capitalize text-gray-700">
                {item.label}
              </span>
              <span className="text-gray-600">
                {(item.score * 100).toFixed(2)}%
              </span>
            </div>
            <div className="h-4 w-full rounded bg-gray-200">
              <div
                className="h-4 rounded bg-blue-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
