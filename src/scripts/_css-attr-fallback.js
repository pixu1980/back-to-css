/* JS *NOT NEEDED* for Chrome, only for Safari/Firefox */
/* Uses the enhanced attr()-method in CSS */

function isAdvancedAttrSupported() {
	const T = document.createElement("div");
	document.body.appendChild(T);

	try {
		T.style.setProperty("--t", "attr(data-test type(<number>), 0)");
		T.dataset.test = "123";

		const computedValue = getComputedStyle(T).getPropertyValue("--t").trim();

		return computedValue === "123";
	} catch (e) {
		return false;
	} finally {
		T.remove();
	}
}

if (!isAdvancedAttrSupported()) {
	const fretBoards = document.querySelectorAll("fret-board");
	fretBoards.forEach((fret) => {
		fret.style.setProperty("--_strings", fret.getAttribute("strings"));
		fret.style.setProperty("--_frets", fret.getAttribute("frets"));
		const stringNotes = fret.querySelectorAll("string-note");
		stringNotes.forEach((note) => {
			note.style.setProperty("--string", note.getAttribute("string") || 1);
			note.style.setProperty("--fret", note.getAttribute("fret") || 0);
			note.style.setProperty("--barre", note.getAttribute("barre") || 1);
		});
	});
}
