export function formatSkillsAsBullets(skills: string[] | string): string[] {
  if (typeof skills === 'string') {
    return skills.split(',').map(s => s.trim()).filter(Boolean);
  }
  return skills;
}

export function formatDateToMMYYYY(date: Date | string): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return '';
  
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${month}/${year}`;
}

export function formatPhoneNumber(phone: string, isIndian: boolean = true): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  if (isIndian) {
    // Format as +91-XXXXX-XXXXX
    if (digits.length === 10) {
      return `+91-${digits.slice(0, 5)}-${digits.slice(5)}`;
    } else if (digits.length === 12 && digits.startsWith('91')) {
      return `+91-${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
  } else {
    // International format - simple E.164 style
    if (digits.length >= 10) {
      return `+${digits}`;
    }
  }
  
  return phone; // Return original if format doesn't match
}

export function capitalizeProperNouns(text: string): string {
  if (!text) return '';
  
  return text
    .split(' ')
    .map(word => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function formatExperienceDuration(startDate: string, endDate: string): string {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  if (isNaN(start.getTime())) return '';
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
}
