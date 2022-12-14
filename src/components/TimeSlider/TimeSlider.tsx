import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Button } from "@chakra-ui/react";
import { SunIcon } from '@chakra-ui/icons'
import "./styles.css"
import { useEffect, useRef, useState } from "react";

interface TimerProps {
	time: number,
	setTime: (time: number) => void
}

export const TimeSlider = (props: TimerProps) => {

	const { time, setTime } = props
	const [isAnimated, setIsAnimated] = useState(true)

	let realSec = useRef(0);

	useEffect(() => {
		let autoIncrementor: NodeJS.Timeout | undefined;
		if (isAnimated) {
			autoIncrementor = setInterval(() => {
				// console.log(time)
				setTime(realSec.current + 0.05)
				realSec.current += 0.05
				if (realSec.current >= 24) {
					setTime(0)
					realSec.current = 0
				}
			}, 20);
		} else {
			clearInterval(autoIncrementor)
		}
		// clean up after component unmount
		return () => clearInterval(autoIncrementor);
	}, [isAnimated]);

	const handleSliderChange = (e: number) => {
		setTime(e)
		realSec.current = e
	}

	const handleAnimation = () => {
		setIsAnimated(!isAnimated)
	}

	return (
		<div className="time-wrapper">
			<div className="time-text">
				time of the day
			</div>
			<Slider aria-label='slider-ex-4' min={0} max={24} value={time} step={0.01} onChange={handleSliderChange}>
				<SliderTrack bg='darkgray'>
					<SliderFilledTrack bg='gray' />
				</SliderTrack>
				<SliderThumb boxSize={6}>
					<Box color='black' as={SunIcon} />
				</SliderThumb>
			</Slider>
			<Button variant="outline" size='xs' width="100%" marginTop={2} onClick={handleAnimation}>
				{`${isAnimated ? "stop" : "start"} animation`}
			</Button>
		</div>
	)
}