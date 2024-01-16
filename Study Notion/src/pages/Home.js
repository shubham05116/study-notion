import { Link } from "react-router-dom"
import { FaArrowRight, FaBuyNLarge } from "react-icons/fa";
import HighlightText from "../components/Core/HomePage/HighlightText";
import Button from "../components/Core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/Core/HomePage/CodeBlocks";


const Home = () => {
    return (
        <div className="relative mx-auto w-11/12 max-w-maxContent text-white font-inter flex flex-col items-center justify-between">
            <Link to="/signup">
                <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                    <div className="flex items-center gap-3 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>
            <div className="text-center text-4xl mt-6 font-semibold">
                Empower Your Future with <HighlightText text={"Coding Skills"} />
            </div>
            <div className=" w-[70%] mt-4 font-bold text-center leading-normal text-richblack-400 font-inter ">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className="flex flex-row gap-7 mt-8">
                <Button active={true} linkto={"/signup"}>Learn More</Button>
                <Button active={false} linkto={'/login'}>Book a Demo</Button>
            </div>

            <div className="mx-3 my-10 shadow-blue-200 w-[70%]  ">
                <video muted loop autoPlay>
                    <source src={Banner} type="video/mp4" />
                </video>
            </div>

            <div>
                <CodeBlocks
                    position={"flex-row"}
                    heading={<div className="text-4xl font-semibold">Unlock Your <HighlightText text={"Coding Potential"} /> with our Online Courses</div>}
                    subheading={"Our online coding courses are designed to help you learn the fundamentals of programming from the comfort of your home. You’ll get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors."}
                    btn1={
                        {
                            text: "Try It Yourself",
                            linkto: "/signup",
                            active: true
                        }
                    }
                    btn2={
                        {
                            text: "Learn More",
                            linkto: "/login",
                            active: false
                        }

                    }
                    codeblock={`<<!DOCTYPE html>\n <html>\n<head><title>Example</title>linkrel="stylesheet"href="style.css">\n</head>\n<body>\n<h1>Example</h1>\n<p>Example</p>\n</body>\n</html>`}
                    codeColor={"text-yellow-20"}

                />
            </div>

        </div>
    )
}

export default Home
