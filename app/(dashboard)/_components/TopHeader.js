import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TopHeader = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3">
      <div className="flex items-center gap-3">
        <AlignJustify className="md:hidden" />
        <Image src="/logo.svg" width={46} height={100} className="md:hidden" alt="logo" />
      </div>
      <UserButton />
    </div>
  );
};

export default TopHeader;
