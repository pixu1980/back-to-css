// Centralized constants and asset imports for the Baseline Status component
// Assets are imported as text using Parcel's bundle-text: pipeline

// Support state icons
import ICON_SUPPORT_AVAILABLE from "bundle-text:./icons/support-available.svg";
import ICON_SUPPORT_UNAVAILABLE from "bundle-text:./icons/support-unavailable.svg";
import ICON_SUPPORT_NO_DATA from "bundle-text:./icons/support-no_data.svg";

// Browser icons
import ICON_BROWSER_CHROME from "bundle-text:./icons/browser-chrome.svg";
import ICON_BROWSER_EDGE from "bundle-text:./icons/browser-edge.svg";
import ICON_BROWSER_FIREFOX from "bundle-text:./icons/browser-firefox.svg";
import ICON_BROWSER_SAFARI from "bundle-text:./icons/browser-safari.svg";

// Baseline glyphs and UI icons
import GLYPH_BASELINE_LIMITED from "bundle-text:./icons/baseline-limited.svg";
import GLYPH_BASELINE_NEWLY from "bundle-text:./icons/baseline-newly.svg";
import GLYPH_BASELINE_WIDELY from "bundle-text:./icons/baseline-widely.svg";
import GLYPH_BASELINE_NO_DATA from "bundle-text:./icons/baseline-no_data.svg";
import ICON_CHEVRON from "bundle-text:./icons/chevron.svg";

// HTML templates
import TPL_LOADING from "bundle-text:./templates/loading.html";
import TPL_MAIN from "bundle-text:./templates/main.html";

// API endpoints and providers
const API_PROVIDER_DEFAULT = "auto"; // auto: try webstatus then mdn (if configured)
const API_ENDPOINT_WEBSTATUS = "https://api.webstatus.dev/v1/features/";
// MDN Browser Compat Data via CDN: expects a file path like "data/javascript/classes.json"
const API_ENDPOINT_MDN_CDN =
	"https://cdn.jsdelivr.net/npm/mdn-browser-compat-data@latest/";

// Baseline text definitions
const BASELINE_DEFS = {
	limited: {
		title: "Limited availability",
		defaultDescription:
			"This feature is not Baseline because it does not work in some of the most widely used browsers.",
	},
	newly: {
		title: "Newly available",
		defaultDescription:
			"This feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.",
	},
	widely: {
		title: "Widely available",
		defaultDescription:
			"This feature is well established and works across many devices and browser versions.",
	},
	loading: { title: "Loading", defaultDescription: "" },
	no_data: {
		title: "Unknown availability",
		defaultDescription:
			"We currently do not have browser support information about this feature.",
	},
};

// Mappings used by the component
const SUPPORT_ICONS = {
	available: ICON_SUPPORT_AVAILABLE,
	unavailable: ICON_SUPPORT_UNAVAILABLE,
	no_data: ICON_SUPPORT_NO_DATA,
};

const BROWSER_ICONS = {
	chrome: ICON_BROWSER_CHROME,
	edge: ICON_BROWSER_EDGE,
	firefox: ICON_BROWSER_FIREFOX,
	safari: ICON_BROWSER_SAFARI,
};

export {
	// endpoints and copy
	API_PROVIDER_DEFAULT,
	API_ENDPOINT_WEBSTATUS,
	API_ENDPOINT_MDN_CDN,
	BASELINE_DEFS,
	// icon maps
	SUPPORT_ICONS,
	BROWSER_ICONS,
	// glyphs and UI icons
	GLYPH_BASELINE_LIMITED,
	GLYPH_BASELINE_NEWLY,
	GLYPH_BASELINE_WIDELY,
	GLYPH_BASELINE_NO_DATA,
	ICON_CHEVRON,
	// templates
	TPL_LOADING,
	TPL_MAIN,
};
