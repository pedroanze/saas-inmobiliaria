import { Button } from '@/components/ui/button';

export default function App() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8">
      <div className="bg-surface shadow-float relative w-full max-w-md overflow-hidden rounded-sm p-8">
        <div className="via-primary/30 absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent to-transparent"></div>

        <div className="mt-2 mb-8 space-y-2 text-center">
          <h1 className="text-on-surface text-2xl font-bold">
            Minimalismo Suave
          </h1>
          <p className="text-secondary text-sm">
            Pawn Shop SaaS Design System Preview
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-secondary text-[13px] font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="bg-surface-container-high focus:border-primary focus:bg-surface focus:ring-primary text-on-surface w-full rounded-sm border border-transparent px-4 py-2.5 text-[15px] transition-all duration-200 outline-none focus:ring-1"
            />
          </div>

          <Button className="w-full">Sign In</Button>
        </div>
      </div>
    </div>
  );
}
