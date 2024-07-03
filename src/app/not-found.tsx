'use client';

import Button from '@/components/commons/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#DAE9FE] p-20">
      <div className="flex flex-col items-center md:gap-8 lg:absolute lg:left-1/2 lg:top-1/2 lg:min-w-1000 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:flex-row lg:gap-40">
        <Image
          src="/image/error404.png"
          alt="404 error"
          width={800}
          height={605}
          className="mb-40 w-full max-w-[400px] md:max-w-[500px] lg:order-last lg:mb-0 lg:max-w-[800px]"
        />
        <div className="flex flex-col justify-center text-center text-[#384259] lg:text-left">
          <h1 className="mb-20 text-6xl font-light md:text-7xl lg:mb-30 lg:text-8xl">
            Oops...
          </h1>
          <h3 className="mb-2 text-2xl md:text-3xl lg:mb-10 lg:text-4xl">
            Page Not Found
          </h3>
          <p className="mb-30 text-lg font-light md:text-xl lg:mb-60 lg:text-xl">
            page is not found plz go back
          </p>
          <Button
            text="Plz Go Back"
            onClick={() => router.back()}
            styles="text-14 py-8 px-20 w-auto md:text-xl md:py-12 md:px-30 lg:text-xl  mx-auto lg:mx-0"
          />
        </div>
      </div>
    </div>
  );
}
