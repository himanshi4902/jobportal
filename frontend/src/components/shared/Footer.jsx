import React from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-wrap justify-center p-8 text-gray-800 w-full">
      <div className="flex-grow md:flex-grow-0 md:mr-10 mb-8 md:mb-0">
        <h2 className="mt-5 text-[#a294c5]">Contact</h2>
        <address className="not-italic text-[#a294c5]">
          48th Avenue Street, Hyderabad<br />
          <a className="inline-flex items-center justify-center h-9 bg-gray-200 rounded-full text-[#5C5470] px-5 mt-2" href="mailto:example@gmail.com">Email Us</a>
        </address>
      </div>

      <ul className="flex flex-wrap flex-grow w-full md:w-auto">
        <li className="w-1/2 md:w-auto md:flex-grow md:mr-8 mb-8 md:mb-0">
          <h2 className="text-sm">Media</h2>
          <ul className="mt-2 space-y-2">
            <li><a className="text-[#a294c5]" href="#">Online</a></li>
            <li><a className="text-[#a294c5]" href="#">Alternative Ads</a></li>
            <li><a className="text-[#a294c5]" href="#">Print</a></li>
          </ul>
        </li>

        <li className="w-1/2 md:w-auto md:flex-grow md:mr-8 mb-8 md:mb-0">
          <h2 className="text-sm">Technology</h2>
          <ul className="mt-2 space-y-2 columns-2 gap-5">
            <li><a className="text-[#a294c5]" href="#">Software Design</a></li>
            <li><a className="text-[#a294c5]" href="#">Hardware Design</a></li>
            <li><a className="text-[#a294c5]" href="#">Digital Signage</a></li>
            <li><a className="text-[#a294c5]" href="#">Automation</a></li>
            <li><a className="text-[#a294c5]" href="#">Artificial Intelligence</a></li>
            <li><a className="text-[#a294c5]" href="#">IoT</a></li>
          </ul>
        </li>

        <li className="w-1/2 md:w-auto md:flex-grow">
          <h2 className="text-sm">Legal</h2>
          <ul className="mt-2 space-y-2">
            <li><a className="text-[#a294c5]" href="#">Privacy Policy</a></li>
            <li><a className="text-[#a294c5]" href="#">Terms of Use</a></li>
            <li><a className="text-[#a294c5]" href="#">Sitemap</a></li>
          </ul>
        </li>
      </ul>

      <div className="w-full flex flex-wrap justify-between text-[#a294c5] mt-8">
        <p>&copy; 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
