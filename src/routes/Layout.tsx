import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from '../redux/hooks';
import { RESET } from '../redux/actions';
import { ButtonHTMLAttributes } from 'react';

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadExample = () => {
    dispatch({ type: RESET });
    navigate('/builder');
  };

  return (
    <div className="flex min-h-[100vh] select-none flex-col">
      <header className="flex flex-col items-center justify-between space-y-3 p-2 md:flex-row md:px-8 md:py-4">
        <div className="font-title flex w-full items-center justify-center space-x-2 md:w-auto">
          <img
            className="h-10 md:h-14"
            src="/logo.svg"
            alt="Tierbuilder logo"
          />
          <h1
            className="mt-[-0.15em] text-center text-5xl md:text-6xl"
            aria-label="Tierbuilder"
          >
            BUILDER
          </h1>
        </div>
        <nav className="flex items-center">
          <div className="md:space-x-4">
            <NavButton onClick={() => navigate('/')}>
              Create New Template
            </NavButton>
            <NavButton onClick={() => loadExample()}>
              Use Example Template
            </NavButton>
          </div>
        </nav>
      </header>
      <div className="container mx-auto py-6">
        <Outlet />
      </div>
    </div>
  );
}

function NavButton(props: ButtonHTMLAttributes<unknown>) {
  return (
    <button
      className="rounded-sm bg-none py-1 px-3 outline outline-1 outline-black hover:bg-neutral-100 active:translate-y-[1px]"
      {...props}
    />
  );
}
