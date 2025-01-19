import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useFilePicker } from "use-file-picker";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {openFilePicker, filesContent} = useFilePicker({
    readAs: 'BinaryString',
    accept: 'image/*',
    multiple: false,
  });

  return (
    <div className={cn('flex flex-col justify-center items-center gap-5')}>
      <h1 className={cn('text-4xl')}>Groceries Analyzer</h1>
      <Separator className={cn('w-3/4')}/>
      <Button onClick={openFilePicker}>Pick Receipt Image</Button>
      {filesContent.map((file) => (
        <img key={file.name} className={cn('w-3/4 h-3/4')} alt={'receipt'} src={file.content}/>
      ))}
    </div>
  )
}
