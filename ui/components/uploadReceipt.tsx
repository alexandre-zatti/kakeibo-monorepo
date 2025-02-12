'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import { LabelButton } from '@/components/ui/label';
import { ImageOff, ImagePlay, ImagePlus, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFormStatus } from 'react-dom';

export const UploadReceipt = () => {
  const refField = useRef<HTMLInputElement>(null);
  const [receiptFile, setReceiptFile] = useState<string | null>(null);
  const { pending } = useFormStatus();

  const handleRemoveReceipt = () => {
    if (refField.current?.value) {
      refField.current.value = '';
    }
    setReceiptFile(null);
  };

  const handleUploadReceipt = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiptFile(e.target.value);
  };

  return (
    <>
      {!receiptFile ? (
        <LabelButton htmlFor="receipt">
          Upload Receipt
          <ImagePlus />
        </LabelButton>
      ) : (
        <div className={cn('flex justify-center gap-1')}>
          <Button type={'submit'} size={'lg'} disabled={pending}>
            Process
            {pending ? <Loader2 className={'animate-spin'} /> : <ImagePlay />}
          </Button>
          <Separator orientation={'vertical'} />
          <Button
            variant={'destructive'}
            className={cn('w-12 h-10')}
            onClick={handleRemoveReceipt}
            disabled={pending}
          >
            <ImageOff />
          </Button>
        </div>
      )}
      <Input
        id="receipt"
        name={'file'}
        type="file"
        className={cn('hidden')}
        ref={refField}
        accept="image/png, image/jpeg"
        onChange={handleUploadReceipt}
      />
    </>
  );
};
