import { cn } from "@/lib/utils";

interface InquiryLinkProps {
  children?: React.ReactNode;
  className?: string;
}

export default function InquiryLink({ children, className }: InquiryLinkProps) {
  return (
    <a
      href={process.env.NEXT_PUBLIC_INQUIRY_URL}
      className={cn("text-sm text-blue-500 hover:underline", className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children || "お問い合わせ"}
    </a>
  );
}
