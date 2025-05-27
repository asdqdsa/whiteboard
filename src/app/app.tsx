import { AppHeader } from '@/features/header';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className='bg-amber-100 min-h-screen flex flex-col'>
      <AppHeader />
      <Outlet />
    </div>
  );
}
