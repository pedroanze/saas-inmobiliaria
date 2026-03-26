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
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
