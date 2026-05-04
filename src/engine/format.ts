import type { OpeningHours, DayOfWeek } from '@/types/project';
import { DAYS_ORDER, DAY_LABELS } from '@/types/project';

export interface FormattedDay {
  day: DayOfWeek;
  label: string;
  text: string; // "9:00 – 17:00" or "Closed"
  open: boolean;
}

export function formatHours(hours: OpeningHours): FormattedDay[] {
  return DAYS_ORDER.map((d) => {
    const e = hours[d];
    return {
      day: d,
      label: DAY_LABELS[d],
      open: e.open,
      text: e.open ? `${e.from} – ${e.to}` : 'Closed',
    };
  });
}

/** Best-effort tel: href, leaving + and digits only. */
export function telHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : '#';
}

export function mailtoHref(email: string): string {
  return email ? `mailto:${email}` : '#';
}

/** Slugify a string for ids/anchors. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

/** Convert OpeningHours -> schema.org openingHoursSpecification array. */
export function toSchemaHours(hours: OpeningHours) {
  const dayMap: Record<DayOfWeek, string> = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  };
  return DAYS_ORDER.filter((d) => hours[d].open).map((d) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: dayMap[d],
    opens: hours[d].from,
    closes: hours[d].to,
  }));
}
