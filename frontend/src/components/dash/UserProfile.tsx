// components/UserProfile.tsx
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { User } from '../../services/Auth';

interface UserProfileProps {
  user: User | null;
  variant: 'mobile' | 'desktop';
}

const UserProfile: React.FC<UserProfileProps> = ({ user, variant }) => {
  return (
    <div className="p-4 border-t border-blue-800 bg-blue-950 bg-opacity-30">
      <div className="flex items-center">
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full mr-3 border-2 border-blue-600"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-3">
            <FiUser className="text-white" />
          </div>
        )}
        <div>
          <div className={`text-sm font-medium text-white truncate ${variant === 'desktop' ? 'max-w-[120px]' : ''}`}>
            {user?.first_name && user?.last_name 
              ? `${user.first_name} ${user.last_name}`
              : user?.username || 'Utilisateur'}
          </div>
          <div className={`text-xs text-blue-300 truncate ${variant === 'desktop' ? 'max-w-[120px]' : ''}`}>
            {user?.email || ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;