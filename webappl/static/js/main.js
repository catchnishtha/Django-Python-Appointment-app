 $(function () {
    /*initialise datepicker plugin*/
    $('#datetimepicker1').datetimepicker();
    /*set the date format accepted by Python DatetimeField*/
    $('#datetimepicker1').data("DateTimePicker").format("YYYY-MM-DD HH:mm");
    /*hide the "Add new" form on page load*/
    $('#NewForm').css("display","none");
    /*when user clicks on "new appointment", show the form*/
    $("#add-new").on("click",function(){
        $('#NewForm').css("display","block");
        $(this).css("display","none")
    });
    /*When user clicks "cancel", hide the "add new" form*/
    $("#add-cancel").on("click",function(e){
        e.preventDefault;
        $('#NewForm').css("display","none");
        $("#add-new").css("display","block");
    });
     /*When the user adds an appointment, give error if the input fields are not empty and do not submit the form*/
    $('#add-app').on("click",function(e){ 
        e.preventDefault();
        var value=$("#datetime_app").val(), error=false;
        /*check that the appointment time is present*/
        if(!value || value==null || value == ""){
            $("span.alert1").text("Please select date and time");
            e.preventDefault;
            error=true;
        } else {
            $("span.alert1").text("");
        }
        var descvalue=$("#descNew").val(); 
        /*check that the appointment description is present*/
        if( !descvalue || descvalue==null || descvalue == ""){
            $("span.alert2").text("Please enter a description");
            error=true;
        }else {
            $("span.alert2").text("");
        }
        /*if either one is not present, do not submit the form and provide relevant errors*/
        if(error){
            e.preventDefault;return false;
        } else{
            $('#NewForm').attr('action', "/appoint").submit();
        }
    });
    /*When the user enters a search text and submits, make an ajax call to "/search/" to render the json in an html file and send it as ajax response */
    $("#searchForm").submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#searchTerm').val();
        getAppointments(searchTerm);
    }); 
    /*Function to fetch the appoinments via an ajax call*/
    function getAppointments(){
         var searchTerm=arguments[0];
        $.ajax({
            url: "/search/",
            type: "POST",
            data: { 'searchTerm' : searchTerm,
                'csrfmiddlewaretoken':$("input[name=csrfmiddlewaretoken]").val()      
            },
            dataType: "html", 
            success: function(response, textStatus, jqXHR) {
            /*JSON parsed in searchresults.html*/
                $("#searchResults").html(response);
            },
            error: function(xhr,errmsg,err) {
                alert("status="+xhr.status+" response="+xhr.responseText+" errmsg="+errmsg+" err="+err);
            }
        })
     }
});