import type { SummaryCardProps } from './dashboardType.ts';

export default function SummaryCard(props: SummaryCardProps) {
    return (
        <div className='card'>
            <p className='card-label'>{props.label}</p>
            <p className='numeric card-value'>{props.value}</p>
        </div>
    )
}