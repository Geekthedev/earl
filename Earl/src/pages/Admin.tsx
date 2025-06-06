import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Upload, Image, Video, Trash2, Eye, BarChart3, Users, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'stats'>('upload');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    // Mock upload process
    setTimeout(() => {
      setUploading(false);
      alert(`Successfully uploaded ${files.length} file(s)`);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const mockMedia = [
    { id: '1', title: 'Golden Hour', type: 'image', views: 124, likes: 24, date: '2024-01-15' },
    { id: '2', title: 'Ocean Waves', type: 'image', views: 98, likes: 31, date: '2024-01-10' },
    { id: '3', title: 'Forest Path', type: 'image', views: 67, likes: 18, date: '2024-01-08' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 font-josefin">
          Manage your gallery content and view analytics
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg w-fit">
        {[
          { id: 'upload', label: 'Upload', icon: Upload },
          { id: 'manage', label: 'Manage', icon: Image },
          { id: 'stats', label: 'Analytics', icon: BarChart3 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-josefin font-medium transition-colors ${
              activeTab === id
                ? 'bg-white dark:bg-neutral-700 text-primary-700 dark:text-primary-400 shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragOver
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-neutral-300 dark:border-neutral-600'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-4 rounded-full">
                <Upload className="w-8 h-8 text-primary-700 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-xl font-poppins font-semibold text-neutral-900 dark:text-white mb-2">
                  Drop files here or click to upload
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-josefin">
                  Support for images and videos up to 50MB
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-primary-700 hover:bg-primary-800 disabled:bg-primary-400 text-white font-josefin font-medium px-6 py-3 rounded-lg transition-colors"
              >
                {uploading ? 'Uploading...' : 'Choose Files'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
            <h3 className="font-poppins font-semibold text-neutral-900 dark:text-white mb-4">
              Upload Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-josefin font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Default Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-josefin focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter default title..."
                />
              </div>
              <div>
                <label className="block text-sm font-josefin font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-josefin focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Enter description..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="watermark"
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="watermark" className="text-sm font-josefin text-neutral-700 dark:text-neutral-300">
                  Add watermark to downloads
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Tab */}
      {activeTab === 'manage' && (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 dark:bg-neutral-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-josefin font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Media
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-josefin font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-josefin font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-josefin font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Likes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-josefin font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-josefin font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {mockMedia.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-600 rounded-lg flex items-center justify-center">
                            {item.type === 'image' ? (
                              <Image className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                            ) : (
                              <Video className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-josefin font-medium text-neutral-900 dark:text-white">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-josefin font-medium rounded-full ${
                        item.type === 'image' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-josefin text-neutral-900 dark:text-white">
                      {item.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-josefin text-neutral-900 dark:text-white">
                      {item.likes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-josefin text-neutral-500 dark:text-neutral-400">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-full">
                <Image className="w-6 h-6 text-primary-700 dark:text-primary-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-josefin text-neutral-600 dark:text-neutral-400">Total Media</p>
                <p className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-accent-100 dark:bg-accent-900/20 p-3 rounded-full">
                <Eye className="w-6 h-6 text-accent-700 dark:text-accent-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-josefin text-neutral-600 dark:text-neutral-400">Total Views</p>
                <p className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white">1,247</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-josefin text-neutral-600 dark:text-neutral-400">Total Likes</p>
                <p className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white">387</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-josefin text-neutral-600 dark:text-neutral-400">Unique Visitors</p>
                <p className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white">92</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;