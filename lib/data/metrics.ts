export type MetricItem = {
  label: string;
  value: number;
  prefix?: string;
  suffix: string;
  meta: string;
};

export const metrics: MetricItem[] = [
  { label: "Prime Contracts Awarded", value: 47, suffix: "", meta: "Since Inception" },
  { label: "Employee Retention", value: 96, suffix: "%", meta: "Rolling 12-Month" },
  { label: "Team Members", value: 320, suffix: "+", meta: "National Workforce" },
  { label: "Contract Value", value: 180, prefix: "$", suffix: "M", meta: "FY 2026" },
  { label: "Satisfaction", value: 99, suffix: "%", meta: "Client Surveys" },
  { label: "Years in Business", value: 14, suffix: "", meta: "Continuously Operating" },
];
