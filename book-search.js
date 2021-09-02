
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
    <h1 class="text-center">We found ${itemsTotal} item(s) . </h1>
    `;
};


//this function is load the data from api according to the search input value
const loadData = () => {
    //toggle display

    //clearing total found number after search
    let number = document.getElementById('items-found');
    number.textContent = "";
    number.style.display = "none";
    // clearing done
    // storing the input of search value 
    const bookName = document.getElementById("book-search").value;
    //if the user does not give any value we will send this code
    if (bookName === "") {

        alert("Give proper name");
        clearData();
        return;
    }
    toggleDisplay('display-search', 'none');
    toggleDisplay('spinner', 'block');
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
    //storing total search(count) result found
    const totalSearchResult = data.numFound;
    if (totalSearchResult == 0) {
        itemsFound(totalSearchResult);
        clearData();
        toggleDisplay('display-search', 'block');
        toggleDisplay('spinner', 'none');
        return;
    }
    //if the code comes here that means api found some matching result with search input
    itemsFound(totalSearchResult);
    data.docs.forEach(element => {
        //here (down) we are storing all the book details we need to show after the item is matched with user's search input value
        //book image,book name,author name,publisher name,first publish year ->>(stored details)
        let imageId = element.cover_i;
        let imgSrc = '';
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
        //storing complete (up), if we don't any data we will show 'unknown' to the user
        //created a div(down) , in this div we will show a single book details
        //it will create same number of divs as the array[data.docs]length
        const div = document.createElement('div');
        //added some class(down) to that div
        div.classList.add("rounded-3");
        div.classList.add("bg-white");
        div.classList.add("shadow-lg");

        // showing all the information (down) using innerHTM\L
        div.innerHTML = `
        <div class="w-100   mx-auto " ">
            <img class="img-fluid py-3 ps-3 " src="${imgSrc}" style="width:250px; height:250px" alt="book image not found">
        </div>
        <div class=" py-3 ps-3">
            <h3 class="">Book Name: ${nameOfBook}</h1>
            <h3 class="">Author Name: ${authorName}</h2>
            <h5 class="fw-bold ">Publisher: ${firstPublisher}</h3>
            <h5 class="fw-bold ">First publish year: ${publishYear}</h4>
        </div>
        `;
        //APPENDING SINGLE BOOK DETAIL DIV  TO THE PARENT DIV
        bookContainer.append(div);
        toggleDisplay('display-search', 'block');
        toggleDisplay('spinner', 'none');


    });

};

const toggleDisplay = (id, value) => {
    console.log("i'm called");
    document.getElementById(id).style.display = value;
};