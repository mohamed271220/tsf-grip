
import { BsNewspaper } from 'react-icons/bs'
import { AiOutlineMinus } from 'react-icons/ai'
import { TbHeartHandshake } from 'react-icons/tb'
import { HiOutlineLightBulb } from 'react-icons/hi'
const Hero = () => {
    return (
        <div className='lg:absolute relative lg:bottom-[-20%] lg:right-[5%] flex flex-col lg:flex-row z-50'>
            <div className='bg-[#28334B] h-[40vh] lg:h-[50vh] w-full lg:w-[37vh] flex flex-col items-center p-[3vh]  text-center justify-center gap-[2vh]'>
                <p>THE LATEST NEWS</p>
                <BsNewspaper />
                <AiOutlineMinus />
                <h1 className='font-bold text-[3vh]'>Lorem ipsum</h1>
                <p className='font-light text-[2vh]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque</p>
                <button className=' px-[4vh] py-[1vh] bg-orange-400 btn'>Learn more</button>
            </div>
            <div className='bg-[#00567a] h-[40vh] lg:h-[50vh] w-full lg:w-[37vh] flex flex-col items-center p-[3vh]  text-center justify-center gap-[2vh]'>
                <p>COMMUNITY OUTREACH</p>
                <TbHeartHandshake />
                <AiOutlineMinus />
                <h1 className='font-bold text-[3vh]'>Lorem ipsum</h1>
                <p className='font-light text-[2vh]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque</p>
                <button className=' px-[4vh] py-[1vh] bg-orange-400 btn'>Learn more</button>

            </div>
            <div className='bg-[#005b4a] h-[40vh] lg:h-[50vh] w-full lg:w-[37vh] flex flex-col items-center p-[3vh]  text-center justify-center gap-[2vh]'>
                <p>DID TOU KNOW</p>
                <HiOutlineLightBulb />
                <AiOutlineMinus />
                <h1 className='font-bold text-[3vh]'>Lorem ipsum</h1>
                <p className='font-light text-[2vh]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque</p>
                <button className=' px-[4vh] py-[1vh] bg-orange-400 btn'>Learn more</button>


            </div>
        </div>
    )
}

export default Hero