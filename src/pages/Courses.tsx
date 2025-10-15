import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/CourseCard';
import BottomNav from '@/components/BottomNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockCourses } from '@/lib/mockData';

const Courses = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('assigned');

  const assignedCourses = mockCourses.filter(c => c.type === 'assigned');
  const publicCourses = mockCourses.filter(c => c.type === 'public');

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <h1 className="text-2xl font-bold">{t('nav.courses')}</h1>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="assigned">{t('dashboard.assignedCourses')}</TabsTrigger>
            <TabsTrigger value="public">{t('dashboard.publicCourses')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assigned" className="space-y-4">
            {assignedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </TabsContent>
          
          <TabsContent value="public" className="space-y-4">
            {publicCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Courses;
