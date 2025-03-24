let json;
let card;

fetch('../assets/data/data.json')
  .then(response => response.json())
  .then(data => {
    json = data;
    console.log(data); // The JSON content will be logged here
  })
  .catch(error => {
    console.error('Error reading the JSON file:', error);
  });

let images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('click', (e) => {
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            switch (e.target.id){
            case "1":
                window.location.href = "./iluSeydoux/";
                break;
            case "2":
                window.location.href = "./albertoGonzalezMorales";
                break;
            case "3":
                window.location.href = "./leaCelestineBernasconi/";
                break;
            case "4":
                window.location.href = "./mayaBaur/";
                break;
            case "5":
                window.location.href = "./michaelGirod/";
                break;
            case "6":
                window.location.href = "./tamaraMeli/";
                break;
            case "7":
                window.location.href = "./timotheeCrettaz/";
                break;
            case "8":
                window.location.href = "./yatoniRoyCantu/";
                break;
            }
        } else {
        if(card && card.parentElement == document.body) {
            if(e.target.id != card.getAttribute('id')) {
                document.body.removeChild(card)
                create_card(e.target.id)
                } else {
                    document.body.removeChild(card)
                }
        } else {
            create_card(e.target.id)
        }
        if(img.parentElement.classList.contains('focused')) {
            document.querySelectorAll('#main >*:not(.focused)').forEach(e => e.style.filter = "");
            img.parentElement.classList.remove('focused')
        } else {
        document.querySelectorAll('#main >*').forEach(e => {
            e.style.filter = ""
            if(e.classList.contains('focused')) {e.classList.remove('focused')}
        });
        img.parentElement.classList.add('focused')
        document.querySelectorAll('#main >*:not(.focused)').forEach(e => e.style.filter = "blur(2px)");
        }
    } })
});


function create_card(id) {
    let name = json[id].name
    let bio = json[id].bio
    let works = json[id].works
    let links = json[id].links

// Create the main container (div.card)
card = document.createElement('div');
card.setAttribute('id', id)
card.classList.add('card');

// Create the span and set its text
let span = document.createElement('span');
span.textContent = name;

// Create the paragraph (p.info)
let paragraph = document.createElement('p');
paragraph.classList.add('info');
paragraph.textContent = bio

// Create the list with one list item
let ul = document.createElement('ul');
for(let i=0; i<works.length; i++) {
let li = document.createElement('li');
li.textContent = works[i];
ul.appendChild(li);
}
let image_div = document.createElement('div')
image_div.classList.add('image_div')
let img = document.createElement('img')
img.setAttribute('src', '../assets/images/close.png')
img.classList.add('close')
img.addEventListener('click', () => {
    document.body.removeChild(card)
    document.querySelectorAll('#main >*:not(.focused)').forEach(e => e.style.filter = "");
})

// Assemble everything inside the card
card.appendChild(span);
card.appendChild(paragraph);
card.appendChild(ul);


for(let i=0; i<links.length; i++) {
    let p = document.createElement('p');
    p.innerHTML = `<a href="${links[i][1]}">` + links[i][0] +"</a>";
    console.log(p.innerHTML)
    card.appendChild(p);
    }

    image_div.appendChild(img)
    card.appendChild(image_div)

// Finally, append to the document body (or any other container)
document.body.appendChild(card);

}
