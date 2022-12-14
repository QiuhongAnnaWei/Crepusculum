import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box } from "@chakra-ui/react";
import { SunIcon } from '@chakra-ui/icons'
import "./styles.css"
import { useEffect, useRef } from "react";

interface TimerProps {
	time: number,
	setTime: (time: number) => void
}

export const TimeSlider = (props: TimerProps) => {

	const { time, setTime } = props
	let realSec = useRef(0);

	useEffect(() => {
		const id = setInterval(() => {
			// console.log(time)
			setTime(realSec.current + 0.05)
			realSec.current += 0.05
		}, 100);
		// clean up after component unmount
		return () => clearInterval(id);
	}, []);

	return (
		<div className="time-wrapper">
			<div className="time-text">
				time of the day
			</div>
			<Slider aria-label='slider-ex-4' min={0} max={24} value={time} step={0.01} onChange={(e) => setTime(e)}>
				<SliderTrack bg='darkgray'>
					<SliderFilledTrack bg='gray' />
				</SliderTrack>
				<SliderThumb boxSize={6}>
					<Box color='black' as={SunIcon} />
				</SliderThumb>
			</Slider>
		</div>
	)
}