import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import { Trash } from "lucide-react";

export default function Register() {
  return (
    // The header causes some stuttering, but ignore that for now.
    <main className="h-dvh space-y-4">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          defaultSize={75}
          className="flex flex-col space-y-4 p-4"
        >
          <div className="flex flex-none space-x-4 overflow-x-scroll"></div>
          <br />
          <div></div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} className="flex flex-col p-4">
          <div className="flex-none border-b pb-2">
            <h2 className="text-xl">注文内容</h2>
          </div>
          <div className="flex-1 space-y-4 overflow-y-scroll py-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex">
                  <p className="block">ハンバーガー</p>
                  <p className="block">×2</p>
                </CardTitle>
                <CardDescription>¥300×2</CardDescription>
                <CardAction>
                  <Button className="aspect-square rounded-full">
                    <Trash />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardFooter className="justify-end">
                <p className="text-xl">¥600</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex">
                  <p className="block">ハンバーガー</p>
                  <p className="block">×2</p>
                </CardTitle>
                <CardDescription>¥300×2</CardDescription>
                <CardAction>
                  <Button className="aspect-square rounded-full">
                    <Trash />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardFooter className="justify-end">
                <p className="text-xl">¥600</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex">
                  <p className="block">ハンバーガー</p>
                  <p className="block">×2</p>
                </CardTitle>
                <CardDescription>¥300×2</CardDescription>
                <CardAction>
                  <Button className="aspect-square rounded-full">
                    <Trash />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardFooter className="justify-end">
                <p className="text-xl">¥600</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex">
                  <p className="block">ハンバーガー</p>
                  <p className="block">×2</p>
                </CardTitle>
                <CardDescription>¥300×2</CardDescription>
                <CardAction>
                  <Button className="aspect-square rounded-full">
                    <Trash />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardFooter className="justify-end">
                <p className="text-xl">¥600</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex">
                  <p className="block">ハンバーガー</p>
                  <p className="block">×2</p>
                </CardTitle>
                <CardDescription>¥300×2</CardDescription>
                <CardAction>
                  <Button className="aspect-square rounded-full">
                    <Trash />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardFooter className="justify-end">
                <p className="text-xl">¥600</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex">
                  <p className="block">ハンバーガー</p>
                  <p className="block">×2</p>
                </CardTitle>
                <CardDescription>¥300×2</CardDescription>
                <CardAction>
                  <Button className="aspect-square rounded-full">
                    <Trash />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardFooter className="justify-end">
                <p className="text-xl">¥600</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex">
                  <p className="block">ハンバーガー</p>
                  <p className="block">×2</p>
                </CardTitle>
                <CardDescription>¥300×2</CardDescription>
                <CardAction>
                  <Button className="aspect-square rounded-full">
                    <Trash />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardFooter className="justify-end">
                <p className="text-xl">¥600</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex">
                  <p className="block">ハンバーガー</p>
                  <p className="block">×2</p>
                </CardTitle>
                <CardDescription>¥300×2</CardDescription>
                <CardAction>
                  <Button className="aspect-square rounded-full">
                    <Trash />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardFooter className="justify-end">
                <p className="text-xl">¥600</p>
              </CardFooter>
            </Card>
          </div>
          <div className="flex-none border-t pt-4">
            <Button className="w-full flex-none p-6 pt-4">支払いに進む</Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
