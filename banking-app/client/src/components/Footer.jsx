
import { FaFacebookSquare } from 'react-icons/fa';
import { TiSocialTwitter } from 'react-icons/ti';
import { AiFillInstagram } from 'react-icons/ai';
const Footer = () => {
  return (
    <div className=" w-full flex flex-col bg-[#28334b]
    h-[20vh]
        gap-[2vh]  justify-between items-center padding-x py-3 text-white  sticky z-50">

      <div className="text-[4vh]">© 2023 - All Rights Reserved</div>
      <div className='flex flex-row gap-[2vh] text-[4vh]'>
        <a href="https://www.facebook.com"><FaFacebookSquare/></a>
        <a href="https://www.twitter.com"><TiSocialTwitter/></a>
        <a href="https://www.instagram.com"><AiFillInstagram/></a>
      </div>
    </div>
  )
}

export default Footer