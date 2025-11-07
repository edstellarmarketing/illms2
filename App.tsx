import { useState } from 'react';
import { StudentLogin } from './components/StudentLogin';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Button } from './components/ui/button';
import { GraduationCap, Shield } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

type AppMode = 'select' | 'student-login' | 'student-dashboard' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [mode, setMode] = useState<AppMode>('select');
  const [studentId, setStudentId] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');

  const handleStudentLogin = (id: string, name: string) => {
    setStudentId(id);
    setStudentName(name);
    setMode('student-dashboard');
  };

  const handleStudentLogout = () => {
    setStudentId('');
    setStudentName('');
    setMode('student-login');
  };

  const handleAdminLogin = () => {
    setMode('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setMode('admin-login');
  };

  if (mode === 'select') {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
          <div className="text-center space-y-8">
            <div>
              <h1 className="mb-2">Invensis Learning</h1>
              <p className="text-muted-foreground">Choose your portal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <button
                onClick={() => setMode('student-login')}
                className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                <GraduationCap className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h2 className="mb-2">Student Portal</h2>
                <p className="text-muted-foreground">Access learning resources</p>
              </button>
              
              <button
                onClick={() => setMode('admin-login')}
                className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                <Shield className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                <h2 className="mb-2">Admin Console</h2>
                <p className="text-muted-foreground">Manage resources</p>
              </button>
            </div>
          </div>
        </div>
        <Toaster />
      </>
    );
  }

  if (mode === 'student-login') {
    return (
      <>
        <div className="relative">
          <Button
            onClick={() => setMode('select')}
            variant="ghost"
            className="absolute top-4 left-4 z-10"
          >
            ← Back
          </Button>
          <StudentLogin onLogin={handleStudentLogin} />
        </div>
        <Toaster />
      </>
    );
  }

  if (mode === 'student-dashboard') {
    return (
      <>
        <StudentDashboard studentName={studentName} onLogout={handleStudentLogout} />
        <Toaster />
      </>
    );
  }

  if (mode === 'admin-login') {
    return (
      <>
        <div className="relative">
          <Button
            onClick={() => setMode('select')}
            variant="ghost"
            className="absolute top-4 left-4 z-10"
          >
            ← Back
          </Button>
          <AdminLogin onLogin={handleAdminLogin} />
        </div>
        <Toaster />
      </>
    );
  }

  if (mode === 'admin-dashboard') {
    return (
      <>
        <AdminDashboard onLogout={handleAdminLogout} />
        <Toaster />
      </>
    );
  }

  return null;
}
