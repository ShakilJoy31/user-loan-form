"use client"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaTags,
  FaRobot,
} from "react-icons/fa";
import { MdHelp, MdInfo } from "react-icons/md";
import { FiArrowRight } from 'react-icons/fi';
import footerLogo from "../../../../assets/Home/navbarLogo.png"
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PublicFooter = () => {
  return (
    <footer className="bg-[#FD6801] text-white py-8 px-4 lg:px-10">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Newsletter Section */}
          <div className="mb-8 w-full lg:w-auto">
            <div className="flex gap-4 md:mb-10">
               <div className="text-lg font-semibold md:ml-0 mx-auto md:mx-0 mb-3">
              <Image
                width={100}
                height={100}
                src={footerLogo}
                alt={"footerLogo"}
                className="w-full h-full object-cover"
              />
            </div>
              <div>
                <p className="mb-4 sm:text-xs md:text-[14px]">
                Experience Personalized Online/Offline <br /> Shopping in
                Bangladesh with Proydon
              </p>
              </div>
            </div>
           <div className="flex items-center max-w-md mx-auto bg-white rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
 
      
      {/* Input field */}
      <input
        type="email"
        placeholder="Enter your email address..."
        className="px-2 py-2 w-full focus:outline-none text-gray-800"
      />
      
      {/* Submit button */}
      <Button className="text-gray-700 -rotate-45 px-4 py-2 ">
        <FiArrowRight className="h-5 w-5" />
      </Button>
    </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 w-full lg:w-auto">
            {/* SUPPORT Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MdHelp className="mr-2" /> SUPPORT
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    USER GUIDE
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    TESTIMONIAL
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    CUSTOMER
                  </a>
                </li>
              </ul>
            </div>

            {/* LINKS Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MdInfo className="mr-2" /> LINKS
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    ABOUT US
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition flex items-center"
                  >
                     Stores
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    APP
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    IBOS
                  </a>
                </li>
              </ul>
            </div>

            {/* Discover Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> Discover
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition flex items-center"
                  >
                    <FaMapMarkerAlt className="mr-2" /> Find Nearby Shops
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition flex items-center"
                  >
                    <FaTags className="mr-2" /> Latest Promotions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition flex items-center"
                  >
                    <FaRobot className="mr-2" /> Top Robot Stores
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 pb-6">
          {/* Social Media and Contact */}
          <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
  <a
    href="#"
    className="bg-white text-[#FD6801] p-2 rounded-full hover:bg-gray-100 transition"
  >
    <FaFacebook size={20} />
  </a>
  <a
    href="#"
    className="bg-white text-[#FD6801] p-2 rounded-full hover:bg-gray-100 transition"
  >
    <FaTwitter size={20} />
  </a>
  <a
    href="#"
    className="bg-white text-[#FD6801] p-2 rounded-full hover:bg-gray-100 transition"
  >
    <FaInstagram size={20} />
  </a>
  <a
    href="#"
    className="bg-white text-[#FD6801] p-2 rounded-full hover:bg-gray-100 transition"
  >
    <FaLinkedin size={20} />
  </a>
</div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-6 text-center text-sm text-white flex flex-col md:flex-row justify-between items-center">
          <p className="mb-2 md:mb-0">© COURTESY 2022. ALL BIGSTIE RESERVED</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-600 transition">
              PRIVACY POLICY
            </a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600 transition">
              TERMS & CONDITIONS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;