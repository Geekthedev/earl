import React, { useEffect } from 'react';
import { X, Heart, MessageCircle, Share2, Download, Calendar } from 'lucide-react';
import { format } from 'date-fns';

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

interface MediaModalProps {
  media: MediaItem;
  onClose: () => void;
  onLike: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({ media, onClose, onLike }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Media Display */}
          <div className="flex-1 bg-black flex items-center justify-center">
            {media.type === 'image' ? (
              <img
                src={media.url}
                alt={media.title}
                className="max-w-full max-h-[60vh] lg:max-h-[80vh] object-contain"
              />
            ) : (
              <video
                src={media.url}
                controls
                className="max-w-full max-h-[60vh] lg:max-h-[80vh] object-contain"
              />
            )}
          </div>

          {/* Content Panel */}
          <div className="lg:w-80 p-6 flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white mb-2">
                {media.title}
              </h2>
              
              {media.description && (
                <p className="text-neutral-600 dark:text-neutral-400 font-josefin mb-4">
                  {media.description}
                </p>
              )}

              <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-500 mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                {format(media.uploadedAt, 'MMMM d, yyyy')}
              </div>

              {/* Mock Comments Section */}
              <div className="space-y-4 mb-6">
                <h3 className="font-poppins font-semibold text-neutral-900 dark:text-white">
                  Comments
                </h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3">
                    <p className="text-sm font-josefin text-neutral-800 dark:text-neutral-200">
                      "Absolutely stunning capture! The lighting is perfect."
                    </p>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500">- Anonymous</span>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3">
                    <p className="text-sm font-josefin text-neutral-800 dark:text-neutral-200">
                      "This brings back so many memories. Beautiful work!"
                    </p>
                    <span className="text-xs text-neutral-500 dark:text-neutral-500">- Anonymous</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={onLike}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      media.isLiked 
                        ? 'bg-red-50 text-red-500 dark:bg-red-900/20' 
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${media.isLiked ? 'fill-current' : ''}`} />
                    <span className="font-josefin">{media.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-josefin">{media.comments}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-accent-50 dark:hover:bg-accent-900/20 text-accent-500 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Comment Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-josefin text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-josefin text-sm transition-colors">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;