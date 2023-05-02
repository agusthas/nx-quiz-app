import { decode } from 'html-entities';

export const decodeHtml = (html: string): string => {
  return decode(html, { level: 'html5' });
};
