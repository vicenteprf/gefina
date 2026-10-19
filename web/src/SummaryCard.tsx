import type { SummaryCardProps } from './dashboardType.ts';

export default function SummaryCard(props: SummaryCardProps) {
    return (
        <div>
            <p>{props.label}</p>
            <p>{props.value}</p>
        </div>
    )
}