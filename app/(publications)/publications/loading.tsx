export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl p-0 md:py-12 md:px-6">
      <div className="py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-56 bg-gray-50 dark:bg-gray-700/50 rounded"></div>
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border border-gray-100 dark:border-gray-700 p-5 bg-gray-50/60 dark:bg-gray-800/40">
                <div className="h-5 w-3/4 bg-gray-50 dark:bg-gray-700/50 rounded mb-3"></div>
                <div className="h-4 w-1/3 bg-gray-50 dark:bg-gray-700/50 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-50 dark:bg-gray-700/50 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-50 dark:bg-gray-700/50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
