import type { SummaryCardProps } from './dashboardType.ts';

export default function SummaryCard(props: SummaryCardProps) {
    return (
        <div>
            <p>{props.label}</p>
            <p className='numeric'>{props.value}</p>
        </div>
    )
}