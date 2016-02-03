$(document).ready(function(){
    
    var contactForm = $("#contact-form");
    
    contactForm.on('submit', function(e){
        e.preventDefault();
        var btn = $('#send-email'); 
        btn.prop('disabled', true);
    
        var modalDisplay = $('#modal-display');
        modalDisplay.modal({
            backdrop: 'static',
            keyboard: false
        });
        
        var modalCloseBtn = modalDisplay.find('#close-modal');
        modalCloseBtn.hide();

        var modalMsg = modalDisplay.find('#message');
        modalMsg.empty().html('Submitting... <i class="fa fa-spinner fa-pulse"></i>');
        
        $.post(baseURL + "contact/submit", contactForm.serialize(),
        	function(data){
                if(data.message == "success") {
		            modalMsg.empty().html("Thank you. You're submission has been received.");
		        } else {
                    modalMsg.empty().html("There has been an error. Please contact us by phone.");
                }

                $("#name").val('');
                $("#email").val('');
                $("#phone").val('');
                $("#text").val('');
                $("#newsletter").prop('checked', true);

                btn.prop('disabled', false);
                modalCloseBtn.show();
		});
    });
});