// Dummy company logos as inline SVG (text + simple mark).
// Uses currentColor so they adapt to light/dark and grayscale/hover states.

export const LOGOS = [
  {
    name: 'TeknoLab',
    svg: (
      <svg viewBox="0 0 140 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TeknoLab">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 10v12M10 16h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <text x="34" y="21" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="sans-serif">TeknoLab</text>
      </svg>
    ),
  },
  {
    name: 'KreatifMedia',
    svg: (
      <svg viewBox="0 0 160 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="KreatifMedia">
        <rect x="6" y="6" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="16" cy="16" r="4" fill="currentColor" />
        <text x="34" y="21" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="sans-serif">KreatifMedia</text>
      </svg>
    ),
  },
  {
    name: 'GrowthHub',
    svg: (
      <svg viewBox="0 0 150 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="GrowthHub">
        <path d="M8 24l6-8 5 4 7-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="34" y="21" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="sans-serif">GrowthHub</text>
      </svg>
    ),
  },
  {
    name: 'FinData',
    svg: (
      <svg viewBox="0 0 130 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="FinData">
        <rect x="7" y="16" width="4" height="10" rx="1" fill="currentColor" />
        <rect x="14" y="10" width="4" height="16" rx="1" fill="currentColor" />
        <rect x="21" y="6" width="4" height="20" rx="1" fill="currentColor" />
        <text x="34" y="21" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="sans-serif">FinData</text>
      </svg>
    ),
  },
  {
    name: 'StartupID',
    svg: (
      <svg viewBox="0 0 140 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="StartupID">
        <path d="M16 5l3 6 6 1-4.5 4.5 1 6-5.5-3-5.5 3 1-6L8 12l6-1 2-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <text x="34" y="21" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="sans-serif">StartupID</text>
      </svg>
    ),
  },
  {
    name: 'Kopi Nusantara',
    svg: (
      <svg viewBox="0 0 175 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kopi Nusantara">
        <path d="M9 12h12v6a6 6 0 01-12 0v-6zM21 13h3a3 3 0 010 6h-1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5v3M16 5v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <text x="32" y="21" fill="currentColor" fontSize="14" fontWeight="700" fontFamily="sans-serif">Kopi Nusantara</text>
      </svg>
    ),
  },
  {
    name: 'EduPintar',
    svg: (
      <svg viewBox="0 0 140 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="EduPintar">
        <path d="M16 8l10 4-10 4L6 12l10-4z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M11 15v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <text x="34" y="21" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="sans-serif">EduPintar</text>
      </svg>
    ),
  },
  {
    name: 'NovaCloud',
    svg: (
      <svg viewBox="0 0 150 32" className="h-7 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="NovaCloud">
        <path d="M11 22h11a5 5 0 000-10 7 7 0 00-13 2 4 4 0 002 8z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <text x="34" y="21" fill="currentColor" fontSize="15" fontWeight="700" fontFamily="sans-serif">NovaCloud</text>
      </svg>
    ),
  },
]
