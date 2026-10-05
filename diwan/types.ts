export interface Bayt {
  sadr: string;
  ajz: string;
}

export interface Qasida {
  id: string;
  title: string;
  baher: string;
  sadrRhyme: string;
  ajzRhyme: string;
  pronoun: string;
  note?: string;
  date?: string;
  bayt: Bayt[];
}

export const BOHOOR: string[] = [
  'المسحوب',
  'الهجيني',
  'الصخري',
  'الحداء',
  'الهلالي',
  'السامري',
  'الرمل النبطي',
  'المديد النبطي',
];

export const DHAMAIR: string[] = ['حِنّا / نِـ', 'هُم / يِـ', 'أَنا / أَ'];

export const STORE_KEY = 'diwan-almajali-v1';
