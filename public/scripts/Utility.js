export function appendDataToTableRow(tr, data, ...args) {
    let td = document.createElement("td")
    td.innerHTML = data

    args.forEach(x => {
        if (x != "") {
            td.classList.add(x)
        }
    })

    tr.appendChild(td)
}