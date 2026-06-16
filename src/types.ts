export interface User {
  id: string;
  name: string;
  email: string;
  selectedCourseId: string; // The primary chosen course upon registration
  enrolledCourseIds: string[]; // List of all enrolled course IDs
  completedLessons: string[]; // IDs of completed lessons
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  isPremium: boolean; // Subscription status ($35/month active)
  usdtTxHash?: string; // Optional USDT transaction hash for payment confirmation requests
  paymentStatus: "pending" | "approved" | "unpaid";
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  videoPlaceholderUrl?: string; // URL for background images or custom video UI simulation
  contentMarkdown?: string; // Standard reading text material
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name string representation
  longDescription: string;
  accentColor: string; // Tailwind color name like emerald-500, blue-500, etc.
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  bannerPattern: string; // description of banner pattern
  modules: Module[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  quizTitle: string;
  questions: QuizQuestion[];
}

export interface eBookChapter {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  tips: string[];
}
