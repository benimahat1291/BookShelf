$(document).ready(function () {

    // SEARCH BAR RESULT //

    $(".searchBtn").on("click", function(e){
        e.preventDefault();
        var query = $("#searchVal").val()
        var searchQuery = {search: query}
        console.log(searchQuery)
        search(searchQuery)   
    })

    function search(searchQuery){
        $.post("/api/search", searchQuery, function(data){
            searchDisplay(searchQuery, data)
        })
    }

    function searchDisplay(searchQuery, data){
        console.log(searchQuery)
        console.log(data[0])
        dataParse = JSON.parse(data[0])
        $.get("/search/", dataParse, function(response){
            window.location.href = "/search/";
        })
    }


    // FEELING LUCKY BUTTON //
    $("#lucky").on("click", function () {
        console.log("hello");
    })




    // SIGN IN //


    //ADD BOOK OWNED ON PROFILE PAGE
    $(".addButton").click(function(){
        $("#modalDisplay").css("display", "block")
        // $(".profileModalFormat").css("height", "500")
    })
        

    // API CALL TO RECIEVE BOOK NAME //
    $("#isbn-submit").on("click", function () {
        var isbnNumber = $("#isbn-val").val().trim()
        var queryURl = "http://openlibrary.org/api/books?bibkeys=ISBN:" + isbnNumber + "&jscmd=details&format=json"
        $.ajax({
            url: queryURl,
            method: "GET"
        }).then((response) => {

            // CONSOLE LOGGING ROUTES TO DATA //

            console.log(response["ISBN:" + isbnNumber].details)
            console.log(response["ISBN:" + isbnNumber].details.title)
            console.log(response["ISBN:" + isbnNumber].details.by_statement)
            console.log(response["ISBN:" + isbnNumber].details.publish_date)

            // LINKING VARIABLES TO AJAX INFO //

            var ajaxTitle = (response["ISBN:" + isbnNumber].details.title);
            var ajaxAuthor = (response["ISBN:" + isbnNumber].details.by_statement)
            var ajaxYear = (response["ISBN:" + isbnNumber].details.publish_date)

            // INPUTTING DATA INTO AJAX OUTPUT AREA //

            $("#ajax-title").text("Title: " + ajaxTitle);
            $("#ajax-author").text("Author: " + ajaxAuthor);
            $("#ajax-year").text("Year: " + ajaxYear);

            // INPUTTING BOOK COVER //

        }).then(() => {

            // DISPLAY THE CONFIRM BOOK BUTTON //

            $("#ajax-img").css("display", "block")
            $("#add-book").css("display", "block")
        })
    })

    // CONFIRM ADD BOOK BUTTON //

    $("#add-book").on("click", function () {
        console.log("hello");
    })

    //PROFILE PAGE

    
})
