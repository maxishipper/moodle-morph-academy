
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: string;
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [completedAnimation, setCompletedAnimation] = useState<string | null>(null);

  const selectedDateString = selectedDate?.toDateString() || '';
  const todosForSelectedDate = todos.filter(todo => todo.date === selectedDateString);
  const completedTodos = todosForSelectedDate.filter(todo => todo.completed);
  const totalTodos = todosForSelectedDate.length;

  const dailyProgress = totalTodos > 0 ? (completedTodos.length / totalTodos) * 100 : 0;

  useEffect(() => {
    if (onProgressUpdate && totalTodos > 0) {
      onProgressUpdate(dailyProgress);
    }
  }, [dailyProgress, onProgressUpdate, totalTodos]);

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

  const addTodo = () => {
    if (!newTodo.title.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      date: selectedDateString,
      createdAt: new Date()
    };

    setTodos(prev => [...prev, todo]);
    setNewTodo({ title: '', description: '' });
    setShowAddForm(false);
    toast.success('Task added!');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        if (updatedTodo.completed) {
          setCompletedAnimation(id);
          setTimeout(() => setCompletedAnimation(null), 1000);
          toast.success('Great job! Task completed! 🎉', {
            duration: 2000,
          });
        }
        return updatedTodo;
      }
      return todo;
    }));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast.success('Task deleted');
  };

  const getDatesWithTodos = () => {
    const dates = new Set(todos.map(todo => todo.date));
    return Array.from(dates).map(dateString => new Date(dateString));
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
          <div className="space-y-2">
            {Array.from({ length: 24 }, (_, hour) => (
              <div key={hour} className="flex items-center border-b py-2">
                <div className="w-16 text-sm text-gray-500">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                <div className="flex-1 ml-4 h-8 border-l-2 border-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (view === 'week') {
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
                <div key={i} className="text-center">
                  <div className="font-semibold text-sm">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="text-lg">{day.getDate()}</div>
                </div>
              );
            })}
            {Array.from({ length: 24 }, (_, hour) => (
              <React.Fragment key={hour}>
                <div className="text-xs text-gray-500 py-2">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                {Array.from({ length: 7 }, (_, day) => (
                  <div key={day} className="border-l border-t h-12"></div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border p-3"
        modifiers={{
          hasTodos: getDatesWithTodos()
        }}
        modifiersStyles={{
          hasTodos: { 
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
            Calendar & Tasks
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
              Dates with tasks are highlighted in blue
            </div>
          )}
        </div>

        {/* Todos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">
              Tasks for {selectedDate?.toLocaleDateString()}
            </h4>
            <Button
              onClick={() => setShowAddForm(true)}
              size="sm"
              className="bg-[#0f6cbf] hover:bg-[#0d5aa7]"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </Button>
          </div>

          {totalTodos > 0 && (
            <div className="bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>
          )}

          {showAddForm && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3 animate-fade-in">
              <Input
                placeholder="Task title..."
                value={newTodo.title}
                onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <Textarea
                placeholder="Description (optional)..."
                value={newTodo.description}
                onChange={(e) => setNewTodo(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[60px]"
              />
              <div className="flex gap-2">
                <Button onClick={addTodo} size="sm">Add</Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {todosForSelectedDate.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No tasks for this date. Add one to get started!
              </div>
            ) : (
              todosForSelectedDate.map((todo) => (
                <div
                  key={todo.id}
                  className={`
                    p-3 border rounded-lg transition-all duration-300 
                    ${todo.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-[#0f6cbf]'
                    }
                    ${completedAnimation === todo.id 
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
                        onClick={() => toggleTodo(todo.id)}
                        className={`
                          p-1 h-6 w-6 rounded-full transition-all duration-200
                          ${todo.completed 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'border-2 border-gray-300 hover:border-[#0f6cbf]'
                          }
                        `}
                      >
                        {todo.completed && <Check className="h-3 w-3" />}
                      </Button>
                      <div className="flex-1">
                        <h5 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {todo.title}
                        </h5>
                        {todo.description && (
                          <p className={`text-sm mt-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            {todo.description}
                          </p>
                        )}
                        {todo.completed && (
                          <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                            Completed ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalTodos > 0 && (
            <div className="bg-[#0f6cbf]/5 p-3 rounded-lg">
              <div className="text-sm text-[#0f6cbf] font-medium">
                {completedTodos.length} of {totalTodos} tasks completed
                {completedTodos.length === totalTodos && totalTodos > 0 && (
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
