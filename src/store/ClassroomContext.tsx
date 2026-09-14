import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Country, LearningAssignment } from '../types';
import {
  cloudConfigured,
  joinClassroom as joinCloudClassroom,
  loadStudentClassroomSession,
  loadStudentLearningPlan,
  loadStudentProgress,
  listTeacherCountries,
  LOCAL_CONTENT_UPDATED_EVENT,
  signOutCloud,
  type ClassroomSession,
  type Enrollment,
} from '../services/supabase';

const ENROLLMENT_KEY = 'multicultural-world-tour-enrollment-v1';

type ClassroomContextValue = {
  cloudConfigured: boolean;
  enrollment: Enrollment | null;
  joining: boolean;
  error: string;
  learningPlan: LearningAssignment[];
  customCountries: Country[];
  planLoading: boolean;
  session: ClassroomSession | null;
  join: (code: string, nickname: string) => Promise<{ enrollment: Enrollment; remoteProgress: unknown | null }>;
  leave: () => Promise<void>;
  refreshLearningPlan: () => Promise<void>;
  clearError: () => void;
};

const ClassroomContext = createContext<ClassroomContextValue | null>(null);

function loadEnrollment(): Enrollment | null {
  try {
    const raw = localStorage.getItem(ENROLLMENT_KEY);
    return raw ? JSON.parse(raw) as Enrollment : null;
  } catch { return null; }
}

export function ClassroomProvider({ children }: { children: ReactNode }) {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(loadEnrollment);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const [learningPlan, setLearningPlan] = useState<LearningAssignment[]>([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [session, setSession] = useState<ClassroomSession | null>(null);
  const [localCustomCountries, setLocalCustomCountries] = useState<Country[]>([]);

  const refreshLearningPlan = useCallback(async () => {
    if (!cloudConfigured || !enrollment) { setLearningPlan([]); setSession(null); return; }
    setPlanLoading(true);
    try {
      const [plan, nextSession] = await Promise.all([loadStudentLearningPlan(enrollment.classroomId), loadStudentClassroomSession(enrollment.classroomId)]);
      setLearningPlan(plan);
      setSession(nextSession);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '학급 미션을 불러오지 못했습니다.');
    } finally { setPlanLoading(false); }
  }, [enrollment]);

  useEffect(() => { void refreshLearningPlan(); }, [refreshLearningPlan]);
  useEffect(() => {
    if (!cloudConfigured || !enrollment) return;
    const id = window.setInterval(() => { void refreshLearningPlan(); }, 30000);
    return () => window.clearInterval(id);
  }, [enrollment, refreshLearningPlan]);

  useEffect(() => {
    if (cloudConfigured) { setLocalCustomCountries([]); return; }
    const refreshLocal = async () => {
      try { setLocalCustomCountries((await listTeacherCountries()).map((record) => record.country_data)); }
      catch { setLocalCustomCountries([]); }
    };
    void refreshLocal();
    window.addEventListener(LOCAL_CONTENT_UPDATED_EVENT, refreshLocal);
    return () => window.removeEventListener(LOCAL_CONTENT_UPDATED_EVENT, refreshLocal);
  }, []);

  const customCountries = useMemo(() => {
    const assigned = learningPlan.flatMap((assignment) => assignment.customCountry ? [assignment.customCountry] : []);
    const merged = [...assigned, ...localCustomCountries];
    return merged.filter((country, index) => merged.findIndex((item) => item.id === country.id) === index);
  }, [learningPlan, localCustomCountries]);

  const value = useMemo<ClassroomContextValue>(() => ({
    cloudConfigured,
    enrollment,
    joining,
    error,
    learningPlan,
    customCountries,
    planLoading,
    session,
    clearError: () => setError(''),
    refreshLearningPlan,
    join: async (code, nickname) => {
      setJoining(true); setError('');
      try {
        const next = await joinCloudClassroom(code, nickname);
        localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(next));
        setEnrollment(next);
        const [remoteProgress, plan, nextSession] = await Promise.all([
          loadStudentProgress(next.studentId),
          loadStudentLearningPlan(next.classroomId),
          loadStudentClassroomSession(next.classroomId),
        ]);
        setLearningPlan(plan);
        setSession(nextSession);
        return { enrollment: next, remoteProgress };
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : '학급 참여 중 오류가 발생했습니다.');
        throw caught;
      } finally { setJoining(false); }
    },
    leave: async () => {
      localStorage.removeItem(ENROLLMENT_KEY); setEnrollment(null); setLearningPlan([]); setSession(null); setError('');
      if (cloudConfigured) { try { await signOutCloud(); } catch { /* keep local disconnect */ } }
    },
  }), [enrollment, error, joining, learningPlan, customCountries, planLoading, session, refreshLearningPlan]);

  return <ClassroomContext.Provider value={value}>{children}</ClassroomContext.Provider>;
}

export function useClassroom() {
  const context = useContext(ClassroomContext);
  if (!context) throw new Error('useClassroom must be used inside ClassroomProvider');
  return context;
}
