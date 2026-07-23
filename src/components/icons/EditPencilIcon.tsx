/** 연필(수정) 아이콘. 색상은 currentColor를 따릅니다. */
export default function EditPencilIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M14.1667 2.5C14.3856 2.28113 14.6455 2.10752 14.9315 1.98906C15.2175 1.87061 15.5241 1.80963 15.8337 1.80963C16.1433 1.80963 16.4498 1.87061 16.7358 1.98906C17.0219 2.10752 17.2818 2.28113 17.5007 2.5C17.7195 2.71887 17.8931 2.97881 18.0116 3.26481C18.13 3.55082 18.191 3.85738 18.191 4.16699C18.191 4.4766 18.13 4.78316 18.0116 5.06917C17.8931 5.35517 17.7195 5.61511 17.5007 5.83398L6.25065 17.084L1.66732 18.3333L2.91732 13.75L14.1667 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
