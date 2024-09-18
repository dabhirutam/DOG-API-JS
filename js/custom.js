let dogList = document.getElementById('dogList');
let showIMG = document.getElementById('showIMG');

fetch('https://dog.ceo/api/breeds/list/all').then(res => res.json()).then((rec) => {

    for (let breed in rec.message) {
        let subBreeds = '';

        if (rec.message[breed].length > 1) {
            subBreeds = `<ol class="text-center p-2 list-unstyled fs-6 text-white ">`;
            rec.message[breed].forEach(subB => {
                subBreeds += `<li class="bg-danger p-1 mb-2 border-3 border-bottom rounded-3">${subB}</li>`;
            });
            subBreeds += `</ol>`;
        }

        dogList.innerHTML += `<li style="background-color: #AB00FF;" onclick="return breedIMG('${breed}')" class="breed mb-2 rounded-3 py-1 border-3 border-bottom ${breed == 'akita' ? 'active' : ''}" ><span>${breed}</span> ${subBreeds}</li>`;
    }

}).catch(() => console.log("ERROR>"));

const breedIMG = (breed) => {
    let breeds = dogList.getElementsByClassName("breed");

    for (let i = 0; i < breeds.length; i++) {
        breeds[i].addEventListener("click", function () {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }

    showIMG.innerHTML = '';
    fetch(`https://dog.ceo/api/breed/${breed}/images`).then(res => res.json()).then((rec) => {

        rec.message.forEach(img => {
            showIMG.innerHTML += `<div class="col-4"><img src="${img}" class="object-fit-cover rounded-5" style="height: 300px;width: 100%;border: 5px solid #00ffd5b6;"></div>`;
        });

    }).catch(() => console.log("ERROR>"));

};
breedIMG("akita");