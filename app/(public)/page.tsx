import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return <>
    <div className="flex flex-col gap-4 h-screen justify-center items-center">
      <h1 className="text-4xl font-bold">SaaS Template</h1>
      <p className="text-muted-foreground">built with Next.js v15, Supabase, Tailwind CSS v4, Shadcn</p>
      <div className="flex gap-2">
        <Button variant="outline" disabled>Docs</Button>
        <Button disabled>Get the template</Button>
      </div>
      <p className="text-muted-foreground">By <Link href="https://charan.dev" className="underline">Charan</Link></p>
    </div>
  </>;
}
