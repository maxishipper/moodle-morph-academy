
import React from 'react';
import { X, Flame, Target, Calendar, BookOpen, Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserStatsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserStatsMenu = ({ isOpen, onClose }: UserStatsMenuProps) => {
  // Mock user data - in a real app this would come from a context/API
  const userData = {
    name: "Alex Johnson",
    avatar: "", // Empty for fallback
    streak: 7,
    streakChange: 2, // positive for increase, negative for decrease
    todosCompleted: 85,
    todosChange: 12,
    studyTime: 156, // minutes this week
    studyTimeChange: -23,
    lessonsCompleted: 24,
    lessonsChange: 5,
    examProgress: 78,
    examProgressChange: 8
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    unit, 
    change, 
    color = "text-[#0f6cbf]" 
  }: {
    icon: any;
    title: string;
    value: number;
    unit: string;
    change: number;
    color?: string;
  }) => {
    const isPositive = change >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    const trendColor = isPositive ? "text-green-500" : "text-red-500";
    const bgColor = isPositive ? "bg-green-50" : "bg-red-50";

    return (
      <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon className={`h-5 w-5 ${color}`} />
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${bgColor}`}>
            <TrendIcon className={`h-3 w-3 ${trendColor}`} />
            <span className={`text-xs font-semibold ${trendColor}`}>
              {isPositive ? '+' : ''}{change}
            </span>
          </div>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      
      {/* Sliding Menu */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-gray-50 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-[#0f6cbf] text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Progress</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="bg-white text-[#0f6cbf] font-semibold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{userData.name}</h3>
                <p className="text-blue-100 text-sm">Learning Enthusiast</p>
              </div>
            </div>
          </div>

          {/* Stats Content */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {/* Streak */}
            <StatCard
              icon={Flame}
              title="Study Streak"
              value={userData.streak}
              unit="days"
              change={userData.streakChange}
              color="text-orange-500"
            />

            {/* Todo Completion */}
            <StatCard
              icon={Target}
              title="Tasks Completed"
              value={userData.todosCompleted}
              unit="this week"
              change={userData.todosChange}
              color="text-green-600"
            />

            {/* Study Time */}
            <StatCard
              icon={Calendar}
              title="Study Time"
              value={userData.studyTime}
              unit="minutes"
              change={userData.studyTimeChange}
              color="text-purple-600"
            />

            {/* Lessons Completed */}
            <StatCard
              icon={BookOpen}
              title="Lessons Done"
              value={userData.lessonsCompleted}
              unit="this month"
              change={userData.lessonsChange}
              color="text-blue-600"
            />

            {/* Exam Progress */}
            <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Exam Readiness</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-green-50">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs font-semibold text-green-500">
                    +{userData.examProgressChange}%
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">{userData.examProgress}%</span>
                </div>
              </div>
              <Progress value={userData.examProgress} className="h-3" />
            </div>

            {/* Weekly Goal */}
            <div className="bg-gradient-to-r from-[#0f6cbf] to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5" />
                <span className="font-medium">Weekly Goal</span>
              </div>
              <p className="text-blue-100 text-sm mb-3">Complete 5 more study sessions to reach your goal!</p>
              <Progress value={71} className="h-2 bg-blue-800/30" />
              <p className="text-xs text-blue-200 mt-1">5/7 sessions completed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStatsMenu;
