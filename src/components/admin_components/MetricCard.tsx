// import { ReactNode } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// interface MetricCardProps {
//   title: string;
//   value: string | number;
//   change?: string;
//   changeType?: 'positive' | 'negative' | 'neutral';
//   icon: ReactNode;
//   className?: string;
// }

// export function MetricCard({ 
//   title, 
//   value, 
//   change, 
//   changeType = 'neutral', 
//   icon, 
//   className 
// }: MetricCardProps) {
//   const changeColorClass = {
//     positive: 'text-success',
//     negative: 'text-destructive',
//     neutral: 'text-muted-foreground'
//   }[changeType];

//   return (
//     <Card className={cn("transition-all hover:shadow-md", className)}>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium text-muted-foreground">
//           {title}
//         </CardTitle>
//         <div className="text-muted-foreground">
//           {icon}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold text-foreground">{value}</div>
//         {change && (
//           <p className={cn("text-xs mt-1", changeColorClass)}>
//             {change}
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  className,
  onClick
}: MetricCardProps) {
  const changeColorClass = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground'
  }[changeType];

  // Format value as currency if it's a number, otherwise use as-is
  const displayValue = typeof value === 'number' ? `${value}` : value;

  return (
    <Card
      className={cn("transition-all hover:shadow-md", className, onClick && "cursor-pointer hover:bg-accent")}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{displayValue}</div>
        {change && (
          <p className={cn("text-xs mt-1", changeColorClass)}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}