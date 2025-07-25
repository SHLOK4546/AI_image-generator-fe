import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { logo } from './assets';
import { Home, CreatePost } from './page';

const App = () => (
  <BrowserRouter>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 bg-gray-900 shadow-lg rounded-b-2xl border-b-4 border-indigo-700">
        <Link to="/" className="flex items-center space-x-2">
          {/* <img src={logo} alt="Logo" className="h-8 w-8" /> */}
          <span className="text-2xl font-extrabold text-white">PromptPix</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-lg text-gray-300 hover:text-indigo-400 transition">Home</Link>
          <Link
            to="/create-post"
            className="inline-block bg-indigo-700 hover:bg-indigo-600 text-white font-medium px-4 sm:px-6 py-2 rounded-xl shadow-lg transition"
          >
            Create Post
          </Link>
        </div>
        <button className="md:hidden p-2 focus:outline-none">
          <Menu className="h-6 w-6 text-gray-300 hover:text-teal-400 transition" />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 mt-4 py-4 shadow-inner border-t border-gray-700">
        <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto text-center text-gray-400 text-sm px-4">
          © 2025 PromptPix. All rights reserved.
        </div>
      </footer>
    </div>
  </BrowserRouter>
);

export default App;
