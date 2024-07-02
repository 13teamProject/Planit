'use client';

import Terms from '@/components/signup/Terms';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { boolean } from 'yup';

import Button from '../button';
import Modal from '../modal';

export default function Footer() {
  const [modalState, setModalState] = useState({ isOpen: false });

  // 모달 닫기
  const handleModalClose = () => {
    setModalState({ isOpen: false });
  };

  // 모달 열기
  const handleModalOpen = () => {
    setModalState({ isOpen: true });
  };

  return (
    <>
      <footer className="bg-[#182641] p-25 text-center text-12 text-gray-300 md:flex md:items-center md:justify-between md:px-70 md:py-50 md:text-14">
        <p className="mb-5 md:basis-1/3 md:text-left">
          &copy; 2024 Planit. All rights reserved.
        </p>

        <ul className="flex justify-center gap-12 md:basis-1/3">
          <li>
            <button type="button" onClick={handleModalOpen}>
              Privacy Policy
            </button>
          </li>
          <li>FAQ</li>
        </ul>

        <ul className="mt-30 flex items-center justify-center gap-10 md:mt-0 md:basis-1/3 md:justify-end">
          <li className="">
            <Link href="#1">
              <Image
                src="/icon/envelope_email.svg"
                width={20}
                height={20}
                alt="푸터 아이콘"
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.kakaocorp.com/page/service/service/KakaoTalk"
              target="_blank"
            >
              <Image
                src="/icon/facebook.svg"
                width={20}
                height={20}
                alt="푸터 아이콘"
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/sem/campaign/emailsignup/?campaign_id=13530338586&extra_1=s%7Cc%7C547419126431%7Ce%7Cinstagram%20%27%7C&placement=&creative=547419126431&keyword=instagram%20%27&partner_id=googlesem&extra_2=campaignid%3D13530338586%26adgroupid%3D126262418054%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-1321618851291%26loc_physical_ms%3D9196622%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gad_source=1&gclid=CjwKCAjwp4m0BhBAEiwAsdc4aKb8WVLWuuYbFldna5FiSfMlOuwMm3P7qZEWnlVhOaTvnk5iJQtsQxoCuSAQAvD_BwE"
              target="_blank"
            >
              <Image
                src="/icon/instagram.svg"
                width={20}
                height={20}
                alt="푸터 아이콘"
              />
            </Link>
          </li>
        </ul>
      </footer>

      <Modal isOpen={modalState.isOpen} onClose={handleModalClose}>
        <div className="h-400 w-340 px-28 py-28 text-center text-18 md:h-600 md:w-600">
          <div className="pb-10 md:pb-30">
            <h2 className="mb-10 text-20 font-bold md:text-25">
              플랜잇 서비스 이용약관
            </h2>
            <Terms />
          </div>
          <Button
            styles="w-138 h-42 md:w-120 md:h-48"
            text="확인"
            onClick={handleModalClose}
          />
        </div>
      </Modal>
    </>
  );
}
