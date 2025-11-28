// Baseline Status Web Component (vanilla JS)
// - Autonomous custom element (no Shadow DOM, no <template>)
// - Fetches Baseline info from https://api.webstatus.dev
// - Assets (CSS, SVG, HTML) imported as text via Parcel bundle-text: pipeline

import styles from "bundle-text:./baseline-status.css";

import {
	API_PROVIDER_DEFAULT,
	API_ENDPOINT_WEBSTATUS,
	API_ENDPOINT_MDN_CDN,
	BASELINE_DEFS,
	SUPPORT_ICONS,
	BROWSER_ICONS,
	ICON_CHEVRON,
	TPL_LOADING,
	TPL_MAIN,
} from "./baseline-status.constants.js";

import {
	formatBaselineDate,
	descriptionFor,
	renderSupportIcon,
	renderBaselineGlyph,
	renderTemplate,
	ensureStyles,
	getBaselineDateParts,
	getLatestImplementationDateParts,
	escapeHTML,
	escapeAttr,
	svgToImgTag,
} from "./baseline-status.utils.js";

// inject component styles once

export class BaselineStatus extends HTMLElement {
	static get observedAttributes() {
		return ["feature-id", "featureId", "provider", "mdn-path"];
	}

	constructor() {
		super();
		this._ctrl = null;
		this._data = null;
		this._loading = false;
		ensureStyles(styles);
	}

	connectedCallback() {
		this._renderLoading();
		this._fetchAndRender();
	}

	disconnectedCallback() {
		if (this._ctrl) this._ctrl.abort();
	}

	attributeChangedCallback(name) {
		if (
			name === "feature-id" ||
			name === "featureId" ||
			name === "provider" ||
			name === "mdn-path"
		) {
			const fid =
				this.getAttribute("feature-id") || this.getAttribute("featureId");
			if (fid && this.getAttribute("feature-id") !== fid)
				this.setAttribute("feature-id", fid);
			this._fetchAndRender();
		}
	}

	get featureId() {
		return (
			this.getAttribute("feature-id") || this.getAttribute("featureId") || ""
		);
	}
	get provider() {
		return this.getAttribute("provider") || API_PROVIDER_DEFAULT;
	}
	set provider(v) {
		if (v == null) this.removeAttribute("provider");
		else this.setAttribute("provider", String(v));
	}

	get mdnPath() {
		return this.getAttribute("mdn-path") || "";
	}
	set mdnPath(v) {
		if (v == null) this.removeAttribute("mdn-path");
		else this.setAttribute("mdn-path", String(v));
	}
	set featureId(v) {
		if (v == null) this.removeAttribute("feature-id");
		else this.setAttribute("feature-id", String(v));
	}

	_renderLoading() {
		const html = renderTemplate(TPL_LOADING, {
			featureName: escapeHTML(this.featureId || "Loading feature..."),
			baselineGlyph: renderBaselineGlyph("no_data"),
			chromeIcon: this._browserImg("chrome"),
			edgeIcon: this._browserImg("edge"),
			firefoxIcon: this._browserImg("firefox"),
			safariIcon: this._browserImg("safari"),
			noDataIcon: SUPPORT_ICONS.no_data,
			chevronIcon: ICON_CHEVRON,
		});

		this.innerHTML = html;
	}

