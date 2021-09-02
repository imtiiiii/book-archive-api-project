
const bookContainer = document.getElementById("book-found"); // the main parent where the div(containing information about a book) will be appended
//Hiding the div -> where we will show total search items we found
document.getElementById('items-found').style.display = "none";
const clearData = () => {
    document.getElementById("book-search").value = '';
    bookContainer.textContent = "";
};

const itemsFound = (itemsTotal) => {
    //getting the div where we will show the count of total numbers found after search
    let number = document.getElementById('items-found');
    //its display is hidden by default
    //when user search for something we enable it
    number.style.display = 'block';
    number.innerHTML = `
    <h1 class="text-center">We found ${itemsTotal} item(s) . <h1>
    `;
};


//this function is load the data from api according to the search input value
const loadData = () => {
    //clearing total found number after search
    let number = document.getElementById('items-found');
    number.textContent = "";
    number.style.display = "none";
    // storing the value of search value 
    const bookName = document.getElementById("book-search").value;
    //if the user does not give any value we will send this code
    if (bookName === "") {
        console.log("BOOK NAME :", bookName);
        console.log("Give proper name");
        clearData();
        return;
    }

    //clearing the search input field
    clearData();

    //dyapic api link from where the search result will be shown
    const url = `HTTPS://openlibrary.org/search.json?q=${bookName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showData(data);
        });

};
const showData = data => {
    //console.log(data.numFound);
    //storing total search result found
    const totalSearchResult = data.numFound;
    //console.log(typeof totalSearchResult);
    if (totalSearchResult == 0) {
        console.log("nothing found");
        itemsFound(totalSearchResult);
        clearData();
        return;
    }
    itemsFound(totalSearchResult);
    //console.log(data.docs[0].author_name[0]);

    // const temp = data.imtiaz;
    // if (temp === undefined) console.log("yeeee");
    let i = 0;

    data.docs.forEach(element => {

        const div = document.createElement('div');
        let imageId = element.cover_i;
        let imgSrc = '';
        //console.log(imageId);
        if (imageId === undefined) {
            imgSrc = 'img/default-book.png';
        }
        else {
            imgSrc = ` HTTPS://covers.openlibrary.org/b/id/${imageId}-M.jpg`
        }
        let nameOfBook = element.title;
        if (nameOfBook === undefined) {
            nameOfBook = "Unknown";
        }
        let authorName = element.author_name;
        if (authorName === undefined || authorName === '0') authorName = "Unknown";
        else {
            authorName = element.author_name[0];
        }
        let firstPublisher = element.publisher;
        if (firstPublisher === undefined || firstPublisher === '0') firstPublisher = "Unknown";
        else {
            firstPublisher = element.publisher[0];
        }
        let publishYear = element.first_publish_year;
        if (publishYear === undefined || publishYear === '0') publishYear = "Unknown";

        console.log("i= ", i, "name: ", nameOfBook, "author name: ", authorName);
        i++;


        div.classList.add("rounded-3");
        div.classList.add("bg-white");
        div.classList.add("shadow-lg");
        div.classList.add("ms-5");
        div.classList.add("my-5");
        div.classList.add("ps-5");
        div.classList.add("py-5");


        div.innerHTML = `
        <div class="w-100  mx-auto " style="height:25vh;">
            <img class="img-fluid " src="${imgSrc}" style="width:250px; height:250px" alt="book image not found">
        </div>
        <div class=" mt-3">
            <h1 class="">Book Name: ${nameOfBook}</h1>
            <h2 class="">Author Name: ${authorName}</h2>
            <h3 class="fw-bold ">Publisher: ${firstPublisher}</h3>
            <h4 class="fw-bold ">First publish year: ${publishYear}</h4>
        </div>
        `;
        bookContainer.append(div);


    });

};