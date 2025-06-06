import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Download, Play } from 'lucide-react';
import MediaModal from '../components/MediaModal';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  description?: string;
  likes: number;
  comments: number;
  uploadedAt: Date;
  isLiked?: boolean;
}

const Gallery: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'images' | 'videos'>('all');

  useEffect(() => {
    // Mock data - replace with Firebase fetch
    const mockMedia: MediaItem[] = [
      {
        id: '1',
        url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
        type: 'image',
        title: 'Golden Hour',
        description: 'Beautiful sunset over the mountains',
        likes: 24,
        comments: 8,
        uploadedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
        type: 'image',
        title: 'Ocean Waves',
        description: 'Peaceful morning by the sea',
        likes: 31,
        comments: 12,
        uploadedAt: new Date('2024-01-10'),
      },
      {
        id: '3',
        url: 'https://images.pexels.com/photos/1059249/pexels-photo-1059249.jpeg',
        type: 'image',
        title: 'Forest Path',
        description: 'A quiet walk through nature',
        likes: 18,
        comments: 5,
        uploadedAt: new Date('2024-01-08'),
      },
      {
        id: '4',
        url: 'https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg',
        type: 'image',
        title: 'City Lights',
        description: 'Urban nightscape',
        likes: 42,
        comments: 15,
        uploadedAt: new Date('2024-01-05'),
      },
      {
        id: '5',
        url: 'https://images.pexels.com/photos/1707915/pexels-photo-1707915.jpeg',
        type: 'image',
        title: 'Mountain Peak',
        description: 'Adventure awaits',
        likes: 35,
        comments: 9,
        uploadedAt: new Date('2024-01-03'),
      },
      {
        id: '6',
        url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg',
        type: 'image',
        title: 'Desert Dunes',
        description: 'Endless golden sands',
        likes: 27,
        comments: 7,
        uploadedAt: new Date('2024-01-01'),
      },
    ];
    setMedia(mockMedia);
  }, []);

  const filteredMedia = media.filter(item => {
    if (filter === 'all') return true;
    return filter === 'images' ? item.type === 'image' : item.type === 'video';
  });

  const handleLike = (id: string) => {
    setMedia(prev => prev.map(item => 
      item.id === id 
        ? { ...item, likes: item.isLiked ? item.likes - 1 : item.likes + 1, isLiked: !item.isLiked }
        : item
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold text-primary-700 dark:text-primary-400 mb-4">
          Welcome to Earl's Gallery
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-josefin max-w-2xl mx-auto">
          Discover a collection of captured moments, each telling a unique story through the lens of creativity and passion.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-1 shadow-sm">
          {['all', 'images', 'videos'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as typeof filter)}
              className={`px-6 py-2 rounded-md font-josefin font-medium transition-colors capitalize ${
                filter === filterType
                  ? 'bg-primary-700 text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in"
          >
            <div 
              className="relative aspect-square cursor-pointer overflow-hidden"
              onClick={() => setSelectedMedia(item)}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="w-12 h-12 text-white opacity-80" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-poppins font-semibold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-white/80 font-josefin text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center space-x-1 transition-colors ${
                      item.isLiked 
                        ? 'text-red-500' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${item.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-josefin">{item.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-josefin">{item.comments}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-accent-400 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMedia && (
        <MediaModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onLike={() => handleLike(selectedMedia.id)}
        />
      )}
    </div>
  );
};

export default Gallery;