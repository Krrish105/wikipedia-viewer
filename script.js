let rows = [];
$('#search').on('change', () => {
    $(".row").remove();
    let val = $('#search').val();
    let api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    let cb = '&callback=JSON_CALLBACK';
    let pageUrl = 'https://en.wikipedia.org/?curid=';
    
    $.ajax({
        url: api + val + cb,
        dataType: "jsonp",
        success: function(data) {
            let results = data.query.pages;
            for (const key in results) {
                if (Object.hasOwnProperty.call(results, key)) {
                    const element = results[key].title;
                    let row = `<div class="row">
                                    <a href = "${pageUrl + results[key].pageid}" target ="_blank" >${results[key].title}</a>
                                    <p>${results[key].extract}</p>
                                </div>`
                    $('main').append(row);
                }
            }
        }
    })
    $('#search').val("");
})