import React from 'react';
import dc from '../images/dc.jpeg';
import prime from '../images/prime.jpeg';
import century from '../images/20th.jpeg';
import marvel from '../images/marvel.png';
import metro from '../images/metro.jpeg';
import sky from '../images/sky.jpeg';
import netflix from '../images/netflix.png';
import disney from '../images/disney.jpeg';
import hbo from '../images/hbo.jpeg';
import pixar from '../images/pixar.jpeg';

const BrandsCarousel = () => {
    return (
        <>
			<div className="slider">
				<div className="slide-track">
				<div className="slide">
					<img src={prime} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={marvel} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={netflix}height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={dc} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={metro} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={century} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={hbo} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={disney} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={pixar} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={sky} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={prime} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={marvel} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={netflix} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={dc} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={metro} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={century} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={sky} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={hbo} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={disney} height="100" width="250" alt="" />
				</div>
				<div className="slide">
					<img src={pixar} height="100" width="250" alt="" />
				</div>
			</div>
		</div>
    </>
    );
};

export default BrandsCarousel;