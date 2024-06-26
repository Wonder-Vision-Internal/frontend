import $ from "jquery";
import { useDispatch } from "react-redux";

const Common = {
  ucWord: (str) => {
    if (str) {
      return str.toLowerCase().replace(/\b[a-z]/g, function (letra) {
        return letra.toUpperCase();
      });
    } else {
      return "";
    }
  },
  // Date Converted Function
  // dateConvert: (myDate) => {
  //     var convertedDateString = new Date(myDate).toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.');
  //     return convertedDateString;
  // },

  dateConvert: (myDate) => {
    const date = new Date(myDate);
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  },

  slugify: (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, ""),

  addJs: (urlOfTheLibrary, type) => {
    const script = document.createElement("script");
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  },

  getUserDetails: () => {
    return JSON.parse(localStorage.getItem("userDetails"));
  },
  loadCommonJs: () => {
    setTimeout(() => {
      (function ($) {
        $(".gallery-carousel").owlCarousel({
          loop: true,
          margin: 15,
          nav: true,
          dots: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 3,
            },
            1000: {
              items: 4,
              nav: true,
            },
          },
        });

        $(".blog-scroll").owlCarousel({
          loop: true,
          margin: 15,
          nav: true,
          dots: false,
          responsive: {
            0: {
              items: 2,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 2,
              nav: true,
            },
          },
        });
        // $('.client-carousel').owlCarousel({
        //     items: 6,
        //     margin: 0,
        //     loop: true,
        //     margin: 0,
        //     autoplay: true,
        //     responsive: {
        //         0: {
        //             items: 2
        //         },
        //         600: {
        //             items: 4
        //         },
        //         1000: {
        //             items: 6
        //         }
        //     }

        // })
        $("#owl-demo").owlCarousel({
          items: 1,
          navigation: false, // Show next and prev buttons
          //slideSpeed : 300,
          loop: true,
          autoPlay: true,
          autoplaySpeed: 5000,
          autoplayTimeout: 5000,
        });
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          if (scroll >= 60) {
            $("header").addClass("colorbar");
          } else {
            $("header").removeClass("colorbar");
          }
        });
        // $('.story-scroll').owlCarousel({
        //     loop: true,
        //     margin: 25,
        //     nav: false,
        //     dots: true,
        //     //autoplay:true,
        //     responsive: {
        //         0: {
        //             items: 1
        //         },
        //         600: {
        //             items: 2,

        //         },
        //         1400: {
        //             items: 2,

        //         }
        //     }
        // })
        // $('.award-car').owlCarousel({
        //     loop: true,
        //     margin: 10,
        //     dots: false,
        //     nav: false,
        //     autoplay: true,
        //     responsive: {
        //         0: {
        //             items: 2
        //         },
        //         600: {
        //             items: 2
        //         },
        //         1000: {
        //             items: 2
        //         }
        //     }
        // })
        $(".back-carousel").owlCarousel({
          items: 1,
          nav: true,
          dots: true,
          //navText : ['<i class='fa fa-chevron-left'></i>','<i class='fa fa-chevron-right'></i>'],
          loop: true,
          autoPlay: true,
          autoplaySpeed: 3000,
          autoplayTimeout: 3000,
        });

        $(".faq-scroll").owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          dots: false,
          //autoWidth:true,
          autoplay: true,
          responsive: {
            0: {
              items: 1,
              nav: false,
            },
            600: {
              items: 3,
              nav: false,
            },
            1400: {
              items: 5,
              nav: true,
            },
          },
        });
        // $('.gallery-carousel').owlCarousel({
        //     loop: true,
        //     margin: 15,
        //     nav: true,
        //     dots: true,
        //     responsive: {
        //         0: {
        //             items: 1
        //         },
        //         600: {
        //             items: 3
        //         },
        //         1000: {
        //             items: 4,
        //             nav: true
        //         }
        //     }

        // });
        // $('.gallery-carousel').owlCarousel({
        //     loop: true,
        //     margin: 15,
        //     nav: true,
        //     dots: true,
        //     responsive: {
        //         0: {
        //             items: 1,
        //             nav: false
        //         },
        //         600: {
        //             items: 3
        //         },
        //         1000: {
        //             items: 4,
        //             nav: true
        //         }
        //     }
        // })
        $(".common-scroll").owlCarousel({
          loop: false,
          margin: 15,
          nav: true,
          autoPlay: true,
          dots: true,
          responsive: {
            0: {
              items: 1,
              nav: false,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 3,
            },
          },
        });

        // $('.blog-scroll').owlCarousel({
        //     loop: true,
        //     margin: 15,
        //     nav: true,
        //     dots: false,
        //     responsive: {
        //         0: {
        //             items: 1,
        //             nav: false
        //         },
        //         600: {
        //             items: 2
        //         },
        //         1000: {
        //             items: 2,
        //             nav: true,
        //             dots: false
        //         }
        //     }
        // });

        $(".client-carousel").owlCarousel({
          items: 5,
          video:true,
          lazyLoad:true,
          loop: true,
          margin: 10,
          autoplay: false,
          autoplayHoverPause:true,
          responsive: {
            0: {
              items: 2,
              dots: false,
            },
            600: {
              items: 4,
            },
            1000: {
              items: 5,
            },
          },
        });

       
        $("#owl-demo").owlCarousel({
          items: 1,
          navigation: false, // Show next and prev buttons
          //slideSpeed : 300,
          loop: true,
          autoPlay: true,
          autoplaySpeed: 5000,
          autoplayTimeout: 5000,
        });
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          if (scroll >= 60) {
            $("header").addClass("colorbar");
          } else {
            $("header").removeClass("colorbar");
          }
        });
        // $('.award-car').owlCarousel({
        //     loop: true,
        //     margin: 10,
        //     dots: false,
        //     nav: false,
        //     autoplay: true,
        //     responsive: {
        //         0: {
        //             items: 4
        //         },
        //         600: {
        //             items: 4
        //         },
        //         1000: {
        //             items: 2
        //         }
        //     }
        // })
        $(".story-scroll").owlCarousel({
          loop: true,
          margin: 25,
          nav: false,
          dots: true,
          //autoplay:true,
          responsive: {
            0: {
              items: 1,
              dots: false,
            },
            600: {
              items: 2,
              
            },
            1400: {
              items: 2,
            },
          },
        });
        $(".award-car").owlCarousel({
          loop: true,
          margin: 10,
          dots: false,
          nav: false,
          autoplay: true,
          responsive: {
            0: {
              items: 4,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 2,
            },
          },
        });
        $(".back-carousel").owlCarousel({
          items: 1,
          nav: false,
          dots: false, // Show next and prev buttons
          //slideSpeed : 300,
          loop: true,
          autoPlay: true,
          autoplaySpeed: 3000,
          //autoplayTimeout: 5000
        });
        $(".faq-scroll").owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          dots: false,
          autoplay: true,
          responsive: {
            0: {
              items: 1,
              nav: false,
            },
            600: {
              items: 3,
              nav: false,
            },
            1400: {
              items: 3,
              nav: true,
            },
          },
        });
        //$("#navbarResponsive").toggle();
        $(".navbar-toggler").click(function () {
          $("#navbarResponsive").toggle();
        });
      })(window.jQuery);
    }, 2000);
  },
  tggleMenu: () => {
    (function ($) {
      $("#navbarResponsive").toggle();
    })(window.jQuery);
  },
  clickMenu: () => {
    (function ($) {
      setTimeout(() => {
        $(".navbar-toggler").trigger("click");
      }, 1000);
    })(window.jQuery);
  },
  limitWords: (text, limit) => {
    if (text) {
      const words = text.split(/\s+/);
      if (words.length <= limit) {
        return text;
      } else {
        const truncatedText = words.slice(0, limit).join(" ");
        return truncatedText + "...";
      }
    } else {
      return "...";
    }
  },
  expandWords: (text) => {
    if (text) {
      const words = text.split(/\s+/);
        const truncatedText = words.slice(0, words.length).join(" ");
        return truncatedText + "...";
    } else {
      return "...";
    }
  },
  removeSubstrings: (inputString, substringsToRemove) => {
    // Iterate through the substrings to remove
    for (const substring of substringsToRemove) {
      // Create a regular expression with the substring to remove and the 'g' flag for global matching
      const regex = new RegExp(substring, "g");

      // Use the replace method to remove all occurrences of the substring
      inputString = inputString.replace(regex, "");
    }

    return inputString;
  },
};

export default Common;
