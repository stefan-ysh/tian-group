export default function Loading() {
  return (
    <section className="mx-auto max-w-5xl py-8 sm:py-16 lg:py-20 px-6">
      <div className="animate-pulse">
        <header className="text-center">
          <div className="leading-tighter font-heading mx-auto mb-2 max-w-3xl px-4 h-8 bg-primary/10 rounded w-48"></div>
          <div className="h-64 md:h-96 max-w-3xl mx-auto mt-4 mb-6 bg-primary/10 rounded-md"></div>
        </header>
        <div className="mx-auto max-w-3xl px-6 space-y-4">
          <div className="h-5 bg-primary/10 rounded w-full"></div>
          <div className="h-5 bg-primary/10 rounded w-full"></div>
          <div className="h-5 bg-primary/10 rounded w-3/4"></div>
          <div className="h-5 bg-primary/10 rounded w-full"></div>
          <div className="h-5 bg-primary/10 rounded w-5/6"></div>
        </div>
      </div>
    </section>
  );
}
