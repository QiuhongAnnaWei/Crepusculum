import { Progress } from "@chakra-ui/progress";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import './styles.css'

export const Loader = () => {

	return (
		<>
			<div className="loader-background" />
			<div className="loader-wrapper">
				<Spinner marginBottom={5} />
				<div className="heading">crespeculum</div>
				<div className="subtitle">a city generator</div>
			</div>
		</>
	);
}
