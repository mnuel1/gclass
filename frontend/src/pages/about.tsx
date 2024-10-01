import React from 'react';

export const AboutPage: React.FC = () => {     
    return (
        <>                   
            <section className="bg-gray-50 flex h-full relative bg-bg z-0">                
                <div className="mx-auto max-w-screen-[calc(100vw-100px)] px-4 lg:flex grow lg:items-center">
                    <div className="mx-auto max-w-[calc(100vw-100px)] text-center">
                        <h2 className="text-4xl font-bold text-gray-800 mb-8">About Us</h2>
                        <p className="text-lg text-gray-600">
                            We are a dedicated team focused on revolutionizing the learning experience. Our platform is designed to make education
                            more accessible, interactive, and engaging for students and educators alike. By simplifying assignment management and
                            facilitating collaboration, we aim to foster a seamless learning journey for everyone.
                        </p>
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
