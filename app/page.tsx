"use client";

import { title } from "@/components/primitives";
import EspressoMaker from "@/components/espressoMaker";
import Lottie from 'react-lottie';
import animation from './lottie/espresso.json'

export default function Home() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<section className="flex flex-col items-center justify-center gap-5 md:py-1">
			<Lottie options={defaultOptions}
				height={300}
				width={300} />
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Pull the&nbsp;</h1>
				<br />
				<h1 className={title({ color: "foreground" })}>
					perfect espresso shot&nbsp;
				</h1>
				<br />
				<h1 className={title()}>and get your ratio.</h1>
			</div>

			<div className="flex flex-col gap-4 py-10">
				<EspressoMaker />
			</div>
		</section>
	);
}