	_render(feature) {
		const baseline = feature?.baseline?.status || "no_data";
		const title = BASELINE_DEFS[baseline]?.title || BASELINE_DEFS.no_data.title;
		const { label: baselineDateLabel, year } = getBaselineDateParts(feature);
		const { label: latestImplLabel } =
			getLatestImplementationDateParts(feature);
		const badge =
			baseline === "newly"
				? '<span class="baseline-badge">newly available</span>'
				: "";
		const description = descriptionFor(baseline, baselineDateLabel);
		const impl = feature?.browser_implementations || {};
		const aria = this._buildAriaLabel(title, year, !!badge, impl);
		const since = latestImplLabel ? `(since ${latestImplLabel})` : "";

		const html = renderTemplate(TPL_MAIN, {
			name: escapeHTML(feature?.name || this.featureId || "Unknown feature"),
			aria: escapeAttr(aria),
			baseline,
			since,
			baselineGlyph: renderBaselineGlyph(baseline),
			baselineLabel: "<strong>Baseline</strong>",
			title,
			year,
			badge,
			chromeIcon: this._browserImg("chrome"),
			edgeIcon: this._browserImg("edge"),
			firefoxIcon: this._browserImg("firefox"),
			safariIcon: this._browserImg("safari"),
			chromeSupport: renderSupportIcon(baseline, impl.chrome),
			edgeSupport: renderSupportIcon(baseline, impl.edge),
			firefoxSupport: renderSupportIcon(baseline, impl.firefox),
			safariSupport: renderSupportIcon(baseline, impl.safari),
			chevronIcon: ICON_CHEVRON,
			description,
			learnMore:
				baseline === "no_data" ? "" : this._buildLearnMoreLink(feature),
		});

		this.innerHTML = html;
	}

	_buildLearnMoreLink(feature) {
		// Prefer MDN url if present from BCD normalization
		const mdn = feature?.learn_more_url;
		if (mdn) {
			return `<a href="${escapeAttr(mdn)}" target="_blank" rel="noopener noreferrer">Learn more on MDN</a>`;
		}
		const id = feature?.feature_id || this.featureId;
		return `<a href="https://webstatus.dev/features/${escapeAttr(id)}" target="_blank" rel="noopener noreferrer">Learn more</a>`;
	}

	_browserImg(name) {
		// Use data URI <img> to avoid inline SVG <defs> id collisions and paint issues
		const svg = BROWSER_ICONS[name];
		return svgToImgTag(svg, { className: `browser-icon browser-icon-${name}` });
	}

	_buildAriaLabel(title, year, isNewly, impl = {}) {
		const toText = (v) => (v === "available" ? "yes" : v || "unknown");
		const chrome = toText(impl.chrome?.status);
		const edge = toText(impl.edge?.status);
		const firefox = toText(impl.firefox?.status);
		const safari = toText(impl.safari?.status);
		const newly = isNewly ? " (newly available)" : "";
		const y = year ? ` ${year}` : "";
		return `Baseline: ${title}${y}${newly}. Supported in Chrome: ${chrome}. Supported in Edge: ${edge}. Supported in Firefox: ${firefox}. Supported in Safari: ${safari}.`;
	}

	async _fetchAndRender() {
		const featureId = this.featureId;
		if (!featureId) {
			this._render({
				baseline: { status: "no_data" },
				name: "Unknown feature",
			});
			return;
		}

		if (this._ctrl) this._ctrl.abort();
		this._ctrl = new AbortController();
		this._renderLoading();

		try {
			const data = await this._loadData(featureId);
			this._data = data;
			this._render(data);
		} catch (err) {
			if (err?.name === "AbortError") return;
			this._render({ baseline: { status: "no_data" }, name: featureId });
		}
	}

	async _loadData(featureId) {
		const provider = this.provider;
		if (provider === "webstatus") {
			return await this._fetchWebstatus(featureId);
		}
		if (provider === "mdn") {
			return await this._fetchMdnCompat(this.mdnPath || featureId);
		}
		// auto: try webstatus, then mdn
		try {
			const ws = await this._fetchWebstatus(featureId);
			if (ws?.baseline?.status && ws.baseline.status !== "no_data") return ws;
			// if webstatus returns no data, attempt mdn
			const mdn = await this._fetchMdnCompat(this.mdnPath || featureId);
			return mdn || ws;
		} catch {
			// fallback to mdn if webstatus failed
			const mdn = await this._fetchMdnCompat(this.mdnPath || featureId);
			return mdn || { baseline: { status: "no_data" }, name: featureId };
		}
	}

