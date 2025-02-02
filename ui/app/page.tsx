import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import processReceipt from "@/app/actions/processReceipt";
import { UploadReceipt } from "@/components/uploadReceipt";

export default function Home() {

  return (
    <div className={cn("flex flex-col justify-center items-center gap-5 h-screen")}>
      <Image src={"/sales-graph.png"} alt={"Shopping cart with sales data graph"} width={150} height={150}
             priority={true}/>
      <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl")}>Groceries Analyzer</h1>
      <Separator className={cn("w-3/4")}/>
      <form action={processReceipt} className={cn("flex flex-col justify-center items-center gap-5")}>
        <UploadReceipt/>
      </form>
    </div>
  );
}
