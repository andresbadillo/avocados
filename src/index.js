/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = 'https://platzi-avo.vercel.app';

const appNode = document.querySelector('#app');
// Delagacion de eventos
appNode.addEventListener('click', (event) => {
    if (event.target.nodeName === 'H2') {
        window.alert('Hola');
    }
});

// api internationalization
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price);

    return newPrice;
}

// web api fetch
// Conectarnos al servidor
window
    .fetch(`${baseUrl}/api/avo`) 
    // Procesar respuesta y convertirla en JSON
    .then((response) => response.json())
// JSON -> Data -> Renderiar info en el browser
    .then((responseJson) => {
        const allItems = [];
        responseJson.data.forEach(item => {
            
            // Crear la imagen
            const imagen = document.createElement('img');
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
            imagen.src = `${baseUrl}${item.image}`;
            
            // Crear titulo
            const title = document.createElement('h2');
            title.className = "text-lg"
            title.textContent = item.name;
            
            // Crear precio
            const price = document.createElement('div');
            price.className = "text-gray-600"
            price.textContent = formatPrice(item.price);

            // Creamos un contenedor el título y el precio
            const priceAndTitle = document.createElement("div")
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);

            // Metemos todo dentro de una tarjeta contenedora
            const card = document.createElement("div");
            card.className = "sm:items-center cursor-pointer md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.append(imagen, priceAndTitle);
            
            // Metemos todo dentro del contenedor principal
            const contenedor = document.createElement("div");
            contenedor.appendChild(card);

            allItems.push(contenedor);
        });

        appNode.className = 'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
        appNode.append(...allItems);
    })
