export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col p-4">{children}</div>;
}
