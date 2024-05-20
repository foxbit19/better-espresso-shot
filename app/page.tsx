"use client";

import { title } from "@/components/primitives";
import EspressoMaker from "@/components/espressoMaker";
import Lottie from 'react-lottie';
import animation from './lottie/espresso.json'
import OldData from "@/components/oldData";
import ShareBar from "@/components/shareBar";

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
			<div className="inline-block  text-center justify-center">
				<h1 className={title()}>Improve your&nbsp;</h1>
				<br />
				<h1 className={title({ color: "foreground" })}>
					coffee experience&nbsp;
				</h1>
				<br />
				<h1 className={title()}>
					using ratio analysis&nbsp;
				</h1>
			</div>

			<div className="flex flex-col gap-5 py-10 max-w-lg">
				<EspressoMaker />
				<OldData />
				<ShareBar />
			</div>
		</section>
	);
}
