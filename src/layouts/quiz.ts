/**
 * クイズのセットアップ
 * @param button モード切り替えボタン
 */
export default function setup(button: HTMLElement) {
	// キーワード
	const keywords: NodeListOf<HTMLElement> = document.querySelectorAll(
		"p strong",
	);
	button.innerText = "Q";
	// 隠れたテキストをクリックして剥がす
	keywords.forEach((element) =>
		element.addEventListener("click", () => {
			const style = window.getComputedStyle(element);
			if (style.backgroundColor === style.color) {
				element.style.backgroundColor = "";
			}
		})
	);
	button.addEventListener("click", () => {
		if (button.innerText.includes("Q")) {
			// Enable QuizMode
			button.innerText = "×";
			button.style.backgroundColor = "#7986CB";
			keywords.forEach((element) => {
				const style = window.getComputedStyle(element);
				element.style.backgroundColor = style.color;
			});
			for (const bq of document.getElementsByTagName("blockquote")) {
				bq.style.visibility = "hidden";
			}
		} else {
			// Disable QuizMode
			button.innerText = "Q";
			button.style.backgroundColor = "#3D5AFE";
			keywords.forEach((element) => {
				element.style.backgroundColor = "";
			});
			for (const bq of document.getElementsByTagName("blockquote")) {
				bq.style.visibility = "";
			}
		}
	});
}
