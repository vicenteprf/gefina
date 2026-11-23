import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
import DashboardPage from './DashboardPage.tsx';
import InvoicePage from './InvoicePage.tsx';

export default function App() {
  function apply(state: boolean): string {
    const base =
      'block text-text-muted px-3 py-2 hover:bg-surface-raised hover:text-text rounded-control';

    if (state) return `${base} bg-surface-raised font-medium`;

    return base;
  }

  return (
    <BrowserRouter>
      <aside className="fixed w-60 h-full flex flex-col gap-8 p-6 border border-border bg-surface">
        <header className="text-xl font-semibold">Gefina</header>

        <nav className="menu">
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink
                className={({ isActive }) => apply(isActive)}
                to="/"
              >
                Painel Inicial
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => apply(isActive)}
                to="/faturas"
              >
                Faturas
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="ml-60 p-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/faturas" element={<InvoicePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
