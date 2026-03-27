import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export default function DashboardLayout() {
  return (
    <div className="bg-background flex min-h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        {/* Main scrollable area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* Outlet is where child routes render */}
          <div className="px-6 py-6 lg:px-8">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
