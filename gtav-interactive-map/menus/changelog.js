function changelogMenu(data) {
    let textDiv = document.createElement("div");
    let header = document.createElement("header");
    header.appendChild(document.createElement("h1"));
    header.appendChild(document.createElement("h2"));
    textDiv.appendChild(header);
    textDiv.appendChild(document.createElement("p"));
    contentPart2.appendChild(textDiv);
    contentPart2.appendChild(document.createElement("p"));
    contentPart2.children[0].children[1].classList.add("paragraphText");
    contentPart2.children[1].classList.add("signature");
    for (let nData of data) {
        let element = addToContentPart1List(nData.title);
        element.classList.add("versionText");
        element.addEventListener("click", function () {
            contentPart2.children[0].children[0].children[0].innerHTML =
                "Version " + nData.title;
            contentPart2.children[0].children[0].children[1].innerHTML =
                new Date(nData.timestamp).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            contentPart2.children[0].children[1].innerHTML = nData.innerHTML;
            contentPart2.children[1].innerHTML =
                "Signatures: " + nData.signatures.join(", ");
        });
    }
    contentPart1.children[0].click();
}
