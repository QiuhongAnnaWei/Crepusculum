import { Spinner } from "@chakra-ui/react";
import './styles.css';

export const Loader = () => {

	return (
		<>
			<div className="loader-background" />
			<div className="loader-wrapper">
				<Spinner marginBottom={5} />
				<div className="heading">crepusculum</div>
				<div className="subtitle">a city generator</div>
			</div>
		</>
	);
}
