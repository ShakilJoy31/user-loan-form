"use client"
import LocaleSwitcher from '@/components/common/LocaleSwitcher'
import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import { useCustomTranslator } from '@/hooks/useCustomTranslator';
import React from 'react'

const Home = () => {
   const { translate } = useCustomTranslator();
  return (
    <div>
      <ThemeSwitcher/>
      <LocaleSwitcher/>
      {translate(
                "আপনার রিটার্ন জার্নি টিকিট নির্বাচন করুন",
                " Select Your Return Journey Ticket"
              )}
    </div>
  )
}

export default Home
