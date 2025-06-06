import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Camera, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-full">
              <Camera className="w-8 h-8 text-primary-700 dark:text-primary-400" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-poppins font-bold text-neutral-900 dark:text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-josefin">
            Access your gallery management panel
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-accent-50 dark:bg-accent-900/20 rounded-lg">
            <p className="text-sm font-josefin text-accent-800 dark:text-accent-200 font-medium mb-2">
              Demo Credentials:
            </p>
            <p className="text-sm font-josefin text-accent-700 dark:text-accent-300">
              Email: earl@example.com<br />
              Password: password
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm font-josefin">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-josefin font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-josefin focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-josefin font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-josefin focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-700 hover:bg-primary-800 disabled:bg-primary-400 text-white font-josefin font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;