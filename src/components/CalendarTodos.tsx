
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Check, Trash2, Calendar as CalendarIcon, Clock, MapPin, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  completed: boolean;
  createdAt: Date;
}

interface CalendarTodosProps {
  onProgressUpdate?: (newProgress: number) => void;
  currentDate?: Date;
  view?: 'month' | 'week' | 'day';
  onDateChange?: (date: Date) => void;
}

const CalendarTodos = ({ onProgressUpdate, currentDate, view = 'month', onDateChange }: CalendarTodosProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(currentDate || new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    description: '', 
    startTime: '09:00', 
    endTime: '10:00', 
    location: '' 
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [completedAnimation, setCompletedAnimation] = useState<string | null>(null);

  const selectedDateString = selectedDate?.toDateString() || '';
  const eventsForSelectedDate = events.filter(event => event.date === selectedDateString);
  const completedEvents = eventsForSelectedDate.filter(event => event.completed);
  const totalEvents = eventsForSelectedDate.length;

  const dailyProgress = totalEvents > 0 ? (completedEvents.length / totalEvents) * 100 : 0;

  useEffect(() => {
    if (onProgressUpdate && totalEvents > 0) {
      onProgressUpdate(dailyProgress);
    }
  }, [dailyProgress, onProgressUpdate, totalEvents]);

  useEffect(() => {
    if (currentDate) {
      setSelectedDate(currentDate);
    }
  }, [currentDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateChange?.(date);
    }
  };

  const addEvent = () => {
    if (!newEvent.title.trim()) return;

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: selectedDateString,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      location: newEvent.location,
      completed: false,
      createdAt: new Date()
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({ title: '', description: '', startTime: '09:00', endTime: '10:00', location: '' });
    setShowAddForm(false);
    toast.success('Event added!');
  };

  const updateEvent = () => {
    if (!editingEvent || !newEvent.title.trim()) return;

    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id 
        ? { 
            ...event, 
            title: newEvent.title,
            description: newEvent.description,
            startTime: newEvent.startTime,
            endTime: newEvent.endTime,
            location: newEvent.location
          }
        : event
    ));
    
    setEditingEvent(null);
    setNewEvent({ title: '', description: '', startTime: '09:00', endTime: '10:00', location: '' });
    toast.success('Event updated!');
  };

  const toggleEvent = (id: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === id) {
        const updatedEvent = { ...event, completed: !event.completed };
        if (updatedEvent.completed) {
          setCompletedAnimation(id);
          setTimeout(() => setCompletedAnimation(null), 1000);
          toast.success('Great job! Event completed! 🎉', {
            duration: 2000,
          });
        }
        return updatedEvent;
      }
      return event;
    }));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast.success('Event deleted');
  };

  const startEditing = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description || '',
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location || ''
    });
  };

  const getDatesWithEvents = () => {
    const dates = new Set(events.map(event => event.date));
    return Array.from(dates).map(dateString => new Date(dateString));
  };

  const renderTimeSlots = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const todayEvents = eventsForSelectedDate.sort((a, b) => a.startTime.localeCompare(b.startTime));

    return (
      <div className="space-y-1">
        {hours.map(hour => {
          const timeString = `${hour.toString().padStart(2, '0')}:00`;
          const eventsAtTime = todayEvents.filter(event => 
            event.startTime <= timeString && event.endTime > timeString
          );

          return (
            <div key={hour} className="flex items-center border-b border-gray-100 py-1">
              <div className="w-16 text-xs text-gray-500 flex-shrink-0">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              <div className="flex-1 ml-4 min-h-[32px] flex items-center">
                {eventsAtTime.map(event => (
                  <div
                    key={event.id}
                    className={`
                      px-2 py-1 rounded text-xs mr-2 cursor-pointer
                      ${event.completed 
                        ? 'bg-green-100 text-green-800 line-through' 
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }
                    `}
                    onClick={() => toggleEvent(event.id)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = new Date(selectedDate || new Date());
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    return (
      <div className="bg-white border rounded-lg p-4">
        <div className="grid grid-cols-8 gap-2">
          <div className="font-semibold text-sm"></div>
          {Array.from({ length: 7 }, (_, i) => {
            const day = new Date(weekStart);
            day.setDate(weekStart.getDate() + i);
            return (
              <div key={i} className="text-center border-r last:border-r-0">
                <div className="font-semibold text-sm">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="text-lg">{day.getDate()}</div>
              </div>
            );
          })}
          {Array.from({ length: 24 }, (_, hour) => (
            <React.Fragment key={hour}>
              <div className="text-xs text-gray-500 py-2 border-r">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              {Array.from({ length: 7 }, (_, day) => {
                const currentDay = new Date(weekStart);
                currentDay.setDate(weekStart.getDate() + day);
                const dayEvents = events.filter(event => 
                  event.date === currentDay.toDateString() &&
                  parseInt(event.startTime.split(':')[0]) === hour
                );

                return (
                  <div key={day} className="border-l border-t h-12 relative border-r last:border-r-0">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className={`
                          absolute inset-x-1 top-1 px-1 py-0.5 rounded text-xs cursor-pointer
                          ${event.completed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                          }
                        `}
                        onClick={() => toggleEvent(event.id)}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderCalendarView = () => {
    if (view === 'day') {
      return (
        <div className="bg-white border rounded-lg p-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">{selectedDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {renderTimeSlots()}
          </div>
        </div>
      );
    }

    if (view === 'week') {
      return renderWeekView();
    }

    return (
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border p-3"
        modifiers={{
          hasEvents: getDatesWithEvents()
        }}
        modifiersStyles={{
          hasEvents: { 
            backgroundColor: '#0f6cbf', 
            color: 'white',
            fontWeight: 'bold'
          }
        }}
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!currentDate && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#0f6cbf] flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2" />
            Calendar & Events
          </h3>
          <div className="text-right">
            <div className="text-sm text-gray-600">Daily Progress</div>
            <div className="text-lg font-bold text-[#0f6cbf]">{Math.round(dailyProgress)}%</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="space-y-4">
          {renderCalendarView()}
          {view === 'month' && (
            <div className="text-sm text-gray-600 text-center">
              Dates with events are highlighted in blue
            </div>
          )}
        </div>

        {/* Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">
              Events for {selectedDate?.toLocaleDateString()}
            </h4>
            <Dialog open={showAddForm || editingEvent !== null} onOpenChange={(open) => {
              if (!open) {
                setShowAddForm(false);
                setEditingEvent(null);
                setNewEvent({ title: '', description: '', startTime: '09:00', endTime: '10:00', location: '' });
              }
            }}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setShowAddForm(true)}
                  size="sm"
                  className="bg-[#0f6cbf] hover:bg-[#0d5aa7]"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      placeholder="Event title..."
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (optional)</Label>
                    <Input
                      id="location"
                      placeholder="Event location..."
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Event description..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={editingEvent ? updateEvent : addEvent} 
                      className="flex-1"
                      disabled={!newEvent.title.trim()}
                    >
                      {editingEvent ? 'Update Event' : 'Add Event'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {totalEvents > 0 && (
            <div className="bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {eventsForSelectedDate.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No events for this date. Add one to get started!
              </div>
            ) : (
              eventsForSelectedDate
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((event) => (
                <div
                  key={event.id}
                  className={`
                    p-3 border rounded-lg transition-all duration-300 
                    ${event.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-[#0f6cbf]'
                    }
                    ${completedAnimation === event.id 
                      ? 'animate-scale-in transform scale-105' 
                      : ''
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEvent(event.id)}
                        className={`
                          p-1 h-6 w-6 rounded-full transition-all duration-200
                          ${event.completed 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'border-2 border-gray-300 hover:border-[#0f6cbf]'
                          }
                        `}
                      >
                        {event.completed && <Check className="h-3 w-3" />}
                      </Button>
                      <div className="flex-1">
                        <h5 className={`font-medium ${event.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {event.title}
                        </h5>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className={`flex items-center space-x-1 text-sm ${event.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            <Clock className="h-3 w-3" />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                          {event.location && (
                            <div className={`flex items-center space-x-1 text-sm ${event.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <p className={`text-sm mt-1 ${event.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            {event.description}
                          </p>
                        )}
                        {event.completed && (
                          <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                            Completed ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(event)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteEvent(event.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalEvents > 0 && (
            <div className="bg-[#0f6cbf]/5 p-3 rounded-lg">
              <div className="text-sm text-[#0f6cbf] font-medium">
                {completedEvents.length} of {totalEvents} events completed
                {completedEvents.length === totalEvents && totalEvents > 0 && (
                  <span className="ml-2">🎉 All done!</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarTodos;
