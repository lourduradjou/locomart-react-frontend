import React from 'react'
import {
	FaDribbbleSquare,
	FaFacebookSquare,
	FaGithubSquare,
	FaInstagram,
	FaTwitterSquare,
} from 'react-icons/fa'

const Footer = () => (
	<div
		className='w-full grid lg:grid-cols-3 gap-8 text-gray-300 max-w-[1240px] mx-auto py-16 px-10 '
		id='footer'
	>
		<div>
			<h1 className='text-xl font-bold w-full hover:text-[#b028b0] duration-200'>
				REACT.
			</h1>
			<p className='py-4 hover:text-[#b028b0] duration-200'>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
				culpa, unde laudantium rerum voluptatibus fugit harum? Lorem,
				ipsum dolor.
			</p>
			<div className='flex md:w-[75%] my-6 justify-between'>
				<FaDribbbleSquare
					size={30}
					className='hover:text-[#b028b0] duration-200'
				/>
				<FaFacebookSquare
					size={30}
					className='hover:text-[#b028b0] duration-200'
				/>
				<FaGithubSquare
					size={30}
					className='hover:text-[#b028b0] duration-200'
				/>
				<FaInstagram
					size={30}
					className='hover:text-[#b028b0] duration-200'
				/>
				<FaTwitterSquare
					size={30}
					className='hover:text-[#b028b0] duration-200'
				/>
			</div>
		</div>
		<div className='lg:col-span-2 flex justify-between font-medium text-sm'>
			<div>
				<p className='mb-4 hover:text-[#b028b0] duration-200 text-lg'>
					Solutions
				</p>
				<p className='mb-4 hover:text-[#b028b0] duration-200'>
					Analytics
				</p>
				<p className='mb-4 hover:text-[#b028b0] duration-200'>
					Marketing
				</p>
				<p className='mb-4 hover:text-[#b028b0] duration-200'>
					Analysis
				</p>
				<p className='mb-4 hover:text-[#b028b0] duration-200'>
					Insights
				</p>
			</div>
			<div>
				<p className='pb-4 hover:text-[#b028b0] duration-200 text-lg'>
					Support
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					Pricing
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					Documentation
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>Guides</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					API Status
				</p>
			</div>
			<div>
				<p className='pb-4 hover:text-[#b028b0] duration-200 text-lg'>
					Solutions
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					Analytics
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					Marketing
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					Analysis
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					Insights
				</p>
			</div>
			<div>
				<p className='pb-4 hover:text-[#b028b0] duration-200 text-lg'>
					Company
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>About</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>Blogs</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					Careers
				</p>
				<p className='pb-4 hover:text-[#b028b0] duration-200'>
					Privacy
				</p>
			</div>
		</div>
	</div>
)

export default Footer
