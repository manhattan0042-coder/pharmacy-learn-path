import { Moon, Sun, Globe, LogOut, Award, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* User Info Card */}
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-primary">{user?.studyHours || 0}</p>
                <p className="text-xs text-muted-foreground">Hours Studied</p>
              </div>
              <div className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-2xl font-bold text-primary">{user?.completedCourses.length || 0}</p>
                <p className="text-xs text-muted-foreground">Courses Done</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('profile.settings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>{t('profile.theme')}</span>
              </div>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5" />
                <span>{t('profile.language')}</span>
              </div>
              <Button variant="outline" size="sm" onClick={toggleLanguage}>
                {language === 'en' ? 'EN' : 'ខ្មែរ'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Course History Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5" />
              {t('profile.history')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user?.completedCourses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No completed courses yet</p>
            ) : (
              <div className="space-y-2">
                {user?.completedCourses.map((courseId) => (
                  <div key={courseId} className="text-sm flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Course {courseId}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Certificates Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5" />
              {t('profile.certificates')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user?.certificates.length === 0 ? (
              <p className="text-sm text-muted-foreground">No certificates earned yet</p>
            ) : (
              <div className="space-y-2">
                {user?.certificates.map((cert) => (
                  <div key={cert} className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm font-medium">{cert}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          {t('auth.logout')}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
