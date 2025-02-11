import { useState } from "react";
import { generateTimeSlots } from "./utils/generateTimeSlots";
import { Selection } from "@nextui-org/react";
import { Course } from "./model/interface";

const courses: Course[] = [
  {
    complete_course_number: "1411087_58",
    name: "الگوریتم",
    group: "پایه",
    total_unit: 3,
    exam_times: [
      {
        date: "1402-03-30",
        exam_start_time: "08:30:00",
        exam_end_time: "10:30:00",
      },
    ],
    course_times: [
      {
        course_day: 3,
        course_start_time: "16:30:00",
        course_end_time: "18:00:00",
        place: "A1",
      },
      {
        course_day: 1,
        course_start_time: "16:30:00",
        course_end_time: "18:00:00",
        place: "A2",
      },
    ],
  },
  {
    complete_course_number: "1411087_59",
    name: "هوش مصنوعی",
    group: "تخصصی",
    total_unit: 3,
    exam_times: [
      {
        date: "1402-04-15",
        exam_start_time: "10:00:00",
        exam_end_time: "12:00:00",
      },
    ],
    course_times: [
      {
        course_day: 2,
        course_start_time: "10:00:00",
        course_end_time: "11:30:00",
        place: "B1",
      },
      {
        course_day: 4,
        course_start_time: "08:00:00",
        course_end_time: "09:30:00",
        place: "B2",
      },
    ],
  },
  {
    complete_course_number: "1411087_60",
    name: "فیزیک",
    group: "پایه",
    total_unit: 4,
    exam_times: [
      {
        date: "1402-05-10",
        exam_start_time: "14:00:00",
        exam_end_time: "16:00:00",
      },
    ],
    course_times: [
      {
        course_day: 2,
        course_start_time: "11:30:00",
        course_end_time: "13:00:00",
        place: "C2",
      },
      {
        course_day: 3,
        course_start_time: "14:00:00",
        course_end_time: "15:30:00",
        place: "C2",
      },
    ],
  },
  {
    complete_course_number: "1411087_61",
    name: "مهندسی نرم‌افزار پیشرفته",
    group: "تخصصی",
    total_unit: 3,
    exam_times: [
      {
        date: "1402-06-20",
        exam_start_time: "13:00:00",
        exam_end_time: "15:00:00",
      },
    ],
    course_times: [
      {
        course_day: 2,
        course_start_time: "11:00:00",
        course_end_time: "12:30:00",
        place: "D1",
      },
      {
        course_day: 4,
        course_start_time: "16:00:00",
        course_end_time: "17:30:00",
        place: "D2",
      },
    ],
  },
  {
    complete_course_number: "1411087_62",
    name: "انقلاب اسلامی",
    group: "عمومی",
    total_unit: 2,
    exam_times: [
      {
        date: "1402-07-05",
        exam_start_time: "11:00:00",
        exam_end_time: "13:00:00",
      },
    ],
    course_times: [
      {
        course_day: 1,
        course_start_time: "08:00:00",
        course_end_time: "09:30:00",
        place: "E1",
      },
      {
        course_day: 5,
        course_start_time: "10:00:00",
        course_end_time: "11:30:00",
        place: "E2",
      },
    ],
  },
  {
    complete_course_number: "1411087_63",
    name: "مباحث ویژه",
    group: "اختیاری",
    total_unit: 3,
    exam_times: [
      {
        date: "1402-07-18",
        exam_start_time: "08:30:00",
        exam_end_time: "10:30:00",
      },
    ],
    course_times: [
      {
        course_day: 0,
        course_start_time: "12:00:00",
        course_end_time: "13:30:00",
        place: "F1",
      },
      {
        course_day: 2,
        course_start_time: "15:00:00",
        course_end_time: "16:30:00",
        place: "F2",
      },
    ],
  },
  {
    complete_course_number: "1411087_64",
    name: "روش تحقیق",
    group: "جبرانی",
    total_unit: 2,
    exam_times: [
      {
        date: "1402-08-02",
        exam_start_time: "09:00:00",
        exam_end_time: "11:00:00",
      },
    ],
    course_times: [
      {
        course_day: 4,
        course_start_time: "13:00:00",
        course_end_time: "14:30:00",
        place: "G1",
      },
      {
        course_day: 1,
        course_start_time: "11:00:00",
        course_end_time: "12:30:00",
        place: "G2",
      },
    ],
  },
];

const Logic = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedLesson, setSelectedLesson] = useState<Selection>(new Set());
  const [selectedClassTimes, setSelectedClassTimes] = useState<{
    [key: string]: Set<number>;
  }>({});

  const timeSlots = generateTimeSlots();
  const daysOfWeek = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
  ];

  const lessonsByGroup = selectedGroup
    ? courses.filter((course) => course.group === selectedGroup)
    : courses;

  const filteredCourses = lessonsByGroup.filter((course) =>
    selectedLesson !== "all" && selectedLesson.size
      ? selectedLesson.has(course.name)
      : true
  );

  const handleCourseTimeToggle = (courseNumber: string, index: number) => {
    setSelectedClassTimes((prevSelectedClassTimes) => {
      const courseSelections =
        prevSelectedClassTimes[courseNumber] || new Set<number>();
      if (courseSelections.has(index)) {
        courseSelections.delete(index);
      } else {
        courseSelections.add(index);
      }
      return {
        ...prevSelectedClassTimes,
        [courseNumber]: new Set(courseSelections),
      };
    });
  };

  return {
    selectedGroup,
    setSelectedGroup,
    setSelectedLesson,
    selectedLesson,
    lessonsByGroup,
    filteredCourses,
    selectedClassTimes,
    handleCourseTimeToggle,
    daysOfWeek,
    timeSlots,
  };
};

export default Logic;
