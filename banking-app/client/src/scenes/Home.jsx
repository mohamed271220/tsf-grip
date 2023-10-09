import Carousel from '../components/Carousel/Carousel'
import Hero from '../components/Hero'
import Table from '../components/Table'
const Home = () => {
  return (
    <div className='flex flex-col  gap-[5vh]'>
      <div className='relative text-white  lg:mb-[20vh]'>
        <Carousel />
        <Hero />
      </div>
      <Table/>
    </div>
  )
}

export default Home