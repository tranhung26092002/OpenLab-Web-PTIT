import React, { useState, useEffect, useMemo } from "react";
import style from "./ChartBlock.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface ChartBlockProps {
  title: string;
  dataKey: string;
  data: number | null;
  color: string;
  maxDataPoints?: number;
}

interface ChartData {
  name: string;
  timestamp: string;
  [key: string]: string | number;
}

const ChartBlock: React.FC<ChartBlockProps> = ({
  title,
  dataKey,
  data,
  color,
  maxDataPoints = 10,
}) => {
  const [chartData, setChartData] = useState<ChartData[]>(() => {
    const initialData = Array(maxDataPoints).fill(null).map((_, index) => ({
      name: `Point ${index + 1}`,
      timestamp: new Date(Date.now() - (maxDataPoints - index - 1) * 1000).toISOString(),
      [dataKey]: 0,
    }));
    return initialData;
  });

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  useEffect(() => {
    setChartData((prevData) => {
      const newData = [...prevData];
      if (newData.length >= maxDataPoints) {
        newData.shift();
      }

      const currentTimestamp = new Date().toISOString();
      newData.push({
        name: `Point ${newData.length + 1}`,
        timestamp: currentTimestamp,
        [dataKey]: data ?? 0,
      });

      return newData;
    });
  }, [data, dataKey, maxDataPoints]);

  const chartMin = useMemo(() => Math.min(...chartData.map(item => Number(item[dataKey]))), [chartData, dataKey]);
  const chartMax = useMemo(() => Math.max(...chartData.map(item => Number(item[dataKey]))), [chartData, dataKey]);

  return (
    <div className={style.Chart}>
      <h3 className={style.ChartTitle}>{title}</h3>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="timestamp"
            tickFormatter={formatTimestamp}
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={[Math.floor(chartMin * 0.9), Math.ceil(chartMax * 1.1)]}
            width={60}
          />
          <Tooltip
            labelFormatter={formatTimestamp}
            contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={300}
          />
          <ReferenceLine 
            y={data ?? 0} 
            stroke={color}
            strokeDasharray="3 3"
            label={{ 
              value: `Current: ${data ?? 0}`,
              position: 'right',
              fill: color 
            }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBlock;