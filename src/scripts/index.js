import "@pixu-talks/core";

import "./baseline-status/baseline-status.js";
import "./_time-circuits.js";

const BUTTON_SELECTOR = "[data-attr-target]";
const SLIDER_SELECTOR = "[data-attr-slider-target]";
const FIELD_SELECTOR = "[data-attr-field-target]";
const LIVE_VALUE_SELECTOR = "[data-live-value-target]";
let liveOutputs = [];

const formatValue = (value, format) => {
	if (!format) {
		return value;
	}

	switch (format) {
		case "mph":
			return `${value} mph`;
		case "gw":
			return `${value} GW`;
		case "percent":
			return `${value}%`;
		case "year":
			return `${value}`;
		default:
			return value;
	}
};

const updateLiveOutput = (targetSelector, attrName) => {
	const target = document.querySelector(targetSelector);
	if (!target) {
		return;
	}

	liveOutputs
		.filter(
			(output) =>
				output.dataset.liveValueTarget === targetSelector &&
				output.dataset.liveValue === attrName,
		)
		.forEach((output) => {
			const format = output.dataset.liveFormat;
			const value = target.getAttribute(attrName) ?? "";
			output.textContent = formatValue(value, format);
		});
};

const updateAllOutputs = () => {
	liveOutputs.forEach((output) => {
		updateLiveOutput(output.dataset.liveValueTarget, output.dataset.liveValue);
	});
};

const setAttributeValue = (targetSelector, attrName, value, styleVar) => {
	const target = document.querySelector(targetSelector);
	if (!target) {
		return;
	}

	target.setAttribute(attrName, value);

	if (styleVar) {
		target.style.setProperty(styleVar, value);
	}

	updateLiveOutput(targetSelector, attrName);
};

const handleButtonPress = (event) => {
	const button = event.target.closest(BUTTON_SELECTOR);
	if (!button) {
		return;
	}

	event.preventDefault();

	const { attrTarget, attrName, attrValue, attrStyleVar, attrGroup } =
		button.dataset;

	setAttributeValue(attrTarget, attrName, attrValue, attrStyleVar);

	if (attrGroup) {
		document
			.querySelectorAll(`${BUTTON_SELECTOR}[data-attr-group='${attrGroup}']`)
			.forEach((peer) => {
				peer.setAttribute("aria-pressed", String(peer === button));
			});
	} else {
		const current = button.getAttribute("aria-pressed") === "true";
		button.setAttribute("aria-pressed", String(!current));
	}
};

const initButtons = () => {
	document.addEventListener("click", handleButtonPress);
};

const initSliders = () => {
	document.querySelectorAll(SLIDER_SELECTOR).forEach((slider) => {
		slider.addEventListener("input", () => {
			const {
				attrSliderTarget: targetSelector,
				attrName,
				attrStyleVar,
			} = slider.dataset;
			setAttributeValue(targetSelector, attrName, slider.value, attrStyleVar);
		});
	});
};

const initFields = () => {
	document.querySelectorAll(FIELD_SELECTOR).forEach((field) => {
		const handler = () => {
			const {
				attrFieldTarget: targetSelector,
				attrName,
				attrStyleVar,
			} = field.dataset;
			setAttributeValue(targetSelector, attrName, field.value, attrStyleVar);
		};

		const eventType = field.tagName === "SELECT" ? "change" : "input";
		field.addEventListener(eventType, handler);
	});
};

const initLiveOutputs = () => {
	liveOutputs = Array.from(document.querySelectorAll(LIVE_VALUE_SELECTOR));
	updateAllOutputs();
};

const initAttributeControls = () => {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			initButtons();
			initSliders();
			initFields();
			initLiveOutputs();
		});
		return;
	}

	initButtons();
	initSliders();
	initFields();
	initLiveOutputs();
};

initAttributeControls();
