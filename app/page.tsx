"use client";

import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import EspressoMaker from "@/components/espressoMaker";
import EspressoInput from "@/components/espressoInput";
import { useState } from "react";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Pull the&nbsp;</h1>
				<br />
				<h1 className={title({ color: "foreground" })}>
					perfect espresso shot&nbsp;
				</h1>
				<br />
				<h1 className={title()}>using tech.</h1>
			</div>

			<div className="flex flex-col gap-4">
				<EspressoMaker />
			</div>
		</section>
	);
}
