import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export const LandingPage: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const carouselItems = [
        {            
            text: 'Enhance Your Learning Experience',
            sub: "Stay Organized, Stay Connected",
            context: "Join your classes, access assignments, and collaborate with classmates—all in one place."
        },
        {            
            text: 'Access your assignments with ease.',
            sub: "Simplified Assignment Management",
            context: "Track deadlines, submit your work, and receive feedback seamlessly through our platform."
        },
        {            
            text: 'Engage in Interactive Learning.',
            sub: "Experience Learning Like Never Before",
            context: "Participate in live discussions, access learning resources, and benefit from personalized support to boost your success."
        },
    ];
    
    return (
        <>
        
            <section className="bg-gray-50 flex h-full relative bg-bg z-0">                
                <div className="mx-auto max-w-screen-[calc(100vw-100px)] px-4 lg:flex grow lg:items-center">
                    <div className="mx-auto max-w-[calc(100vw-100px)] text-center">
                        <div className="relative w-[calc(100vw-100px)] mt-8 lg:mt-0 h-[calc(100vh-150px)] ">
                            <div className="floating-object left-object-1" />
                            <div className="floating-object left-object-2" />
                            <div className="floating-object right-object-1" />
                            <div className="floating-object right-object-2" />
                            <div 
                                className="absolute inset-0 bg-cover bg-center rounded-lg"
                            />
                            <Slider {...settings} className="absolute inset-0 h-[calc(100vh-150px)] pointer-events-none">
                                {carouselItems.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center h-full">
                                        
                                        <div className="relative z-10 flex items-center justify-center h-[calc(100vh-150px)] text-black text-center">
                                            <div className="bg-opacity-50 p-8 rounded-lg">
                                                <h1 className="text-3xl font-extrabold sm:text-6xl">
                                                    {item.text} <br/>
                                                    <strong className="font-extrabold text-blue-600 sm:block italic sm:text-5xl mt-2 underline">{item.sub}</strong>
                                                </h1>
                                                <p className="mt-4 sm:text-md text-gray-500 font-semibold">
                                                    {item.context}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                            
                            <div className="absolute 
                                bottom-[calc(100vh-850px)] 
                                md:bottom-[calc(100vh-780px)] 
                                lg:bottom-[calc(100vh-720px)] 
                                xl:bottom-[calc(100vh-820px)] 
                                left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row justify-center gap-4 z-20">
                                <a
                                    className="block rounded bg-blue-600 px-2 lg:px-12 py-3 text-xs md:text-sm font-medium  
                                    text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                                    href="/sign-up"
                                >
                                    Create Account
                                </a>

                                <a
                                    className="block rounded px-2 lg:px-12 py-3 text-sm md:text-sm font-medium text-blue-600 shadow bg-gray-300 hover:bg-gray-400                                    
                                    focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                                    href="/about"
                                >
                                    Learn More
                                </a>
                            </div>                                                       
                        </div>
                    </div>
                </div>
            </section>
                      
            <style>{`
                .bg-bg {
                    background-color: rgba(229, 229, 247, 0.2); /* Semi-transparent background color */
                    background-size: 20px 20px;
                    background-image: repeating-linear-gradient(
                        0deg,
                        rgba(68, 76, 247, 0.2), /* Semi-transparent gradient */
                        rgba(68, 76, 247, 0.2) 1px,
                        rgba(229, 229, 247, 0.2) 1px,
                        rgba(229, 229, 247, 0.2)
                    );
                }

                .floating-object {
                
                    width: 200px;
                    height: 200px;
                    position: absolute;
                    background-size: contain;
                    background-repeat: no-repeat;
                    animation: float 6s ease-in-out infinite;
                }

                .left-object-1 {
                    top: 20%;
                    left: 10%;
                    background-image: url('https://img.icons8.com/?size=200&id=id6NGxHkL3QA&format=png&color=000000'); /* Example 3D object */
                }

                .left-object-2 {
                    top: 60%;
                    left: 15%;
                    background-image: url('https://img.icons8.com/?size=200&id=eNzPFsDh59Kt&format=png&color=000000');
                }

                .right-object-1 {
                    top: 25%;
                    right: 10%;
                    background-image: url('https://img.icons8.com/?size=200&id=AWPFmbr0eZkC&format=png&color=000000');
                }

                .right-object-2 {
                    top: 65%;
                    right: 15%;
                    background-image: url('https://img.icons8.com/?size=200&id=DX47IP3sDleo&format=png&color=000000');
                }

                @media (max-width: 768px) {
                    .floating-object {
                        width: 100px;  /* Adjust the size for tablets */
                        height: 100px; /* Adjust the size for tablets */
                    }
                }

                /* Small Devices (Mobile) */
                @media (max-width: 480px) {
                    .floating-object {
                        width: 50px;  /* Adjust the size for mobile */
                        height: 50px; /* Adjust the size for mobile */
                    }
                }

                @keyframes float {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
};
