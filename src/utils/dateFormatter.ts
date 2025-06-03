export const format = (date: Date | number): string => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};