import { AppHeader } from '@/features/header';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="dark flex min-h-screen flex-col bg-black text-white">
      <AppHeader />
      <Outlet />
    </div>
  );
}
