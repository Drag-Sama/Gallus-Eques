/////////////////// AFFICHAGE PRODUITS BOUTIQUE /////////////////

//Liste des produits et de leur prix selon le modèle suivant : 
//[Nom de l'image associé, prix avant promotion, prix actuel] (si le prix avant promotion est 0 ,il n'y a pas de promotion)
var list_items = [['sword1', 24.99, 12.99],['sword2',199.99, 99.99],['sword3',0,0],['sword4',0,199.99],
['sword5',0,0],['sword6',20,19],['sword7',0,0],['sword8',0,0],['armor2',4990.98,999.99],['armor1',0,0],['armor3',0,0],['armor4',0,0],['armor5',0,0],
 ['shield1',0,0],['shield2',0,0],['shield3',79,90],['shield4',20,2]];




if (document.body.id != 'Accueil'){
    function displayproducts(){
        let product_line = document.getElementsByClassName("product_line")[0];
        let products = document.getElementsByClassName("produits")[0];
        let i = 0
        let j = 0
        for (const item of list_items) {
            if (i == 4) { // Pour ne pas dépasser 4 items par ligne
                j += 1;
                p = document.createElement("div");
                p.classList.add("product_line");
                products.appendChild(p);
                product_line = document.getElementsByClassName("product_line")[j];
                i = 0;
            }
            let img1 = document.createElement('img');
            img1.src = './Image/products/' + item[0] + '.png';
            img1.classList.add("BoutiqueImage");
            let div1 = document.createElement('div');
            div1.classList.add("produit");
            let div_img = document.createElement('div');
            div_img.classList.add("BoutiqueBoxImage");
            product_line.appendChild(div1);
            div1.appendChild(div_img);
            div_img.appendChild(img1);
            div2 = document.createElement('div');
            div2.classList.add("box_price");
            div1.appendChild(div2);   
            para = document.createElement('p');
            if (! item[1] == 0) {
                para.classList.add("reduc");
                para.innerText = item[1];
            }
            div2.appendChild(para);
            para = document.createElement('p');
            para.classList.add("price");
            para.innerText = item[2];
            div2.appendChild(para);
            i += 1;
        }
    }

    function FindImgCateg(image_src){ // trouver la catégorie de l'image (sword, armor, shield, etc) à l'aide de sa source en str
        img_name = image_src.substring(image_src.lastIndexOf('/') + 1); // = 'categ1.png'
        img_name = img_name.split('.')[0]; // = 'categ1'
        img_name = img_name.split(img_name[img_name.length - 1])[0] // = 'categ'
        return img_name
    }

    function hideproducts(filters) {
        if (filters.length !== 0) {
            for (const produit of document.getElementsByClassName("produit")) {
                if (!(filters.includes(FindImgCateg(produit.querySelector('img').src.toString())))) {
                    produit.style.display = 'none';
                }
                else {
                    produit.style.display = 'flex';
                }
            }
        }
        else {
            for (const produit of document.getElementsByClassName("produit")) {
                produit.style.display = 'flex';
                }
        }
    }
    displayproducts();

    var filters = [];

    hideproducts(filters);
}
/////////////////// LE CAROUSEL /////////////////////

if (document.body.id == 'Accueil') {
    var carousel = document.querySelector('.carousel');
    var produits = document.querySelector('.produit');
    var produitPromo = [];
    function displayproductsprom() { //affiche les produits en promotions pour le carousel de l'Accueil
        for (const item of list_items) {
            if (item[1] != 0) {
            produitPromo.push(item);
            }
        }
        updatePromo();

        
    }
    var itemPromo = [];
    var p = 0;
    function resetPromo(){
        console.log(itemPromo);
        for(const produit of document.getElementsByClassName("produit")){
            produit.style.display = "none";
        }
        document.getElementById("next").remove();
        

    }

    function updatePromo(){
        for (let i= 0+p; i< p+4;i++){
            
            z = i%produitPromo.length;

            let img1 = document.createElement('img');
            itemPromo.push(img1);

            img1.src = './Image/products/' + produitPromo[z][0] + '.png';
            img1.classList.add("BoutiqueImage");
            let div1 = document.createElement('div');

            itemPromo.push(div1);
            div1.classList.add("produit");

            let div_img = document.createElement('div');
            itemPromo.push(div_img);
            div_img.classList.add("BoutiqueBoxImage");
            carousel.appendChild(div1);
            div1.appendChild(div_img);
            div_img.appendChild(img1);

            div2 = document.createElement('div');
            itemPromo.push(div2);
            div2.classList.add("box_price");
            div1.appendChild(div2);   

            para = document.createElement('p');
            itemPromo.push(para);
            para.classList.add("reduc");
            para.innerText = produitPromo[z][1];
            div2.appendChild(para);
            para = document.createElement('p');
            para.classList.add("price");
            para.innerText = produitPromo[z][2];
            div2.appendChild(para);
        }
        
        button_next = document.createElement('button');
        button_next.classList.add('button_carousel');
        button_next.id = 'next';
        button_next.innerText = '>'
        carousel.appendChild(button_next);
        button_next.addEventListener("click",(event) => {
            console.log(p);
            
            p+= 1;
            if(p == produitPromo.length){
                p = 0;
            }
            resetPromo();
            updatePromo();
            
            
        });
    }


    

    function prev () {
            
            p-= 1;
            if(p < 0){
                p = produitPromo.length-1 ;
                console.log(p);
            }
            resetPromo();
            updatePromo();
            
    }

    
    displayproductsprom();
}




///////////////// LES BOUTONS /////////////////////////////

var boutons = document.querySelectorAll(".filtre")
boutons.forEach(function(bouton) {
    bouton.addEventListener("click", function() {
        if (bouton.classList.contains("filtre_clicked")) {
            bouton.classList.remove("filtre_clicked")
            index = filters.indexOf(bouton.id)
            filters.splice(index, 1)
            hideproducts(filters)
        }
        else {
            bouton.classList.add("filtre_clicked")
            filters.push(bouton.id)
            hideproducts(filters)
        }
    })
})

