import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import ArticleCard from "../../components/widgets/cards/ArticleCard";
import { AdDisplay } from "../ads/AdContainer";
import { useSelector } from "react-redux";
import { selectAllAds } from "../../features/ads/adsSlice";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon, PauseIcon, PlayIcon } from "@heroicons/react/outline";

export default function ArticleCarousel(props) {
	const allAds = useSelector(selectAllAds);
	const [offsetRadius, setOffsetRadius] = useState(2);
	const [showArrows, setShowArrows] = useState(false);
	const [showControls, setShowControls] = useState(false);
	const [goToSlide, setGoToSlide] = useState(0);
	const [cards, setCards] = useState([]);
	const [touched, setTouched] = useState(false);
	const [autoPlayInterval, setAutoPlayInterval] = useState(false);
	const autoPlayIncrement = 10000;
	const [carouselAdConfig, setCarouselAdConfig] = useState({});

	const setFinalSlides = (propCards) => {
		let articleCards = [];
		propCards.forEach((article, index) => {
			if (article?.title.toLowerCase() === "carouselad") {
				articleCards.push({
					key: article.id,
					content: <AdDisplay type="carousel-ad" isScript={carouselAdConfig.isScript} template={carouselAdConfig.template} wrapperClass="relative" showOverlay={goToSlide !== index} callback={() => setGoToSlide(index)} imageClass="h-48" />,
				});
			} else {
				articleCards.push({
					key: article.id,
					content: <ArticleCard article={article} key={article.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden w-72 sm:w-96 relative" showOverlay={goToSlide !== index} callback={() => setGoToSlide(index)} imageClass="h-48" />,
				});
			}
		});
		setCards(articleCards);
	};

	useEffect(() => {
		let propCards = [...props.cards];

		if (!carouselAdConfig?.template) {
			propCards = propCards.filter((card) => card.title.toLowerCase() !== "carouselad");
			setFinalSlides(propCards);
		} else {
			setFinalSlides(propCards);
		}
	}, [props.cards, goToSlide, carouselAdConfig]);

	useEffect(() => {
		if (allAds.length > 0) {
			const adsResponse = allAds[0];
			const tmpCarouselAd = adsResponse.impressions.find((impression) => impression.tagName === "carousel-ad");

			if (adsResponse?.isEnabled && tmpCarouselAd?.isEnabled) {
				setCarouselAdConfig({ isScript: tmpCarouselAd.isScript, template: tmpCarouselAd.template });
			}
		}
	}, [allAds]);

	useEffect(() => {
		let currentSlideIndex = goToSlide;
		if (autoPlayInterval) {
			// after user interacts with carousel, disable autoplay
			clearInterval(autoPlayInterval);
		} else if (props.cards.length > 1 && !touched) {
			// if more than one slide, set autoplay interval until the user interacts
			setAutoPlayInterval(
				setInterval(() => {
					currentSlideIndex = currentSlideIndex + 1;
					setGoToSlide(currentSlideIndex);
				}, autoPlayIncrement)
			);
		}

		return () => {
			clearInterval(autoPlayInterval);
			setAutoPlayInterval(false);
		};
	}, [touched]);

	useEffect(() => {
		setOffsetRadius(props.offset);
		setShowArrows(props.showArrows);
		setShowControls(props.showControls);
	}, [props.offset, props.showArrows, props.showControls]);

	const handleSlideChange = (index) => {
		setTouched(true);
		setGoToSlide(index);
	};

	let xDown = null;
	let yDown = null;

	const getTouches = (evt) => {
		return evt.touches || evt.originalEvent.touches;
	};

	const handleTouchStart = (evt) => {
		const firstTouch = getTouches(evt)[0];
		xDown = firstTouch.clientX;
		yDown = firstTouch.clientY;
	};

	const handleTouchMove = (evt) => {
		if (!xDown || !yDown) {
			return;
		}

		let xUp = evt.touches[0].clientX;
		let yUp = evt.touches[0].clientY;

		let xDiff = xDown - xUp;
		let yDiff = yDown - yUp;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) {
				// swipe left
				handleSlideChange(goToSlide + 1);
			} else {
				// swipe right
				handleSlideChange(goToSlide - 1);
			}
		} else {
			if (yDiff > 0) {
				// swipe up
			} else {
				// swipe down
			}
		}
		// Reset values
		xDown = null;
		yDown = null;
	};

	return (
		<div className={`relative mx-auto px-4 sm:px-6 lg:px-12 h-96 overflow-hidden sm:overflow-visible ${showControls ? "mb-8" : ""}`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
			<Carousel slides={cards} goToSlide={goToSlide} offsetRadius={offsetRadius} showNavigation={showArrows} />
			{showControls ? (
				<div className="flex justify-center align-center space-4 p-4">
					<ArrowCircleLeftIcon className="h-6 w-6 text-primary opacity-50 hover:opacity-100 cursor-pointer" onClick={() => handleSlideChange(goToSlide - 1)} />
					{touched ? <PlayIcon className="h-6 w-6 text-primary opacity-50 hover:opacity-100 cursor-pointer" onClick={() => setTouched(false)} /> : <PauseIcon className="h-6 w-6 text-primary opacity-50 hover:opacity-100 cursor-pointer" onClick={() => setTouched(true)} />}
					<ArrowCircleRightIcon className="h-6 w-6 text-primary opacity-50 hover:opacity-100 cursor-pointer" onClick={() => handleSlideChange(goToSlide + 1)} />
				</div>
			) : (
				""
			)}
		</div>
	);
}
