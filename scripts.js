$( document ).ready(function() {
  /**
   * retrieve informations of the api
   */
  function getInfo() {
    $("#loader").show();
    const url = "https://smileschool-api.hbtn.info/quotes"
    $.get({
      url: url,
      success: function(data){
        for (let i = 0; i < data.length; i++) {
          displayCarousel(i, data[i].pic_url, data[i].text, data[i].name, data[i].title);
        }
      },
      error: function() {
        alert("Error");
      },
      complete: function() {
        $("#loader").hide();
      }
    })
  }

  /**
   * create Carousel item and append to DOM
   * @index position in the request
   * @imge 
   * @text 
   * @name 
   * @title job
   */
  function displayCarousel(index, imge, text, name, title) {
    const divItem = $("<div>").attr({class: `carousel-item ${index === 0 ? "active" : ""}`});
    $("#content-quotes").append(divItem);
    const divinner = $("<div>").addClass("d-flex flex-column flex-sm-row align-items-center justify-content-sm-center");
    $(divItem).append(divinner);
    const image = $("<img>").addClass("rounded-circle").attr({src: imge,
                                                              alt: "photo"});
    $(image).css({"width": "160px",
                  "height": "160px"});
    $(divinner).append(image);
    const divPara = $("<div>").addClass("content text-white p-5 mr-5");
    $(divinner).append(divPara);
    const pCitation = $("<p>").addClass("citation pb-3 text-wrap").text(text);
    $(divPara).append(pCitation);
    const pName = $("<p>").addClass("name-author p-0 m-0").text(name).css({"font-weight": "bold"});
    $(divPara).append(pName);
    const pWork = $("<p>").addClass("work font-weight-light").text(title).css({"font-style": "italic"});
    $(divPara).append(pWork);
  }
  getInfo();
});
