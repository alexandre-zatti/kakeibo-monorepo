"use client"

import { cn } from "@/lib/utils";
import React from "react";
import { useFilePicker } from "use-file-picker";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ImageUp } from "lucide-react";

export default function Home() {
  const {openFilePicker} = useFilePicker({
    readAs: 'BinaryString',
    accept: 'image/*',
    multiple: false,
    onFilesSuccessfullySelected: async ({plainFiles, filesContent}) => {
      console.log('onFilesSuccessfullySelected', plainFiles, filesContent);
      await processReceiptImage(plainFiles[0])
    },
  });

  async function processReceiptImage(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch('https://groceries.zatti.tech/api/receipt/process', {
        method: 'POST',
        body: formData,
        headers: {
          'X-API-KEY': ''
        }
      })

      const jsonRes = await res.json()

      console.log(jsonRes)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={cn('flex flex-col justify-center items-center gap-5 h-screen')}>
      <Image src={'/sales-graph.png'} alt={'Shopping cart with sales data graph'} width={150} height={150}/>
      <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl')}>Groceries Analyzer</h1>
      <Separator className={cn('w-3/4')}/>
      <Button size={'lg'} onClick={openFilePicker}>
        <ImageUp/>
        Upload Receipt
      </Button>
    </div>
  );
}
