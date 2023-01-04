// import React from 'react';

// function getCookie(name) {
//     var cookieValue = null;
//     // console.log(document.cookie) // there is no cookie here possibly because this is running on local host
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = jQuery.trim(cookies[i]);
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

// var csrftoken = getCookie('csrftoken');
// // console.log(csrftoken) // this is null because there is no cookie in the document as mentioned above

// const CSRFToken = () => {
//     return (
//         <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
//     );
// };
// export default CSRFToken;
