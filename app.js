// todo build custom stylesheets in case bootstrap is not being used

class AlertJS {
    dialog;
    title = "Alerta";
    body = "Esto es una alerta";
    footer = "Ok";
    kind;
    #headerEl;
    #bodyEl;
    #footerEl;
    constructor(kind = "primary", title = "Alerta", body = "Esto es una alerta", footer = "Ok") {
        this.title = title;
        this.body = body;
        this.footer = footer;
        this.kind = kind;
        this.dialog = this.#buildDialog();
        this.#customizeDialog(true);
        if (!document) throw "Looks like we are not inside a browser context";
        const documentBody = document.querySelector("body");
        if (!documentBody) throw "Looks like we don't have a body in the HTML";
        documentBody.appendChild(this.dialog);
        this.dialog.showModal();
    }
    /**
     * 
     * @returns {HTMLDialogElement}
     */
    #buildDialog() {
        const dialog = document.createElement("DIALOG");
        dialog.appendChild(this.#buildDialogHeader());
        dialog.appendChild(document.createElement("HR"));
        dialog.appendChild(this.#buildDialogBody());
        dialog.appendChild(document.createElement("HR"));
        dialog.appendChild(this.#buildDialogFooter());
        return dialog;
    }
    #buildDialogHeader() {
        const header = document.createElement("DIV");
        header.textContent = this.title;
        this.#headerEl = header;
        return header;
    }
    #buildDialogBody() {
        const body = document.createElement("DIV");
        body.textContent = this.body;
        this.#bodyEl = body;
        return body;
    }
    #buildDialogFooter() {
        const footer = document.createElement("DIV");
        footer.textContent = this.footer;
        footer.addEventListener("click", () => this.dialog.close());
        this.#footerEl = footer;
        return footer;
    }
    /**
     * 
     * @param {boolean} bootstrap If you are using bootstrap, you can set this to true to make use of bootstrap's style 
     */
    #customizeDialog(bootstrap) {
        switch(this.kind.toLowerCase()) {
            case 'primary':
                bootstrap ? this.dialog.classList.add("bg-primary", "text-light", "rounded", "border", "border-dark") : false;
                bootstrap ? this.#footerEl.classList.add("btn", "btn-light") : false;
                break;
            case 'dark':
                bootstrap ? this.dialog.classList.add("bg-dark", "text-light", "rounded", "border", "border-dark") : false;
                bootstrap ? this.#footerEl.classList.add("btn", "btn-info") : false;
                break;
            case "default":
                return;
        }
    }
}