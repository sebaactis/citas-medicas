import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ActionToolTipProps {
    children: React.ReactNode;
    label: string
    color: string
}

export default function ToolTipAction({ children, label, color }: ActionToolTipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <button className={`bg-${color}-600 dark:bg-${color}-500 hover:bg-${color}-700 dark:hover:bg-${color}-600 transition-all px-1.5 py-1 rounded-md text-white`}>
                        {children}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}