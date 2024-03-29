import React from 'react'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({ position, heading, subheading, btn1, btn2, codeblock, bgGradient, codeColor }) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* Section 1 */}
      <div className='w-[50%] flex flex-col gap-8 '>
        {heading}
        <div className='text-richblack-300 font-bold '>
          {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
          <Button active={btn1.active} linkto={btn1.linkto}>
            <div className='flex gap-2 items-center'>
              {btn1.text}
              <FaArrowRight />
            </div>
          </Button>

          <Button active={btn2.active} linkto={btn2.linkto}>
            {btn2.text}

          </Button>
        </div>
      </div>

      {/* Section 2 */}
      <div className='h-fit flex flex-row text-[10px] w-[100%] py-4 lg:w-[500px]'>
        <div className='flex flex-col w-[10%] text-center text-richblack-400 font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 `}>
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            //   omitDeletionAnimation={true}
            style={{
              display: "block"
            }}
          >
            \      </TypeAnimation>
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
