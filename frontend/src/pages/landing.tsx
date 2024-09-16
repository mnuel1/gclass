

export const  LandingPage:React.FC = () => {
    return (
        <>
        <section className="bg-gray-50 flex h-full">
            <div className="mx-auto max-w-screen-2xl px-4 py-32 lg:flex grow lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Enhance Your Learning Experience
                        <strong className="font-extrabold text-blue-600 sm:block">Stay Organized, Stay Connected</strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Join your classes, access assignments, and collaborate with classmates—all in one place. Learning has never been easier.
                    </p>


                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                        className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                        href="#"
                        >
                        Create an Account
                        </a>

                        <a
                        className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                        href="#"
                        >
                        Learn More
                        </a>
                    </div>
                </div>
            </div>
            </section>
        </>
    )
}