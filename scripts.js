$( document ).ready(function() {
  /**
   * retrieve informations of the api
   */
  function getInfo() {
    
    
    const urlLatest = "https://smileschool-api.hbtn.info/latest-videos";
    
    
    $.get({
      url: urlLatest,
      success: function(data) {
        $("#loader3").show();
        for (let i = 0; i < data.length; i++) {
          displayLatestvideos(i, data[i].title, data[i]["sub-title"], data[i].thumb_url, data[i].author,
                                data[i].author_pic_url, data[i].star, data[i].duration);
        }
      },
      error: function() {
        alert("Error");
      },
      complete: function() {
        $("#loader3").hide();
      }
    });

  }

  /**
   * create Carousel item and append to DOM
   * @index position in the request
   * @imge 
   * @text 
   * @name 
   * @title job
   */
  function displayQuotes() {
    $.get({
      url: "https://smileschool-api.hbtn.info/quotes",
      success: function(data){
        $("#loader").show();
        for (let i = 0; i < data.length; i++) {
          const divItem = $("<div>").attr({class: `carousel-item ${i === 0 ? "active" : ""}`});
          $("#content-quotes").append(divItem);
          const divinner = $("<div>").addClass("d-flex flex-column flex-sm-row align-items-center justify-content-sm-center");
          $(divItem).append(divinner);
          const image = $("<img>").addClass("rounded-circle").attr({src: data[i].pic_url,
                                                                    alt: "photo"});
          $(image).css({"width": "160px",
                        "height": "160px"});
          $(divinner).append(image);
          const divPara = $("<div>").addClass("content text-white p-5 mr-5");
          $(divinner).append(divPara);
          const pCitation = $("<p>").addClass("citation pb-3 text-wrap").text(data[i].text);
          $(divPara).append(pCitation);
          const pName = $("<p>").addClass("name-author p-0 m-0").text(data[i].name).css({"font-weight": "bold"});
          $(divPara).append(pName);
          const pWork = $("<p>").addClass("work font-weight-light").text(data[i].title).css({"font-style": "italic"});
          $(divPara).append(pWork);
        }
      },
      error: function() {
        alert("Error");
      },
      complete: function() {
        $("#loader").hide();
      }
    });
    
  }

  /**
   * create carousel popular video
   */
  function displayPopularvideos (){
    $.get({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      success: function(data) {
        $("#loader2").show();
        for (let i = 0; i < data.length; i++) {
          createCard(i, "#carousel-video .carousel-inner", data[i].thumb_url, data[i].title, data[i]["sub-title"], data[i].author,
                                data[i].author_pic_url, data[i].star, data[i].duration);
        }
        while ($("#carousel-video .carousel-item").length < 5) {
          $.each(data, function(index, value) {
            createCard(index, "#carousel-video .carousel-inner", value.thumb_url, value.title, value["sub-title"], value.author,
            value.author_pic_url, value.star, value.duration);
          });
      }

      },
      error: function() {
        alert("Error");
      },
      complete: function() {
        $("#loader2").hide();
      }
    });
  }

  function createCard (position, selector, thumb_url, title, sub_title, author, author_pic_url, star, duration) {
    const divItem = $("<div>").attr({class: `carousel-item ${position === 0 ? "active" : ""} col-12 col-sm-6 col-md-4 col-lg-3 ml-0`});
    $(selector).append(divItem);
    const divCard = $('<div>').attr({class: "card border-0 p-2", width: "15rem"});
    $(divItem).append(divCard);
    const imgThumbnail = $('<img>').attr({class: "card-img-top",
                                          alt: "diagonal smile",
                                          src: thumb_url});
    $(divCard).append(imgThumbnail);
    const divPlay = $("<div>").addClass("card-img-overlay justify-content-center");
    const imgPlay = $("<img>").attr({src: "/images/play.png", width: "50rem"});
    $(divPlay).append(imgPlay);
    $(divCard).append(divPlay);
    const cardBody = $("<div>").addClass("card-body");
    const h5 = $("<h5>").addClass("card-title font-weight-bold").text(title);
    const para = $("<p>").addClass("card-text font-weight-light").text(sub_title);
    const divcomment = $("<div>").addClass("comments d-inline-flex");
    const imgComment = $("<img>").attr({src: author_pic_url,
                                        class: "rounded-circle mr-2",
                                        alt: "photo author",
                                        width: "20px",
                                        height: "20px"});
    const paraComment = $("<p>").addClass("name ml-2 mb-0").text(author);
    $(divcomment).append(imgComment, paraComment);
    const divStars = $("<div>").addClass("stars d-inline-flex");
    const groupStar = $("<div>").addClass("group-stars");
    $(divStars).append(groupStar);
    const disStar = displayStar(groupStar, star);
    const dur = $("<p>").addClass("time ml-4").text(duration);
    $(divStars).append(disStar, dur);
    $(cardBody).append(h5, para, divcomment, divStars);
    $(divCard).append(cardBody);
  }

  function displayStar (selector, star) {
    let starState = "";
    let starString = "";
    for (nb = 0; nb < 5; nb++) {
       if (nb <= star) {
        starState = "/images/star_on.png";
      } else {
        starState = "/images/star_off.png";
      }
      starString = "imgStar" + nb;
      starString = $("<img>").attr({alt: "star", width: "15px", height: "15px", src: starState})
      $(selector).append(starString);
   }
  }

  function carousel(e, selector) {
    /*
        CC 2.0 License Iatek LLC 2018 - Attribution required
    */
    let $e = $(e.relatedTarget);
    let idx = $e.index();
    let itemsPerSlide = 4;
    let totalItems = $(selector + '.carousel-item').length;
    if (idx >= totalItems-(itemsPerSlide-1)) {
        let it = itemsPerSlide - (totalItems - idx);
        for (let i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $(selector + 'carousel-inner' + '.carousel-item').eq(i).appendTo(selector + '.carousel-inner');
            }
            else {
                $(selector + 'carousel-inner' + '.carousel-item').eq(0).appendTo(selector + '.carousel-inner');
            }
        }
    }
  }
  
  $('#carousel-video').on('slide.bs.carousel', function (e) {
    carousel(e, '#carousel-video');
  });
  
  displayQuotes();
  displayPopularvideos();
});
