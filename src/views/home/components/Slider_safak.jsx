import React from 'react'
import {sliderItems} from '../../../global/data'
import slider1 from '../../../assets/slider-1.png'
import slider2 from '../../../assets/slider-2.png'


class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderIndex: 0
        };

    };

    handleClick(direction) {
        if(direction=='right' && this.state.sliderIndex==0) {
            this.setState({sliderIndex: 1});
        } else if(direction=='left' && this.state.sliderIndex==1) {
            this.setState({sliderIndex: 0})
        }        
    }

    render() {
        return (
            <main className='w-full h-[calc(100vh-6rem)] p-2
            relative hidden sm:flex overflow-hidden z-20'>

                {/*Left Arrow*/}
                <div className='Arrow-Left absolute left-5 top-1/2 z-[5]' onClick={()=>this.handleClick('left')}>
                    <i className="fa-solid fa-arrow-left fa-2xl"></i>

                </div>

                {/*Image*/}
                <div className='SliderImage flex transition ease-out duration-1000 z-[1]' style={{transform: `translateX(${this.state.sliderIndex*-100}vw)`}}>
                    {sliderItems.slice(1,3).map((e) => {
                        return (
                        <div key={e.id} bg={e.bg} className={`Slide w-screen h-screen relative bg-[#${e.bg}]`}>
                            <img className='SlideCircle z-1'></img>
                            <img className='SlideImg scale-[60%] -translate-x-40 -translate-y-[10rem] z-[5]' src={e.img}/>

                            <div className='flex flex-col absolute left-1/2 top-1/4 w-[50vw]'>
                                <h1 className='z-1 font-bold text-black antialiased text-7xl'>{e.title}</h1>
                                <h3 className='z-1 antialiased text-xl'>{e.desc}</h3>
                            </div>
                        </div>
                        )}
                    )}                    
                </div>

                {/*Right Arrow*/}
                <div className='Arrow-Right absolute right-5 top-1/2 z-[5]' onClick={()=>this.handleClick('right')}>
                    <i className="fa-solid fa-arrow-right fa-2xl"></i>
                </div>



            </main>
            
            )
    };
};

export default Slider;