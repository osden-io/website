$('.nav').find('a[href="' + location.pathname + '"]').parents('li').addClass('active');

var baseURL = window.location.protocol + "//" + window.location.host + "/";