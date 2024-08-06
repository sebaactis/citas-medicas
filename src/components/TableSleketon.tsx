export default function TableSkeleton() {
    return (
        <div className="animate-pulse mx-2">
            <div className="h-10 md:h-16 bg-gray-200 dark:bg-gray-700 mt-0 md:mt-3 mb-6 rounded"></div>
            <div className="h-10 md:h-16 bg-gray-300 dark:bg-gray-800 mb-6 rounded"></div>
            <div className="h-10 md:h-16 bg-gray-200 dark:bg-gray-700 mb-6 rounded"></div>
            <div className="h-10 md:h-16 bg-gray-300 dark:bg-gray-800 mb-6 rounded"></div>
            <div className="h-10 md:h-16 bg-gray-200 dark:bg-gray-700 mb-6 rounded"></div>
            <div className="h-10 md:h-16 bg-gray-300 dark:bg-gray-800 mb-6 rounded"></div>
        </div>
    )
}