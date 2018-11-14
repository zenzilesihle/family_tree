// $("button").click(function(){
//     $.ajax({url: "demo_test.txt", success: function(result){
//             $("#div1").html(result);
//         }});
// });
//
//
// $.ajax({
//     url: 'http://api.joind.in/v2.1/talks/10889',
//     data: {
//         format: 'json'
//     },
//     error: function() {
//         $('#info').html('<p>An error has occurred</p>');
//     },
//     dataType: 'jsonp',
//     success: function(data) {
//         var $title = $('<h1>').text(data.talks[0].talk_title);
//         var $description = $('<p>').text(data.talks[0].talk_description);
//         $('#info')
//             .append($title)
//             .append($description);
//     },
//     type: 'GET'
// });
//
// $.ajax({
//     url: "https://fiddle.jshell.net/favicon.png",
//     beforeSend: function( xhr ) {
//         xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
//     }
// })
//     .done(function( data ) {
//         if ( console && console.log ) {
//             console.log( "Sample of data:", data.slice( 0, 100 ) );
//         }
//     });

// function viewAdmin(id) {
//      var adminId =
//     $.ajax({
//         url: '/users/admin/adminId',
//         dataType: 'json',
//         type: 'GET',
//         success: function(data) {
//             console.log(data[0].first_name)
//         },
//         error: function(err) {
//             console.log(err)
//         }
//     });
// }
