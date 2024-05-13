"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import CoffeeCounter from "@/components/coffeeCounter";
import { Slider } from "@nextui-org/slider";
import { Tastes } from "./tastes";

export default function Home() {
	const [isMakingCoffee, setIsMakingCoffee] = useState(false)
	const [coffeeResults, setCoffeeResults] = useState('')
	const [coffeeSuggestion, setCoffeeSuggestion] = useState('')

	const handleStop = (result: number) => {
		setIsMakingCoffee(false)
		setCoffeeResults(`Coffee was made in ${result} seconds. How does it taste?`)
	}

	const handleCoffeeValue = (coffeeValue: any): void => {
		let suggestion = '';

		console.log('coffee value', coffeeValue[0]);


		switch (coffeeValue[0]) {
			case Tastes.BITTER:
				suggestion = 'Grind finer or reduce your yield'
				break;
			case Tastes.SWEET:
				suggestion = 'You\'re doing a good job!'
				break;
			case Tastes.SOUR:
				suggestion = 'Grind coarser or increase your yield'
				break;
		}

		setCoffeeSuggestion(suggestion)
	}

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Calculate your&nbsp;</h1>
				<h1 className={title({ color: "foreground" })}>coffee&nbsp;</h1>
				<br />
				<h1 className={title()}>
					taste using tech.
				</h1>
			</div>

			<div className="flex flex-col gap-3">
				{!isMakingCoffee ?
					<Button
						onClick={() => setIsMakingCoffee(true)}
						className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
					>
						Start making coffee
					</Button> :
					<CoffeeCounter start={isMakingCoffee} onStop={handleStop} />
				}
				{coffeeResults.length > 0 ? <>
					<br />
					<h1 className={subtitle()}>{coffeeResults}</h1>
					<Slider onChange={handleCoffeeValue} step={1} minValue={1} maxValue={3} marks={[
						{
							value: 1,
							label: 'Bitter'
						},
						{
							value: 2,
							label: 'Sweet'
						},
						{
							value: 3,
							label: 'Sour'
						},
					]} />
				</> : <></>}
				{coffeeSuggestion}
			</div>
		</section>
	);
}
