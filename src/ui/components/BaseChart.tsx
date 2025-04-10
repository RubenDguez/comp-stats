import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface BaseChartProps {
  title: string,
  data: Array<{ value: number }>;
}

export function BaseChart(props: BaseChartProps) {
  return (
    <div style={{ height: '100%', padding: '1rem' }}>
      <h4>{props.title}</h4>
      <h5>{props.data[0]?.value}%</h5>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart data={props.data}>
          <CartesianGrid stroke="#333" strokeDasharray="15 5" fill="#1c1c1c" />
          <Area
            fillOpacity={0.15}
            fill={"lightgreen"}
            stroke={"green"}
            strokeWidth={3}
            type={"monotone"}
            dataKey={"value"}
            isAnimationActive={false}
          />
          <XAxis stroke="transparent" height={0} />
          <YAxis domain={[0, 100]} stroke="transparent" width={0} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
