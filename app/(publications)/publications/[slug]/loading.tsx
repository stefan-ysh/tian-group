export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl py-8 sm:py-16 lg:py-20 px-6">
      <div className="animate-pulse">
        <div className="prose-md container prose prose-lg mx-auto mt-8 space-y-4">
          <div className="h-8 bg-primary/20 rounded-md w-3/4 mx-auto"></div>
          <div className="h-4 bg-primary/10 rounded w-full"></div>
          <div className="h-4 bg-primary/10 rounded w-full"></div>
          <div className="h-4 bg-primary/10 rounded w-3/4"></div>
          <div className="h-4 bg-primary/10 rounded w-5/6"></div>
          <div className="h-4 bg-primary/10 rounded w-full"></div>
          <div className="h-4 bg-primary/10 rounded w-full"></div>
          <div className="h-64 bg-primary/10 rounded-md my-8"></div>
          <div className="h-4 bg-primary/10 rounded w-full"></div>
          <div className="h-4 bg-primary/10 rounded w-full"></div>
          <div className="h-4 bg-primary/10 rounded w-5/6"></div>
        </div>
      </div>
    </section>
  );
}