	async _fetchWebstatus(featureId) {
		const resp = await fetch(
			API_ENDPOINT_WEBSTATUS + encodeURIComponent(featureId),
			{ signal: this._ctrl.signal, cache: "force-cache" },
		);
		if (!resp.ok) throw new Error(String(resp.status));
		const json = await resp.json();
		return json;
	}

	// Fetch MDN Browser Compat Data (BCD) and normalize to a shape like webstatus
	async _fetchMdnCompat(pathOrId) {
		// Accept dotted path like "javascript.classes.static_initialization_blocks"
		// or a raw BCD JSON path like "data/javascript/classes.json#static_initialization_blocks"
		try {
			const { filePath, keyPath } = this._resolveMdnPath(pathOrId);
			const url = API_ENDPOINT_MDN_CDN + filePath;
			const resp = await fetch(url, {
				signal: this._ctrl.signal,
				cache: "force-cache",
			});
			if (!resp.ok) throw new Error(String(resp.status));
			const json = await resp.json();
			const entry = this._getByKeyPath(json, keyPath);
			if (!entry || !entry.__compat) {
				return {
					baseline: { status: "no_data" },
					name: keyPath[keyPath.length - 1],
				};
			}
			return this._normalizeFromBCD(entry, keyPath);
		} catch {
			return { baseline: { status: "no_data" }, name: String(pathOrId) };
		}
	}

	_resolveMdnPath(input) {
		// Examples:
		// "javascript.classes.static_initialization_blocks"
		// "data/javascript/classes.json#static_initialization_blocks"
		if (input.includes("#")) {
			const [file, hash] = input.split("#");
			const area = this._areaFromFilePath(file);
			const keyPath = [area, ...hash.split(".")];
			return { filePath: file, keyPath };
		}
		if (input.startsWith("data/")) {
			// no hash provided, build key path from file root only
			const area = this._areaFromFilePath(input);
			return { filePath: input, keyPath: [area] };
		}
		// map dotted domain path to BCD file
		const parts = input.split(".");
		const area = parts.shift();
		const file = `data/${area}/${parts[0]}.json`;
		const keyPath = [area, ...parts];
		return { filePath: file, keyPath };
	}

	_getByKeyPath(obj, pathArr) {
		if (!pathArr || pathArr.length === 0) return obj;
		return pathArr.reduce(
			(acc, k) => (acc && acc[k] != null ? acc[k] : null),
			obj,
		);
	}

	_areaFromFilePath(filePath) {
		// e.g., data/javascript/classes.json -> 'javascript'
		const m = filePath.match(/^data\/(\w+)\//);
		return m ? m[1] : "";
	}

	_normalizeFromBCD(entry, keyPath) {
		const compat = entry.__compat || {};
		const support = compat.support || {};
		const mdnUrl = compat.mdn_url || "";
		const simple = (s) => (Array.isArray(s) ? s[0] : s) || {};

		const impl = {
			chrome: this._implFromBCD(simple(support.chrome)),
			edge: this._implFromBCD(simple(support.edge)),
			firefox: this._implFromBCD(simple(support.firefox)),
			safari: this._implFromBCD(simple(support.safari)),
		};

		// Baseline heuristics from BCD: if all four have version_added and no flags, treat as widely
		const statuses = Object.values(impl).map((v) => v.status);
		let baseline = "no_data";
		if (statuses.every((s) => s === "available")) baseline = "widely";
		else if (statuses.some((s) => s === "available")) baseline = "limited";

		// Latest date is not available in BCD; leave empty
		return {
			feature_id: keyPath[keyPath.length - 1] || "",
			name: keyPath.join("."),
			baseline: { status: baseline },
			browser_implementations: impl,
			learn_more_url: mdnUrl,
		};
	}

	_implFromBCD(s) {
		if (!s) return { status: "unavailable" };
		const added = s.version_added;
		const flags = s.flags || s.partial_implementation;
		const status = added && !flags ? "available" : "unavailable";
		return { status };
	}
}

customElements.define("baseline-status", BaselineStatus);
