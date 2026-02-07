export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl p-0 md:py-12 md:px-6">
      <div className="py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-40 bg-gray-50 dark:bg-gray-700/50 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 bg-gray-50/60 dark:bg-gray-800/40">
                <div className="h-40 w-full bg-gray-50 dark:bg-gray-700/50 rounded mb-4"></div>
                <div className="h-4 w-1/2 bg-gray-50 dark:bg-gray-700/50 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-50 dark:bg-gray-700/50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
