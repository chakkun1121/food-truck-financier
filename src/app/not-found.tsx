import InquiryLink from "@/components/ui-elements/inquiryLink";

export default function NotFound() {
  return (
    <div className="grid-4 flex flex-col items-center p-4">
      <h2 className="text-4xl">404 Not Found</h2>
      <p className="block">ページが見つかりませんでした</p>
      <a href="/" className="block text-blue-500 hover:underline">
        トップに戻る
      </a>
      <p className="text-muted-foreground mt-4 text-sm">
        このページについて不明な点がある場合は管理者へ
        <InquiryLink>お問い合わせ</InquiryLink>ください。
      </p>
    </div>
  );
}
