// $("#scrape").on("click", function(){
//     event.preventDefault()
//     $.getJSON("/scrape", function(data){

//         data.forEach((article) => {
//             $header = $('<h2 class="header">').text(article.header)
//             $summary = $('<p class="summary">').text(article.summary)
//             $('<div class="article">').append("")
//         }) 
//         console.log(data)
//     })
// })

$(".save").on("click", function(){

    var article = {}
    var id = $(this).attr("id")

    article.header = $("h2."+id).text()
    article.summary = $("p."+id).text()
    article.link = $("a."+id).attr("href")
    console.log(article)
    $.ajax({
        method: "POST",
        url: "/articles",
        data: article
      })
})

$(".delete").on("click", function(){
    var articleID = $(this).attr("id")
    event.preventDefault()
    $.ajax({
        method: "DELETE",
        url: "/articles/" + articleID,
      })

      location.reload()
    
})