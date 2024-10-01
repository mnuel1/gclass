import React from 'react';


export const FAQPage: React.FC = () => {

    const faqs = [
        {
            question: "How do I create an account?",
            answer: "Simply click on the 'Create Account' button and follow the on-screen instructions to register for free."
        },
        {
            question: "What features are included?",
            answer: "Our platform offers assignment tracking, live discussions, resource sharing, and personalized support for students."
        },
        {
            question: "How can I contact support?",
            answer: "You can reach our support team by visiting the Contact Us page or emailing us at support@platform.com."
        }
    ];
    
    return (
        <>
                   
            {/* FAQ Section */}
            <section className="bg-gray-50 flex h-full relative bg-bg z-0">                
                <div className="mx-auto max-w-screen-[calc(100vw-100px)] px-4 lg:flex grow lg:items-center">
                    <div className="mx-auto max-w-[calc(100vw-100px)] text-center">
                        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="text-left bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
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
