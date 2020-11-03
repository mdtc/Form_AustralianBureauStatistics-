
//Hi, thank you for grading my assigment, I would like clarify some thing that I have done here:

//I have not validated every input, but I have done quite a lot, mainly the ones that required text, I did validate each section except the feedback as the user should not be obligated to answer it. 

//The person section is dynamically added from a <template> tag to the <form> depending on the number of people who spend the night in the house. It works fine, but the only "bug" I couldn't resolve was when the user speaks another language than English and choose his options. The next person gets selected the previously chosen options, then they can change them, but it is still a "bug". This problem is probably caused because I wrote a function to allow users to click multiple options without holding down the CRTL key, and because each "person" section is dynamically added, the function retains the previous "non-English" language selection. I tried different things to solve it but couldn't work it out.

//I tried to write the functions separately to keep clean and easy for debugging but inevitably My function nextButton() got really long and complex, I apologize for that. 




//function for displaying the help section
function helpButton(){

    $('#help').on("click", function(){
        
        if($(".HelpAddress").css("display") == "none"){

        $(".HelpAddress").css("display", "initial")
        
        } else{
          $(".HelpAddress").css("display", "none")
        }
    });

    $('#helpbuttonDwelling').on("click", function(){
        
        if($(".HelpDwelling").css("display") == "none"){

        $(".HelpDwelling").css("display", "initial")
        
        } else{
          $(".HelpDwelling").css("display", "none")
        }
    });

    $('#helpbuttonFeed').on("click", function(){
        
        if($(".HelpFeedback").css("display") == "none"){

        $(".HelpFeedback").css("display", "initial")
        
        } else{
          $(".HelpFeedback").css("display", "none")
        }
    });

    
    
};


//function to highlight in red and go back to withe when focus, wrong inputs
function redInput(parameter){
   
    parameter.css("background-color", "rgba( 190, 5, 5, .5)");
    parameter.focus(function(){
        parameter.css("background-color", "white");
        $("#empty").remove();
    })
};



//This is the master function, It validates how many people are at the dwelling, then displays a quetionnaire per each person declared in the "people spending the night at dwelling" when "next button" is pressed. It also validates patterns for people sections.
function nextButton(){
    var temPeople = $("#people").contents();
    var alert = $("#alerts").contents();
    

   $("#next").on("click", function(){
    var patternWord = /^\s*[a-zA-Z]+\s*\w*/;
    var qty = $('[name = "peopleNight"]');
    var state = $('[name = "state"]');
    var stNumber = $('[name = "streetNumber"]');
    var stName = $('[name = "streetName"]');
    var suburb = $('[name = "suburb"]');
    var code = $('[name = "code"]');

       if( stNumber.val() == 0){
            redInput(stNumber);
            $("#address").append(alert); 
       }else if( stName.val() == 0 || patternWord.test(stName.val()) == false){
            redInput(stName);
            $("#address").append(alert);
        }else if( suburb.val() == 0 || patternWord.test(suburb.val()) == false){
            redInput(suburb);
            $("#address").append(alert);
        }else if( state.val() == 0 || patternWord.test(state.val()) == false){
            redInput(state);
            $("#address").append(alert);
        }else if( code.val() == 0){
            redInput(code);
            $("#address").append(alert);
        }else if( qty.val() == 0){
            redInput(qty);
            $("#address").append(alert);
        }else{
            $("#address").css("display", "none");
              
            //I used this For loop to get the number of people and display the sections with the number of person that is doing the questionnaire.

           for(var i = 1; i <= qty.val(); i ++){
               var newPerson = temPeople.clone().attr("id" , "people " + i);
               newPerson.insertBefore("#dwelling");
               $(newPerson).find("#legend").html('Person ' + i );
               var btnNew = $(newPerson).find("#nextPerson").attr("id", "nextPerson " + i);
               var btnInfo =  $(newPerson).find("#helpPersonBtn").attr("id", "helpPersonBtn " + i);
               var isCitizen = $(newPerson).find('[name = "citizen"]');
               //var yearArrive = $(newPerson).children("#yearArrive");
               var newLang = $("#tempLang").contents();
               var langCont = $(newPerson).find("#languageContainer");
               var language = $(newPerson).find('[name = "lang"]');

             

               if( i != 1){
                $(newPerson).css("display", "none");
                }   

                $(btnNew).on("click", function(){
                    var box = $(this).parent().parent();
                    var nextBox = $(this).parent().parent().next();

                    var patternW = /^\s*[a-zA-Z]+\s*\w*/;
                    var GivName = $(box).find('[name = "GivenName"]');
                    var FamName = $(box).find('[name = "FamilyName"]');
                    var gender = $(box).find('[name = "gender"]');
                    var dob = $(box).find('[name = "dob"]');
                    var lang = $(box).find('[name = "lang"]');
                    var field = $(box).find('[name = "studyField"]');
                    

                    if( GivName.val() == 0 || patternW.test(GivName.val()) == false ){
                        redInput(GivName);
                        $(box).append(alert); 
                   }else if( FamName.val() == 0 || patternW.test(FamName.val()) == false){
                        redInput(FamName);
                        $(box).append(alert);
                    }else if( gender.val() == 0 || patternW.test(gender.val()) == false){
                        redInput(gender);
                        $(box).append(alert);
                    }else if( dob.val() == 0){
                        redInput(dob);
                        $(box).append(alert);
                    }else if( lang.val() == 0){
                        redInput(lang);
                        $(box).append(alert);
                    }else if( field.val() == 0 || patternW.test(gender.val()) == false){
                        redInput(field);
                        $(box).append(alert);
                    }else{
                        
                        box.css("display", "none");   
                        nextBox.css("display", "inline-block");
                    }

                
                  });

                $(isCitizen).on("click", function(e){
                    var up = $(this).parent().parent();
                    var yearArrive = $(up).find("#yearArrive")

                    console.log("CLICK");
                    console.log(yearArrive);

                    var citizenVal = $(this).val();
            
                    if( citizenVal != "yes"){
                        console.log(citizenVal)
                        $(yearArrive).css("display", "initial");
                    }else{
                        console.log(citizenVal)
                        $(yearArrive).css("display", "none");
                    }
            
                });

                newHTML(newLang, language, langCont)
                
                $(btnInfo).on("click", function(){
                    var info = $(this).parent().parent().find("#helpBox");

                    if($(info).css("display") == "none"){
    
                        $(info).css("display", "initial")
                        
                        } else{
                          $(info).css("display", "none")
                        }
                });
                          
              }
                        

        }


   });

};




