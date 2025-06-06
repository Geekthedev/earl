import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Sun, Moon, User, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Camera className="w-8 h-8 text-primary-700 dark:text-primary-400 group-hover:text-accent-400 transition-colors" />
            <span className="text-2xl font-poppins font-bold text-primary-700 dark:text-primary-400 group-hover:text-accent-400 transition-colors">
              Earl
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`font-josefin font-medium transition-colors ${
                !isAdmin
                  ? 'text-primary-700 dark:text-primary-400'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-700 dark:hover:text-primary-400'
              }`}
            >
              Gallery
            </Link>

            {user && (
              <Link
                to="/admin"
                className={`font-josefin font-medium transition-colors ${
                  isAdmin
                    ? 'text-primary-700 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-700 dark:hover:text-primary-400'
                }`}
              >
                Admin
              </Link>
            )}

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                ) : (
                  <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                )}
              </button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                    <User className="w-4 h-4 text-primary-700 dark:text-primary-400" />
                    <span className="text-sm font-josefin text-primary-700 dark:text-primary-400">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-josefin font-medium transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;