import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box } from "@chakra-ui/react";
import { SunIcon } from '@chakra-ui/icons'
import "./styles.css"

interface TimerProps {
	time: number,
	setTime: (time: number) => void
}

export const TimeSlider = (props: TimerProps) => {

	const { time, setTime } = props

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