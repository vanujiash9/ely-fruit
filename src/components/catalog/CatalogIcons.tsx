interface IconProps {
  className?: string
}

export function PhoneIcon({ className = "" }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.1 3.5 9.5 7l-1.8 2.2c1.2 2.5 2.8 4.1 5.2 5.2l2.2-1.8 3.4 2.4c.4.3.6.8.4 1.3l-.7 2.4c-.2.6-.7.9-1.3.9C9.8 19.4 4.5 14 4.3 7c0-.6.4-1.1.9-1.3l2.5-.6c.5-.1 1 .1 1.3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function ChatIcon({ className = "" }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a7.7 7.7 0 0 1-8 7.4 8.5 8.5 0 0 1-3.5-.7L4 20l1.3-4A7.2 7.2 0 0 1 4 11.8C4 7.4 7.6 4 12 4s8 3.2 8 7.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
}

export function ChevronIcon({ open }: { open: boolean }) {
  return <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function LeafMark() {
  return <svg className="h-8 w-8 text-[#bd9b5f]" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 34V17M20 23c-7 0-11-4-11-11 7 0 11 4 11 11Zm0-6c0-7 4-11 11-11 0 7-4 11-11 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
