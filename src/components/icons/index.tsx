import type { LucideProps } from "lucide-react";

const Icons = {
  Google: (props: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      height={props.size || props.height || 24}
      width={props.size || props.width || 24}
      {...props}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
  DocumentCodeBoldIcon: (props: LucideProps) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 24 24"
      height={props.size || props.height || 24}
      width={props.size || props.width || 24}
      {...props}
    >
      <path
        d="M16 2H8C4.5 2 3 4 3 7V17C3 20 4.5 22 8 22H16C19.5 22 21 20 21 17V7C21 4 19.5 2 16 2ZM10.53 16.47C10.82 16.76 10.82 17.24 10.53 17.53C10.38 17.68 10.19 17.75 10 17.75C9.81 17.75 9.62 17.68 9.47 17.53L7.47 15.53C7.18 15.24 7.18 14.76 7.47 14.47L9.47 12.47C9.76 12.18 10.24 12.18 10.53 12.47C10.82 12.76 10.82 13.24 10.53 13.53L9.06 15L10.53 16.47ZM16.53 15.53L14.53 17.53C14.38 17.68 14.19 17.75 14 17.75C13.81 17.75 13.62 17.68 13.47 17.53C13.18 17.24 13.18 16.76 13.47 16.47L14.94 15L13.47 13.53C13.18 13.24 13.18 12.76 13.47 12.47C13.76 12.18 14.24 12.18 14.53 12.47L16.53 14.47C16.82 14.76 16.82 15.24 16.53 15.53ZM18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z"
        fill="currentColor"
      />
    </svg>
  ),
  TickMark: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      height={props.size || props.height || 24}
      width={props.size || props.width || 24}
      {...props}
      className="h-5 w-5 text-success"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  ),
};

export default Icons;
