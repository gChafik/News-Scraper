$.getJSON("/articles", function(data){
    console.log(data);
    for (let index = 0; index < data.length; index++) {
        
        // $("#articles").append("<h4 data-id='" + data[index]._id + "'>" + "<a href = " + data[index].link + ">" + 
        // data[index].title + "</a>" + "<button type='button' class='btn btn-info save' id='save'>Save Article</button>" + "</h4>")
        
        $("#articles").append("<div class='col-sm-10' style='margin-bottom:60px;'><div class='card'><div class='card-body'><a class='title-link' href='" + 
        data[index].link +"'target='_blank'><h5>" + data[index].title + "</h5></a><hr><p class='card-text'></p><button data-id='" + 
        data[index]._id + "' class='btn-note btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#myModal' style='margin-right:10px;'>Note</button><button id='btn-save' data-id='" + 
        data[index]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div></div>"
        );
    }
});

// $.getJSON("/", function(data){
//     console.log(data);
//     for (let index = 0; index < data.length; index++) {
//         $("#articles").append("<p data-id = '" + data[index]._id + "'>" + "<a href = " + data[index].link + ">" + data[index].title + "</a></p>")
        
//     }
// });
$(document).on("click", "#btn-save", function(){
    let thisID = $(this).attr("data-id");
    $.ajax({
        method: "PUT",
        url: "/saved/" + thisID,
    }).done(function(data){
        console.log(data);
    });
});

$.getJSON("/saved", function(data){
    console.log(data);
    for (let index = 0; index < data.length; index++) {
        
        // $("#articles").append("<h4 data-id='" + data[index]._id + "'>" + "<a href = " + data[index].link + ">" + 
        // data[index].title + "</a>" + "<button type='button' class='btn btn-info save' id='save'>Save Article</button>" + "</h4>")
        
        $("#articles").append("<div class='col-sm-10' style='margin-bottom:60px;'><div class='card'><div class='card-body'><a class='title-link' href='" + 
        data[index].link +"'target='_blank'><h5>" + data[index].title + "</h5></a><hr><p class='card-text'></p><button data-id='" + 
        data[index]._id + "' class='btn-note btn btn-outline-primary btn-sm' data-toggle='modal' data-target='#myModal' style='margin-right:10px;'>Note</button><button id='btn-save' data-id='" + 
        data[index]._id + "' class='btn btn-outline-primary btn-sm'>Save Article</button></div></div></div>"
        );
    }
});