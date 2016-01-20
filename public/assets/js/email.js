$(document).ready(function(){

    var name, email, phone, text, join;

    $("#send-email").click(function(){

        var btn = $(this); 
        btn.prop('disabled', true);
        $('#modal-display').modal({
                                    backdrop: 'static',
                                    keyboard: false
                                  });
        $("#modal-display #close-modal").hide();
        $("#modal-display #message").empty().html('Submitting... <i class="fa fa-spinner fa-pulse"></i>');
        name=$("#name").val();
        email=$("#email").val();
        phone=$("#phone").val();
        text=$("#text").val();
        join=$("#newsletter").is(':checked');

        
        $.post(baseURL + "contact/submit", { 
                                                name: name, 
                                                email: email, 
                                                phone: phone, 
                                                text: text, 
                                                join: join 
                                            },
        	function(data){
		        if(data=="sent") {
		            $("#modal-display #message").empty().html("Thank you. Youre submission has been received.");
		        } else {
                    $("#modal-display #message").empty().html("There has been an error. Please contact us by phone.");
                }

                $("#name").val('');
                $("#email").val('');
                $("#phone").val('');
                $("#text").val('');
                $("#newsletter").prop('checked', false);

                btn.prop('disabled', false);
                $("#modal-display #close-modal").show();
			});
    });
});