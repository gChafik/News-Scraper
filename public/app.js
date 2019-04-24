$.getJSON("/articles", function(data){
    console.log(data);
    for (let index = 0; index < data.length; index++) {
        
        $("#articles").append("<h4 data-id='" + data[index]._id + "'>" + "<a href = " + data[index].link + ">" + 
        data[index].title + "</a>" + "<button type='button' class='btn btn-info save' id='save'>Save Article</button>" + "</h4>")
        //$("#articles").append("<p data-id='" + data[index]._id + "'>" + data[index].title + "<br />" + data[index].link + "</p>");
    }
});

// $.getJSON("/", function(data){
//     console.log(data);
//     for (let index = 0; index < data.length; index++) {
//         $("#articles").append("<p data-id = '" + data[index]._id + "'>" + "<a href = " + data[index].link + ">" + data[index].title + "</a></p>")
        
//     }
// });
$(".save").on("click", function(){
    let thisID = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/saved/" + thisID,
    }).done(function(data){
        console.log(data);
    });
});
