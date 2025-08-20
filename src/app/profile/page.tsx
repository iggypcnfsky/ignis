"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  User, 
  Camera, 
  MapPin, 
  Calendar,
  Flame,
  Trophy,
  Settings,
  LogOut,
  Trash2,
  Download,
  HelpCircle,
  Eye,
  EyeOff,
  Bell,
  BellOff,
  Edit3,
  Save,
  X,
  Users,
  Lightbulb,
  MessageCircle,
  AlertTriangle,
  Crown
} from "lucide-react";
import SharedHeader from "@/components/SharedHeader";
import { 
  demoUserProfile, 
  profileEditFields
} from "@/lib/demoProfile";

export default function ProfilePage() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(demoUserProfile);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setVisibleCards(prev => new Set([...prev, cardId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // Show initially visible elements after DOM ready
    const timeout = setTimeout(() => {
      const initiallyVisible = new Set(['header', 'profile-info', 'activity-summary']);
      setVisibleCards(initiallyVisible);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const cardRef = (element: HTMLElement | null, cardId: string) => {
    if (element && observerRef.current) {
      element.setAttribute('data-card-id', cardId);
      observerRef.current.observe(element);
    }
  };

  const handleSave = () => {
    // TODO: Save profile changes to backend
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(demoUserProfile);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Deleting account...');
    setShowDeleteConfirm(false);
  };

  const handleLogout = () => {
    // TODO: Implement logout
    console.log('Logging out...');
  };



  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users size={16} className="text-[#FF8400]" />;
      case 'Eye': return <Eye size={16} className="text-[#FF8400]" />;
      case 'Lightbulb': return <Lightbulb size={16} className="text-[#FF8400]" />;
      case 'MessageCircle': return <MessageCircle size={16} className="text-[#FF8400]" />;
      default: return <Trophy size={16} className="text-[#FF8400]" />;
    }
  };



  return (
    <div className="min-h-screen bg-black">
      <SharedHeader mode="back" backHref="/" />
      
      <div className="pt-20 pb-2 px-3">
        {/* Header */}
        <div
          ref={(el) => cardRef(el, 'header')}
          className={`transform transition-all duration-500 ease-out ${
            visibleCards.has('header') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-white font-display text-[32px] text-center mb-2">
            Profile
          </h1>
          <p className="text-gray-400 text-[14px] text-center mb-6">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Information */}
        <div
          ref={(el) => cardRef(el, 'profile-info')}
          className={`transform transition-all duration-700 ease-out mb-6 ${
            visibleCards.has('profile-info') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="bg-[#2a2a2a] rounded-[30px] p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User size={18} className="text-[#FF8400]" strokeWidth={1.7} />
                <h3 className="text-white font-medium text-[16px]">Profile Information</h3>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#1f1f1f] text-gray-300 text-[12px] hover:bg-[#353535] transition-colors"
                >
                  <Edit3 size={12} />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#1f1f1f] text-gray-300 text-[12px] hover:bg-[#353535] transition-colors"
                  >
                    <X size={12} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FF8400] text-white text-[12px] hover:bg-[#FF6600] transition-colors"
                  >
                    <Save size={12} />
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center text-center mb-4">
              {/* Profile Image */}
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF8400] to-[#FF2F00] flex items-center justify-center">
                  <User size={32} className="text-white" strokeWidth={2} />
                </div>
                {isEditing && (
                  <button
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FF8400] flex items-center justify-center"
                    aria-label="Change profile picture"
                  >
                    <Camera size={12} className="text-white" />
                  </button>
                )}
              </div>

              {/* Account Type Badge */}
              <div className="mb-3">
                <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                  editedProfile.accountType === 'user' 
                    ? 'bg-green-900/20 text-green-400 border border-green-400/20'
                    : 'bg-orange-900/20 text-orange-400 border border-orange-400/20'
                }`}>
                  {editedProfile.accountType === 'user' ? 'Verified User' : 'Guest Account'}
                </span>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="text-gray-400 text-[12px] mb-1 block">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#1f1f1f] rounded-lg px-3 py-2 text-white text-[14px] border border-gray-600 focus:border-[#FF8400] focus:outline-none"
                    maxLength={profileEditFields.name.maxLength}
                    placeholder={profileEditFields.name.placeholder}
                  />
                ) : (
                  <p className="text-white text-[14px]">{editedProfile.name}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="text-gray-400 text-[12px] mb-1 block">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full bg-[#1f1f1f] rounded-lg px-3 py-2 text-white text-[14px] border border-gray-600 focus:border-[#FF8400] focus:outline-none resize-none"
                    rows={3}
                    maxLength={profileEditFields.bio.maxLength}
                    placeholder={profileEditFields.bio.placeholder}
                  />
                ) : (
                  <p className="text-gray-300 text-[14px]">{editedProfile.bio}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="text-gray-400 text-[12px] mb-1 block">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-[#1f1f1f] rounded-lg px-3 py-2 text-white text-[14px] border border-gray-600 focus:border-[#FF8400] focus:outline-none"
                    maxLength={profileEditFields.location.maxLength}
                    placeholder={profileEditFields.location.placeholder}
                  />
                ) : (
                  <div className="flex items-center gap-1 text-gray-300 text-[14px]">
                    <MapPin size={12} strokeWidth={1.5} />
                    {editedProfile.location}
                  </div>
                )}
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-1 text-gray-400 text-[12px]">
                <Calendar size={12} strokeWidth={1.5} />
                Joined {new Date(editedProfile.joinDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div
          ref={(el) => cardRef(el, 'activity-summary')}
          className={`transform transition-all duration-700 ease-out mb-6 ${
            visibleCards.has('activity-summary') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="bg-[#2a2a2a] rounded-[30px] p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-[#FF8400]" strokeWidth={1.7} />
                <h3 className="text-white font-medium text-[16px]">Activity Summary</h3>
              </div>
              <Link
                href="/leaderboard"
                className="flex items-center gap-1 text-[#FF8400] text-[12px] hover:underline"
              >
                <Flame size={12} />
                {editedProfile.totalPoints.toLocaleString()} pts
              </Link>
            </div>

            {/* Contribution Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#1f1f1f] rounded-lg p-3 text-center">
                <div className="text-white text-[18px] font-bold">{editedProfile.contributions.problems}</div>
                <div className="text-gray-400 text-[12px]">Problems</div>
              </div>
              <div className="bg-[#1f1f1f] rounded-lg p-3 text-center">
                <div className="text-white text-[18px] font-bold">{editedProfile.contributions.ideas}</div>
                <div className="text-gray-400 text-[12px]">Ideas</div>
              </div>
              <div className="bg-[#1f1f1f] rounded-lg p-3 text-center">
                <div className="text-white text-[18px] font-bold">{editedProfile.contributions.meetups}</div>
                <div className="text-gray-400 text-[12px]">Meetups</div>
              </div>
              <div className="bg-[#1f1f1f] rounded-lg p-3 text-center">
                <div className="text-white text-[18px] font-bold">{editedProfile.contributions.chatMessages}</div>
                <div className="text-gray-400 text-[12px]">Messages</div>
              </div>
            </div>

            {/* Recent Achievements */}
            {editedProfile.achievements.length > 0 && (
              <div>
                <h4 className="text-white text-[14px] font-medium mb-2">Recent Achievements</h4>
                <div className="space-y-2">
                  {editedProfile.achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-2 bg-[#1f1f1f] rounded-lg">
                      {getAchievementIcon(achievement.icon)}
                      <div className="flex-1">
                        <div className="text-white text-[12px] font-medium">{achievement.title}</div>
                        <div className="text-gray-400 text-[10px]">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Management */}
        <div
          ref={(el) => cardRef(el, 'account-management')}
          className={`transform transition-all duration-700 ease-out mb-6 ${
            visibleCards.has('account-management') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="bg-[#2a2a2a] rounded-[30px] p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={18} className="text-[#FF8400]" strokeWidth={1.7} />
              <h3 className="text-white font-medium text-[16px]">Account Management</h3>
            </div>

            <div className="space-y-3">
              {/* Authentication Status */}
              {editedProfile.accountType === 'guest' && (
                <button className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-[#FF8400] to-[#FF6600] rounded-lg text-white hover:from-[#FF6600] hover:to-[#FF4400] transition-all">
                  <div className="text-left">
                    <div className="font-medium text-[14px]">Upgrade Account</div>
                    <div className="text-[12px] opacity-90">Create full account to sync across devices</div>
                  </div>
                  <Crown size={18} />
                </button>
              )}

              {/* Privacy Settings */}
              <div className="p-3 bg-[#1f1f1f] rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {editedProfile.preferences.profileVisibility === 'public' ? (
                      <Eye size={16} className="text-green-400" />
                    ) : (
                      <EyeOff size={16} className="text-gray-400" />
                    )}
                    <span className="text-white text-[14px]">Public Profile</span>
                  </div>
                  <button
                    onClick={() => setEditedProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        profileVisibility: prev.preferences.profileVisibility === 'public' ? 'private' : 'public'
                      }
                    }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      editedProfile.preferences.profileVisibility === 'public' 
                        ? 'bg-[#FF8400]' 
                        : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      editedProfile.preferences.profileVisibility === 'public' 
                        ? 'translate-x-6' 
                        : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="p-3 bg-[#1f1f1f] rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {editedProfile.preferences.notifications.weeklyDigest ? (
                      <Bell size={16} className="text-blue-400" />
                    ) : (
                      <BellOff size={16} className="text-gray-400" />
                    )}
                    <span className="text-white text-[14px]">Weekly Digest</span>
                  </div>
                  <button
                    onClick={() => setEditedProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        notifications: {
                          ...prev.preferences.notifications,
                          weeklyDigest: !prev.preferences.notifications.weeklyDigest
                        }
                      }
                    }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      editedProfile.preferences.notifications.weeklyDigest 
                        ? 'bg-[#FF8400]' 
                        : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      editedProfile.preferences.notifications.weeklyDigest 
                        ? 'translate-x-6' 
                        : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Actions */}
        <div
          ref={(el) => cardRef(el, 'critical-actions')}
          className={`transform transition-all duration-700 ease-out mb-8 ${
            visibleCards.has('critical-actions') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="bg-[#2a2a2a] rounded-[30px] p-4">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle size={18} className="text-[#FF8400]" strokeWidth={1.7} />
              <h3 className="text-white font-medium text-[16px]">Support & Actions</h3>
            </div>

            <div className="space-y-3">
              {/* Help & Support */}
              <button className="w-full flex items-center gap-3 p-3 bg-[#1f1f1f] rounded-lg text-white hover:bg-[#353535] transition-colors">
                <HelpCircle size={16} className="text-blue-400" />
                <span className="text-[14px]">Help & Support</span>
              </button>

              {/* Export Data */}
              <button className="w-full flex items-center gap-3 p-3 bg-[#1f1f1f] rounded-lg text-white hover:bg-[#353535] transition-colors">
                <Download size={16} className="text-green-400" />
                <span className="text-[14px]">Export My Data</span>
              </button>

              {/* Logout */}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 bg-[#1f1f1f] rounded-lg text-white hover:bg-[#353535] transition-colors"
              >
                <LogOut size={16} className="text-orange-400" />
                <span className="text-[14px]">Logout</span>
              </button>

              {/* Delete Account */}
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center gap-3 p-3 bg-red-900/20 border border-red-400/20 rounded-lg text-red-400 hover:bg-red-900/30 transition-colors"
              >
                <Trash2 size={16} />
                <span className="text-[14px]">Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#2a2a2a] rounded-[20px] p-6 max-w-sm w-full">
            <h3 className="text-white font-medium text-[18px] mb-2">Delete Account</h3>
            <p className="text-gray-300 text-[14px] mb-4">
              This action cannot be undone. All your contributions, points, and data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 px-4 bg-[#1f1f1f] text-white rounded-lg hover:bg-[#353535] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
