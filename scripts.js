$( document ).ready(function() {
  /**
   * retrieve informations of the api
   */
  function getInfo() {
    
    const url = "https://smileschool-api.hbtn.info/quotes";
    const urlPopular = "https://smileschool-api.hbtn.info/popular-tutorials";
    const urlLatest = "https://smileschool-api.hbtn.info/latest-videos";
    $.get({
      url: url,
      success: function(data){
        $("#loader").show();
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
    });
    $.get({
      url: urlPopular,
      success: function(data) {
        $("#loader2").show();
        for (let i = 0; i < data.length; i++) {
          displayPopularvideos(i, data[i].title, data[i]["sub-title"], data[i].thumb_url, data[i].author,
                                data[i].author_pic_url, data[i].star, data[i].duration);
        }
      },
      error: function() {
        alert("Error");
      },
      complete: function() {
        $("#loader2").hide();
      }
    });
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

  /**
   * create carousel popular video
   */
  function displayPopularvideos(position, title, subTitle, thumb_url, author,
    author_pic_url, star, duration) {
      const divItem = $("<div>").attr({class: `carousel-item ${position === 0 ? "active" : ""}`});
      $("#carousel-inner").append(divItem);
      const divAllCards = $("<div>").addClass("all-cards d-inline-flex");
      $(divItem).append(divAllCards);

      const divCard = $("<div>").attr({class: "card mr-2 border-0",
                                       width: "15rem"});
      $(divAllCards).append(divCard);
      const imge = $("<img>").attr({class: "card-img-top",
                                    src: thumb_url,
                                    alt: "photo smile"});
      $(divCard).append(imge);
      const divPlay = $("<div>").addClass("card-img-overlay justify-content-center");
      $(divCard).append(divPlay);
      const imgPlay = $("<img>").attr({width: "50rem",
                                      src: "/images/play.png",
                                      alt: "play"});
      $(divPlay).append(imgPlay);
      const divCardBody = $("<div>").addClass("card-body");
      $(divCard).append(divCardBody);
      const h5 = $("<h5>").addClass("card-title font-weight-bold").text(title);
      $(divCardBody).append(h5);
      const para = $("<p>").addClass("card-text font-weight-light").text(subTitle);
      $(divCardBody).append(para);
      const divCommment = $("<div>").addClass("comments d-inline-flex");
      $(divCardBody).append(divCommment);
      const imgComment = $("<img>").attr({class: "rounded-circle mr-2",
                                          src: author_pic_url,
                                          alt: "photo",
                                          width: "20px",
                                          height: "20px"});
      $(divCommment).append(imgComment);
      const pComment = $("<p>").addClass("name ml-2 mb-0 pr-2").text(author);
      $(divCommment).append(pComment);
      const divStars = $("<div>").addClass("stars d-inline-flex");
      $(divCardBody).append(divStars);
      const groupStar = $("<div>").addClass("group-stars");
      $(divStars).append(groupStar);
      let starState = "";
      let starString = "";
      for (nb = 0; nb < 5; nb++) {
        if (nb <= star) {
          starState = "/images/star_on.png";
        } else {
          starState = "/images/star_off.png";
        }
        starString = "imgStar" + nb;
        starString = $("<img>").attr({alt: "star", width: "15px", height: "15px", src: starState});
        $(groupStar).append(starString);
      }
      const dur = $("<p>").addClass("time ml-4").text(duration);
      $(divStars).append(dur);
  }

  function slideCarousel(e, selector) {
      /*
          CC 2.0 License Iatek LLC 2018
          Attribution required
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
                  $(divItem).eq(i).appendTo(selector + '#carousel-inner');
              }
              else {
                  $(divItem).eq(0).appendTo(selector + '#carousel-inner');
              }
          }
      }
  }



  function displayLatestvideos(position, title, subTitle, thumb_url, author,
    author_pic_url, star, duration) {
      const divItem = $("<div>").attr({class: `carousel-item ${position === 0 ? "active" : ""}`});
      $("#latest").append(divItem);
      
      const divAllCards = $("<div>").addClass("all-cards d-inline-flex");
      $(divItem).append(divAllCards);

      const divCard = $("<div>").attr({class: "card mr-2 border-0",
                                       width: "15rem"});
      $(divAllCards).append(divCard);
      const imge = $("<img>").attr({class: "card-img-top",
                                    src: thumb_url,
                                    alt: "photo smile"});
      $(divCard).append(imge);
      const divPlay = $("<div>").addClass("card-img-overlay justify-content-center");
      $(divCard).append(divPlay);
      const imgPlay = $("<img>").attr({width: "50rem",
                                      src: "/images/play.png",
                                      alt: "play"});
      $(divPlay).append(imgPlay);
      const divCardBody = $("<div>").addClass("card-body");
      $(divCard).append(divCardBody);
      const h5 = $("<h5>").addClass("card-title font-weight-bold").text(title);
      $(divCardBody).append(h5);
      const para = $("<p>").addClass("card-text font-weight-light").text(subTitle);
      $(divCardBody).append(para);
      const divCommment = $("<div>").addClass("comments d-inline-flex");
      $(divCardBody).append(divCommment);
      const imgComment = $("<img>").attr({class: "rounded-circle mr-2",
                                          src: author_pic_url,
                                          alt: "photo",
                                          width: "20px",
                                          height: "20px"});
      $(divCommment).append(imgComment);
      const pComment = $("<p>").addClass("name ml-2 mb-0 pr-2").text(author);
      $(divCommment).append(pComment);
      const divStars = $("<div>").addClass("stars d-inline-flex");
      $(divCardBody).append(divStars);
      const groupStar = $("<div>").addClass("group-stars");
      $(divStars).append(groupStar);
      let starState = "";
      let starString = "";
      for (nb = 0; nb < 5; nb++) {
        if (nb <= star) {
          starState = "/images/star_on.png";
        } else {
          starState = "/images/star_off.png";
        }
        starString = "imgStar" + nb;
        starString = $("<img>").attr({alt: "star", width: "15px", height: "15px", src: starState});
        $(groupStar).append(starString);
      }
      const dur = $("<p>").addClass("time ml-4").text(duration);
      $(divStars).append(dur);
    }
  getInfo();
});
