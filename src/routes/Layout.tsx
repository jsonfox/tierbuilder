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
    <div>
      <header className="flex justify-between px-8 py-4">
        <div className="flex items-center space-x-1 font-title">
          <img
            src="/logo.svg"
            alt="Tierbuilder logo"
            style={{ height: '3.5rem' }}
          />
          <h1
            className="mt-[-0.15em] text-center text-6xl"
            aria-label="Tierbuilder"
          >
            BUILDER
          </h1>
        </div>
        <nav className="flex items-center">
          <div className="space-x-4">
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
