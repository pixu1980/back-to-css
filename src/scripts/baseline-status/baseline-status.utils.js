import {
	BASELINE_DEFS,
	SUPPORT_ICONS,
	GLYPH_BASELINE_LIMITED,
	GLYPH_BASELINE_NEWLY,
	GLYPH_BASELINE_WIDELY,
	GLYPH_BASELINE_NO_DATA,
} from "./baseline-status.constants.js";

function formatBaselineDate(feature) {
	const d = feature?.baseline?.low_date;
	if (!d) return "";
	try {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
		}).format(new Date(d));
	} catch {
		return "";
	}
}

function descriptionFor(baseline, date) {
	if (baseline === "newly" && date) {
		return `Since ${date} this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.`;
	}
	if (baseline === "widely" && date) {
		return `This feature is well established and works across many devices and browser versions. It has been available across browsers since ${date}.`;
	}
	return (
		BASELINE_DEFS[baseline]?.defaultDescription ||
		BASELINE_DEFS.no_data.defaultDescription
	);
}

function renderSupportIcon(baseline, browserImplementation) {
	const support =
		baseline === "limited"
			? browserImplementation?.status || "unavailable"
			: baseline;
	const iconKey =
		support === "newly" || support === "widely" ? "available" : support;
	const cls = `support-${support}`;
	const svg = SUPPORT_ICONS[iconKey] || SUPPORT_ICONS.no_data;
	return `<span class="${cls}" aria-hidden="true">${svg}</span>`;
}

function renderBaselineGlyph(support) {
	if (support === "limited") return GLYPH_BASELINE_LIMITED;
	if (support === "newly") return GLYPH_BASELINE_NEWLY;
	if (support === "widely") return GLYPH_BASELINE_WIDELY;

	return GLYPH_BASELINE_NO_DATA;
}

function renderTemplate(tpl, map) {
	return tpl.replace(/\{\{(.*?)\}\}/g, (_, k) => map[k.trim()] ?? "");
}

function ensureStyles(cssText) {
	const STYLE_ID = "baseline-status-component-styles";
	if (document.getElementById(STYLE_ID)) return;
	const style = document.createElement("style");
	style.id = STYLE_ID;
	style.textContent = cssText;
	document.head.appendChild(style);
}

// Return a robust pair { label: 'Month Year', year: 'YYYY' } from feature.baseline.low_date
function getBaselineDateParts(feature) {
	const raw = feature?.baseline?.low_date;
	if (!raw) return { label: "", year: "" };
	let dateObj = null;
	// string like '2024-08-21' or '2024'
	if (typeof raw === "string") {
		const parsed = Date.parse(raw);
		if (!Number.isNaN(parsed)) dateObj = new Date(parsed);
		// handle pure year strings '2024'
		else if (/^\d{4}$/.test(raw)) dateObj = new Date(Number(raw), 0, 1);
	}
	// number epoch (seconds or ms)
	if (typeof raw === "number") {
		dateObj = new Date(raw < 1e12 ? raw * 1000 : raw);
	}
	// object with fields {year, month}
	if (!dateObj && typeof raw === "object") {
		const y = Number(raw.year);
		const m = raw.month != null ? Number(raw.month) - 1 : 0; // 1-based to 0-based
		if (!Number.isNaN(y)) dateObj = new Date(y, !Number.isNaN(m) ? m : 0, 1);
	}
	if (!dateObj || Number.isNaN(dateObj.getTime()))
		return { label: "", year: "" };
	try {
		const label = new Intl.DateTimeFormat("en-US", {
			month: "long",
			year: "numeric",
		}).format(dateObj);
		const year = String(dateObj.getFullYear());
		return { label, year };
	} catch {
		return { label: "", year: "" };
	}
}

// Return the most recent date across all browser implementations: { label, year }
function getLatestImplementationDateParts(feature) {
	const impl = feature?.browser_implementations;
	if (!impl || typeof impl !== "object") return { label: "", year: "" };

	const parseDate = (raw) => {
		if (!raw) return null;
		let d = null;
		if (typeof raw === "string") {
			const parsed = Date.parse(raw);
			if (!Number.isNaN(parsed)) d = new Date(parsed);
			else if (/^\d{4}$/.test(raw)) d = new Date(Number(raw), 0, 1);
		} else if (typeof raw === "number") {
			d = new Date(raw < 1e12 ? raw * 1000 : raw);
		} else if (typeof raw === "object") {
			const y = Number(raw.year);
			const m = raw.month != null ? Number(raw.month) - 1 : 0;
			if (!Number.isNaN(y)) d = new Date(y, !Number.isNaN(m) ? m : 0, 1);
		}
		return d && !Number.isNaN(d.getTime()) ? d : null;
	};

	let latest = null;
	for (const key of Object.keys(impl)) {
		const date = parseDate(impl[key]?.date);
		if (date && (!latest || date > latest)) latest = date;
	}
	if (!latest) return { label: "", year: "" };
	try {
		const label = new Intl.DateTimeFormat("en-US", {
			month: "long",
			year: "numeric",
		}).format(latest);
		const year = String(latest.getFullYear());
		return { label, year };
	} catch {
		return { label: "", year: "" };
	}
}

export {
	formatBaselineDate,
	getBaselineDateParts,
	getLatestImplementationDateParts,
	descriptionFor,
	renderSupportIcon,
	renderBaselineGlyph,
	renderTemplate,
	ensureStyles,
};
// Escape utilities to protect HTML/attribute contexts when injecting dynamic text
function escapeHTML(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function escapeAttr(value) {
	// For simplicity use same escaping as HTML text since we place values inside double quotes
	return escapeHTML(value);
}

export { escapeHTML, escapeAttr };

// Convert an inline SVG markup string into a data URI string.
// This isolates <defs> ids and avoids cross-instance collisions in the DOM.
function svgToDataUri(svg) {
	if (!svg) return "";
	// Ensure XML is compact for URI length and avoid stray whitespace
	const cleaned = String(svg)
		.replace(/\n+/g, "")
		.replace(/>\s+</g, "><")
		.trim();
	const encoded = encodeURIComponent(cleaned)
		// EncodeURIComponent already encodes most characters; keep SVG friendly
		.replace(/%20/g, " ");
	return `data:image/svg+xml;utf8,${encoded}`;
}

// Build an <img> tag string for a given inline SVG string.
// width/height are optional; if missing, try to infer from the svg tag or default to 21.
function svgToImgTag(svg, { width, height, className = "browser-icon" } = {}) {
	if (!svg) return "";
	let w = width;
	let h = height;
	if (w == null || h == null) {
		const m = String(svg).match(
			/<svg[^>]*\bwidth=["']?(\d+)["']?[^>]*\bheight=["']?(\d+)["']?[^>]*>/i,
		);
		if (m) {
			w = w ?? Number(m[1]);
			h = h ?? Number(m[2]);
		}
	}
	w = w ?? 21;
	h = h ?? 21;
	const src = svgToDataUri(svg);
	return `<img class="${escapeAttr(className)}" alt="" aria-hidden="true" role="presentation" src="${escapeAttr(src)}" width="${escapeAttr(String(w))}" height="${escapeAttr(String(h))}" />`;
}

export { svgToDataUri, svgToImgTag };
