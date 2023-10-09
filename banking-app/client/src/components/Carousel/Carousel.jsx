import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Carou1 from '../../assets/Carou1.jpg'
import Carou2 from '../../assets/Carou2.jpg'
import "./Carousel.css";



const NewsCarousel = () => {
    return (
        <Carousel
            // autoPlay
            swipeable
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            labels={false}

            interval={10000}
            infiniteLoop
        >

            <div key={'1'} className="carousel-item relative lg:block justify-center flex  items-center w-full "
            >
                <div className="  absolute  font-bold lg:top-[15%] lg:right-[15%] w-[40%] z-50">
                    <h1 className="text-white font-mono text-[3vh] lg:text-[7vh] ">
                        Thinking of starting a new business?
                    </h1>
                </div>
                <div className="gradiantCustom">
                    <img
                        className="carousel-item__image w-full"
                        src={Carou1}
                        alt={'Carousel Image 1'}
                    />
                </div>
            </div>
            <div key={'2'} className="carousel-item relative lg:block justify-center flex  items-center w-full "
            >
                <div className="  absolute  font-bold lg:top-[15%] lg:right-[15%] w-[40%] z-50">
                    <h1 className="text-white font-mono text-[3vh] lg:text-[7vh] ">
                        Thinking of starting a new business?
                    </h1>
                </div>
                <div className="gradiantCustom">
                    <img
                        className="carousel-item__image w-full"
                        src={Carou2}
                        alt={'Carousel Image 2'}
                    />
                </div>
            </div>


        </Carousel>
    );
};

export default NewsCarousel;
