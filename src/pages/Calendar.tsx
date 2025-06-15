
import React, { useState } from 'react';
import { ArrowLeft, Plus, ChevronLeft, ChevronRight, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import CalendarTodos from '@/components/CalendarTodos';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day' | 'google'>('month');
  const [progress, setProgress] = useState(0);

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getDateHeader = () => {
    if (view === 'google') {
      return 'Google Calendar';
    }
    
    const options: Intl.DateTimeFormatOptions = {};
    if (view === 'month') {
      options.month = 'long';
      options.year = 'numeric';
    } else if (view === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      options.weekday = 'long';
      options.month = 'long';
      options.day = 'numeric';
      options.year = 'numeric';
    }
    return currentDate.toLocaleDateString('en-US', options);
  };

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      {/* Header */}
      <header className="bg-[#0f6cbf] text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="h-12 w-12 flex items-center justify-center overflow-hidden">
                <Book className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold font-mono tracking-wider">mood</h1>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-white text-[#0f6cbf] hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Progress Bar - Full Width and Higher */}
        <div className="w-full bg-[#0f6cbf] px-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium">Daily Progress</span>
            <span className="text-lg font-bold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-8 bg-white/20" />
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Calendar Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              {view !== 'google' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateDate('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold text-[#0f6cbf] min-w-[200px] text-center">
                    {getDateHeader()}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateDate('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>
                </>
              )}
              {view === 'google' && (
                <h2 className="text-xl font-semibold text-[#0f6cbf]">
                  {getDateHeader()}
                </h2>
              )}
            </div>
            
            <div className="flex space-x-2">
              {(['day', 'week', 'month', 'google'] as const).map((viewType) => (
                <Button
                  key={viewType}
                  variant={view === viewType ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView(viewType)}
                  className={view === viewType ? 'bg-[#0f6cbf] hover:bg-[#0d5aa7]' : ''}
                >
                  {viewType === 'google' ? 'Google Calendar' : viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        {view === 'google' ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="calendar-container">
              <iframe 
                src="https://calendar.google.com/calendar/embed?src=b00807289%40essec.edu&ctz=Europe%2FParis"
                style={{ border: 0 }} 
                width="100%" 
                height="600" 
                frameBorder="0" 
                scrolling="no"
                title="Google Calendar"
                className="rounded-lg"
              />
            </div>
          </div>
        ) : (
          <CalendarTodos 
            currentDate={currentDate}
            view={view}
            onDateChange={setCurrentDate}
            onProgressUpdate={handleProgressUpdate}
          />
        )}
      </div>

      {/* Footer with Progress Bar */}
      <footer className="bg-[#0f6cbf] text-white shadow-lg mt-auto">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium">Overall Daily Progress</span>
            <span className="text-lg font-bold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-8 bg-white/20" />
        </div>
      </footer>
    </div>
  );
};

export default Calendar;
