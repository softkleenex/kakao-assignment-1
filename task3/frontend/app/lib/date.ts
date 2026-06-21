const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const KOREAN_DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

export function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function isDateString(value: string | undefined): value is string {
  return Boolean(value && DATE_PATTERN.test(value));
}

export function formatDateToString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayString() {
  return formatDateToString(new Date());
}

export function parseDateParam(value: string | string[] | undefined) {
  const singleValue = getSingleParam(value);
  return isDateString(singleValue) ? singleValue : getTodayString();
}

export function parseOptionalDateParam(value: string | string[] | undefined) {
  const singleValue = getSingleParam(value);
  return isDateString(singleValue) ? singleValue : undefined;
}

export function dateStringToDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDaysToDateString(dateString: string, days: number) {
  const date = dateStringToDate(dateString);
  date.setDate(date.getDate() + days);
  return formatDateToString(date);
}

export function getMondayOfDateString(dateString: string) {
  const date = dateStringToDate(dateString);
  const dayIndex = date.getDay();
  const diffDays = date.getDate() - dayIndex + (dayIndex === 0 ? -6 : 1);
  return formatDateToString(new Date(date.getFullYear(), date.getMonth(), diffDays));
}

export function getWeekDays(weekStartDate: string) {
  return Array.from({ length: 7 }, (_, index) => addDaysToDateString(weekStartDate, index));
}

export function formatDateToKoreanString(dateString: string) {
  const date = dateStringToDate(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = KOREAN_DAY_NAMES[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${dayName})`;
}

export function formatWeekTitle(weekStartDate: string) {
  const date = dateStringToDate(weekStartDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function getDayName(dateString: string) {
  return KOREAN_DAY_NAMES[dateStringToDate(dateString).getDay()];
}
