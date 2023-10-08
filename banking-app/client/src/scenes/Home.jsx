import Carousel from '../components/Carousel/Carousel'


const Home = () => {
  return (
    <div>
      <div className='relative ' >
        <Carousel  />
        <div className='absolute bottom-[-25%] right-0 flex'>
          <div className='bg-[#28334B] h-[45vh] w-[25vh]'></div>
          <div className='bg-[#00567a] h-[45vh] w-[25vh]'></div>
          <div className='bg-[#005b4a] h-[45vh] w-[25vh]'></div>
        </div>
      </div>
    </div>
  )
}

export default Home