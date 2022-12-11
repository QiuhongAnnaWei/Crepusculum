import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box } from "@chakra-ui/react";
import { SunIcon } from '@chakra-ui/icons'

export const TimeSlider = () => {

	return (
		<Slider aria-label='slider-ex-4' defaultValue={30}>
			<SliderTrack bg='red.100'>
				<SliderFilledTrack bg='tomato' />
			</SliderTrack>
			<SliderThumb boxSize={6}>
				<Box color='tomato' as={SunIcon} />
			</SliderThumb>
		</Slider>
	)
}