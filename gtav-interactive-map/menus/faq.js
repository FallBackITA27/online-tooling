function faqMenu(data) {
    let textDiv = document.createElement("div");
    textDiv.appendChild(document.createElement("h1"));
    textDiv.appendChild(document.createElement("p"));
    contentPart2.appendChild(textDiv);
    contentPart2.appendChild(document.createElement("p"));
    contentPart2.children[0].children[1].classList.add(
        "paragraphText"
    );
    contentPart2.children[1].classList.add("signature");
    for (let nData of data) {
        let element = addToContentPart1List(nData.title);
        element.addEventListener("click", function () {
            contentPart2.children[0].children[0].innerHTML =
                nData.extendedTitle
                    ? nData.extendedTitle
                    : nData.title;
            contentPart2.children[0].children[1].innerHTML =
                nData.innerHTML;
            contentPart2.children[1].innerHTML =
                "Signatures: " + nData.signatures.join(", ");
        });
    }
    contentPart1.children[0].click();
}