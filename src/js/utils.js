function convertToText (res) {
    if (res.ok) {
      return res.text();
    } else {
      throw new Error('Bad Response');
    }
}


//Get URL Parameter
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export function renderListWithTemplate(template, parent, list, callback) {
    list.forEach(item => {
        const clone = template.content.cloneNode(true);
        const templateWithData = callback(clone, item);
        parent.appendChild(templateWithData);
    })
}

export function renderWithTemplate(template, parent, data, callback) {
    let clone = template.content.cloneNode(true);
    if(callback) {
        clone = callback(clone,data);
    } try {
        parent.appendChild(clone);
    } catch(e) {
      
    }
}

export async function loadTemplate (path) {
    const html = await fetch(path).then(convertToText);
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
}

export async function loadHeaderFooter () {
    const header = await loadTemplate('../partials/header.html');
    const footer = await loadTemplate('../partials/footer.html');
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    renderWithTemplate(header, headerElement);
    // getCartCount(); I get an error with this line
    renderWithTemplate(footer, footerElement);
}