import React from 'react';
import type { GitHubUser, GitHubRepo } from '../types';
import { Users, UserPlus, BookOpen, MapPin, Link as LinkIcon, Building2, Star, GitFork, ExternalLink, Code } from 'lucide-react';

interface ProfileProps {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export const Profile: React.FC<ProfileProps> = ({ user, repos }) => {
  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 12);

  return (
    <>
      {/* User */}
      <div className="bg-slate-800/70 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-6 md:p-8 mt-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
          
          {/* Av*/}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <img 
              src={user.avatar_url} 
              alt={`${user.login} avatar`}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-slate-900"
            />
          </div>

          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
              {user.name || user.login}
            </h1>
            <a rel="noopener noreferrer" 
              href={user.html_url} 
              target="_blank" 
              className="text-blue-400 hover:text-blue-300 font-medium mb-4 flex items-center gap-1 transition-colors">
              @{user.login}
            </a>

            {user.bio && (
              <p className="text-slate-300 text-lg mb-6 max-w-2xl leading-relaxed">
                {user.bio}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                <Users className="w-5 h-5 text-violet-400" />
                <span className="font-semibold text-white">{user.followers.toLocaleString()}</span>
                <span className="text-slate-400 text-sm">Followers</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                <UserPlus className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">{user.following.toLocaleString()}</span>
                <span className="text-slate-400 text-sm">Following</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-white">{user.public_repos.toLocaleString()}</span>
                <span className="text-slate-400 text-sm">Repositories</span>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-300">
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{user.location}</span>
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{user.company}</span>
                </div>
              )}
              {user.blog && (
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 truncate transition-colors">
                    {user.blog}
                  </a>
                </div>
              )}
              {user.twitter_username && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 truncate transition-colors">
                    @{user.twitter_username}
                  </a>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>

      {/* Repo */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>Top Repositories</span>
          <span className="text-sm font-normal bg-blue-500/20 text-blue-400 py-1 px-3 rounded-full">
            {repos.length} total
          </span>
        </h2>
        
        {repos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No public repositories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRepos.map((repo, idx) => (
              <a rel="noopener noreferrer" 
                href={repo.html_url} 
                target="_blank" 
                key={repo.id}
                className="bg-slate-800/70 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-6 flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(59,130,246,0.2)] hover:border-blue-500/30 transition-all duration-300 group"
                style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1" title={repo.name}>
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-blue-400 shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                
                <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                  {repo.description || 'No description provided.'}
                </p>
                
                <div className="flex items-center justify-between text-xs font-medium text-slate-300 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-slate-100 transition-colors">
                      <GitFork className="w-4 h-4 text-slate-400" />
                      {repo.forks_count}
                    </span>
                  </div>
                  
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-violet-400" />
                      {repo.language}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
