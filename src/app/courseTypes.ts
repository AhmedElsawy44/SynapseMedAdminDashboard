export interface QuizQuestion {
  id: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizItem {
  id: string;
  title: string;
  description?: string;
  parentType: "Lecture" | "Revision";
  parentId: string;
  parentTitle: string;
  parentCourseTitle?: string;
  questionCount: number;
  passingScore: number;
  timeLimitMinutes: number;
  maxAttempts: number;
  totalAttempts: number;
  passRate: number;
  status: "Draft" | "Published" | "Archived";
  questions: QuizQuestion[];
}

export interface QuizAttemptRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  attemptNum: number;
  score: number;
  passingScore: number;
  result: "Passed" | "Failed";
  date: string;
  durationMinutes: number;
}

export interface CourseLecture {
  id: string;
  lectureNumber: number; // sortOrder in backend
  title: string;
  durationMinutes: number;
  videoDurationSeconds?: number;
  bunnyVideoId: string; // Bunny Stream Video GUID
  videoLibraryId?: string; // Bunny Stream Library ID (e.g. syn-med-248109)
  isPreview: boolean; // is_preview in backend (free preview for unenrolled students)
  status: "Draft" | "Published" | "Archived"; // lecture status
  transcodingStatus?: "Ready" | "Processing" | "Pending";
  hasSlides?: boolean;
  quiz?: QuizItem | null; // Assessment quiz strictly attached to this lecture
}

export interface CourseItem {
  id: string;
  slug: string; // Required by backend (unique slug)
  code?: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  priceAmount: number; // Required by backend Money value object
  priceCurrency: string; // e.g. "EGP"
  specialty?: string;
  targetLevel?: string; // legacy optional for display
  instructor?: string;
  instructorTitle?: string;
  status: "Draft" | "Published" | "In Review" | "Archived";
  updated: string;
  enrolledStudents?: number;
  bunnyLibraryId?: string;
  lectures: CourseLecture[];
}

export const COURSE_STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Published:   { color: "#4ade80", bg: "rgba(74,222,128,0.1)"  },
  Draft:       { color: "#A9B5C7", bg: "rgba(169,181,199,0.1)" },
  "In Review": { color: "#60a5fa", bg: "rgba(96,165,250,0.1)"  },
  Archived:    { color: "#fbbf24", bg: "rgba(251,191,36,0.1)"  },
};
