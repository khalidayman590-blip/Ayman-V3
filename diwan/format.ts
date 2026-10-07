export const رقم = (n: number): string => Number(n).toLocaleString('ar-EG', { useGrouping: false });

export const عربي_ترتيبي = (n: number): string => رقم(n);