//Function to validate the dwelling section, this section just validates two inputs.
function dwellingBtn(){
    $("#nextDwelling").on("click", function(){

        var Gb = $('[name = "GBs"]');
        var beds = $('[name = "beds"]');
        var alertEmpty = $("#alerts").contents();

        console.log(alertEmpty)

        if(Gb.val() == 0){
            redInput(Gb);
            $(alertEmpty).appendTo("#dwelling");
        }else if(beds.val() == 0){
            redInput(beds); 
            $(alertEmpty).appendTo("#dwelling");
        }else{
            $("#dwelling").css("display", "none")
            $("#dwelling").next().css("display", "inline-block")
        }

    });

    helpButton();
}

// This function reload the website when the "reset" button is pressed 
function FeedbackSubmit(){
    $(".reset").on("click", function(){
        location.reload();
    });

    helpButton();
}




// This function toggles visibility from elements already created in the hmtl form structure. It also validates the radio inputs and displays more options depending of some answers but I had to remove and place it inside the function that creates person's section because was giving me issues when submit. 


// function ToggleVisibility(){

//     $('[name = "citizen"]').on("click", function(e){
//         var citizen = $(this).val();

//         if( citizen != "yes"){
//             $("#yearArrive").css("display", "initial");
//         }else{
//             $("#yearArrive").css("display", "none");
//         }


//     });

// };


//function to prevent the default settings for multiple choices to avoid using the CTRL key when selecting various options
function multipleOptions(){
    var langOptions = $("#lang > option");
    // var carOptions = $("#Car > option");

    $(langOptions).mousedown(function(eve){
        eve.preventDefault();
        console.log("multiple working")
        $(this).prop("selected", !$(this).prop("selected"))
    });

};


//This function appends some contents such as datalists to the HTML form, either from the <template> or as new elements.
function newHTML(p1, p2, p3){

    var tempCar = $("#tempCar").contents();

        $(p2).on("click", function(e){

        var langRadioValue = $(this).val();
        

        if( langRadioValue == "yes" ){

            $(p3).append(p1);
            multipleOptions();
        }else{
            $("#lang").remove();
        };

    });

    $('[name = "Car"]').on("click", function(e){

        var langCarValue = $(this).val();
        

        if( langCarValue == "yes" ){

            $("#carContainer").append(tempCar);
            multipleOptions();
        }else{
            $("#Car").remove();
        }
    });   

};


// function to prevent the Default behaviour of submit the form when "Enter key" is accidentally pressed 

function enterKey(){
    $(window).keydown(function (e) {
        if(e.keyCode == 13){
            e.preventDefault();
            return false;
        }        
    });
}





//initialise function; contains all functions in separate pieces of code for a better debbuging when necessary
function initialise() {

    helpButton();
    nextButton();
    newHTML();
    enterKey();
    dwellingBtn();
    FeedbackSubmit();

};