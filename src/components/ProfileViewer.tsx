import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { Search, AlertCircle } from 'lucide-react';
import type { GitHubUser, GitHubRepo } from '../types';
import { Profile } from './Profile';

export const ProfileViewer: React.FC = () => {
  const [username, setUsername] = useState('');
  const [searchInput] = useState('');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [reposData, setReposData] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchProfile = async (user: string) => {
    if (!user.trim()) return;
    
    setLoading(true);
    setError(null);
    setUserData(null);
    setReposData([]);

    try {
      const token = import.meta.env.TOKEN;
      const headers = token ? { Authorization: `token ${token}` } : undefined;

      const [userRes, reposRes] = await Promise.all([
        axios.get<GitHubUser>(`https://api.github.com/users/${user}`, { headers }),
        axios.get<GitHubRepo[]>(`https://api.github.com/users/${user}/repos?per_page=100`, { headers })
      ]);
      
      setUserData(userRes.data);
      setReposData(reposRes.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('User not found. Please check the username and try again.');
        } else if (err.response?.status === 403) {
          setError('API rate limit exceeded.');
        } else {
          setError('An unexpected error occurred while fetching the data.');
        }
      } else {
        setError('An unexpected error occurred while fetching the data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(searchInput);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchProfile(username);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* Search*/}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-8">
            <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 tracking-tight">
              Profile Viewer
            </h1>
          </div>
  
          <form onSubmit={handleSearch} className="w-full max-w-2xl relative flex items-center group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Search GitHub username..."
              className="bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-xl text-slate-50 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.3)] w-full pl-12 pr-32 py-4 text-lg font-medium placeholder-slate-500 shadow-xl"
            />
            <button
              type="submit"
              disabled={loading || username.trim() === ''}
              className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200"
            >
              Search
            </button>
          </form>
        </div>

        <main className="min-h-[400px]">
          {/* Loader */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-4 h-4 rounded-full bg-[#4285F4] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-4 h-4 rounded-full bg-[#EA4335] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-4 h-4 rounded-full bg-[#FBBC05] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-4 h-4 rounded-full bg-[#34A853] animate-bounce" style={{ animationDelay: '450ms' }}></div>
              </div>
              <p className="text-slate-400 font-medium">Bleep bloop, fetching data...</p>
            </div>
          )}
          
          {/* Error*/}
          {error && !loading && (
            <div className="bg-slate-800/70 backdrop-blur-md border border-red-500/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl max-w-2xl mx-auto p-6 md:p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h2>
              <p className="text-slate-400">{error}</p>
            </div>
          )}
          
          {/* Valid Render */}
          {userData && !loading && !error && (
            <div className="space-y-8">
              <Profile user={userData} repos={reposData} />
            </div>
          )}
        </main>

        <footer className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 font-medium">
          <a href="{'https://github.com/akashb8'}" className= "hover:text-slate-200 transition-colors">&copy; Akash Bhattacharyya</a>
        </footer>
      </div>
    </>
  );
};
