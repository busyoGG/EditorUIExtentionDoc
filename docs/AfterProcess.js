window.AfterProcess = {
  ResetCodeStyle: () => {
    // var eles = document.getElementsByClassName("highlight");
    var eles = document.getElementsByTagName("pre");
    var colors = ["#ed6a5e", "#f5bd4f", "#61c454"];
    for (let i = 0, len = eles.length; i < len; i++) {
      // eles[i].attributes.removeNamedItem("v-pre");
      // // eles[i].attributes.setNamedItem("v-highlightj");
      // // eles[i].setAttribute("v-highlightjs",true);
      // eles[i].v-highlightjs;

      let child = eles[i].firstChild;
      //创建按钮
      let customDiv = document.createElement("div");
      customDiv.style.display = "flex";
      customDiv.style.height = "40px";
      customDiv.style.width = "100%";

      for (let j = 0; j < 3; j++) {
        let btn = document.createElement("div");
        btn.style.backgroundColor = colors[j];
        btn.style.height = "20px";
        btn.style.width = "20px";
        btn.style.border = "1px solid " + colors[j];
        btn.style.borderRadius = "10px";
        btn.style.margin = "10px 5px 10px 5px";
        customDiv.appendChild(btn);
      }

      console.log("是否匹配", child.nodeName);
      if (child.nodeName != "FIGCAPTION") {
        //没有标题
        eles[i].insertBefore(customDiv, child);
      } else {
        eles[i].replaceChild(customDiv, child);
        //有标题
        let p = document.createElement("p");
        p.style.width = customDiv.offsetWidth - 40 * 3 + "px";
        p.style.height = "40px";
        p.style.textAlign = "center";
        p.style.margin = "0px";
        p.style.lineHeight = "40px";
        p.innerText = child.firstChild.innerText;
        p.style.fontSize = "20px";
        customDiv.appendChild(p);
      }
    }
  },

  ResetTitle: () => {
    var eles = document.querySelectorAll("h2");
    var picker = window.getComputedStyle;
    for (let i = 0, len = eles.length; i < len; i++) {
      let child = eles[i].firstChild;
      let eleStyle = picker(eles[i]);
      //创建标识
      let customDiv = document.createElement("div");
      customDiv.style.display = "flex";
      customDiv.style.width = "15px";
      customDiv.style.backgroundColor = "#61c454";
      customDiv.style.height = eleStyle.fontSize;
      customDiv.style.marginRight = "10px";
      customDiv.style.marginTop =
        (parseFloat(eleStyle.height) - parseFloat(eleStyle.fontSize)) * 0.5 +
        "px";
      customDiv.style.borderRadius = "5px";
      // console.log("字体大小",eleStyle.fontSize,parseFloat(eleStyle.lineHeight),parseFloat(eleStyle.fontSize))
      // customDiv.style.verticalAlign
      // eles[i].style.display = "flex";
      // eles[i].style.verticalAlign = "center"
      // eles[i].style.borderBottom = "1px solid rgba(68,68,68,0.1)";
      eles[i].className = "h2_line";

      eles[i].insertBefore(customDiv, child);
    }

    var eles2 = document.querySelectorAll("h1");
    for (let i = 0, len = eles2.length; i < len; i++) {
      // let eleStyle = picker(eles[i]);
      // eleStyle.textAlign = "center";
      let child = eles2[i];
      child.style.textAlign = "center";
    }

    var eles3 = document.querySelectorAll("h3");
    for (let i = 0, len = eles3.length; i < len; i++) {
      let child = eles3[i].firstChild;
      let eleStyle = picker(eles3[i]);
      //创建标识
      let customDiv = document.createElement("div");
      customDiv.style.display = "flex";
      customDiv.style.width = "14px";
      customDiv.style.backgroundColor = "#cc636b";
      customDiv.style.height = "14px";
      customDiv.style.marginRight = "10px";
      customDiv.style.marginTop =
        (parseFloat(eleStyle.height) - 15) * 0.5 + "px";
      customDiv.style.borderRadius = "7px";
      // console.log("字体大小",eleStyle.fontSize,parseFloat(eleStyle.lineHeight),parseFloat(eleStyle.fontSize))
      // customDiv.style.verticalAlign
      eles3[i].style.display = "flex";
      eles3[i].style.verticalAlign = "center";

      eles3[i].insertBefore(customDiv, child);
    }
  },

  ResetList: () => {
    var eles = document.querySelectorAll(".app-sub-sidebar");

    for (let i = 0, len = eles.length; i < len; i++) {
      let child = eles[i];

      if (i > 1) {
        child.className = "ul_close";
      }

      child.addEventListener("click", (eventData) => {
        if (eventData.target.parentElement.parentElement == child) {
          setTimeout(() => {
            let grandChilds = child.childNodes;
            grandChilds.forEach((gc) => {
              // console.log("子对象",gc.className);
              if (gc.nextSibling) {
                if (
                  gc.localName == "li" &&
                  gc.className == "active" &&
                  gc.nextSibling.localName == "ul"
                ) {
                  // gc.parentElement.className = "app-sub-sidebar";
                  gc.nextSibling.className = "app-sub-sidebar";
                } else if (gc.nextSibling.localName == "ul") {
                  // gc.parentElement.className = "ul_close";
                  gc.nextSibling.className = "ul_close";
                }
              }
            });
          }, 10);
        }
        // eventData.stopPropagation();
      });
    }

    // siblings.forEach((sibling) => {
    //   observer.observe(sibling, {
    //     attributes: true,
    //     attributeFilter: ["class"],
    //   });
    // });

    // var eles2 = document.querySelectorAll(".section-link");
    // console.log(eles2);
    // for(let i = 1,len = eles2.length ; i < len ; i++){
    //     let child = eles2[i];
    //     console.log(window.getComputedStyle(child, ':before').content)
    // }
  },

  InitVideo: () => {
    let videos = document.getElementsByTagName("video");
    for (let index = 0; index < videos.length; index++) {
      let ele = videos[index];
      let player = new Plyr(ele, {
        controls: [
          'play-large', // The large play button in the center
          'play', // Play/pause playback
          'restart', // Restart playback
          'progress', // The progress bar and scrubber for playback and buffering
          'current-time', // The current time of playback
          'duration', // The full duration of the media
          'mute', // Toggle mute
          'volume', // Volume control
          'captions', // Toggle captions
          'settings', // Settings menu
          'pip', // Picture-in-picture (currently Safari only)
          'airplay', // Airplay (currently Safari only)
          'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
          'fullscreen', // Toggle fullscreen
        ]
       });
    }
    

     // 监听全屏状态变化
     document.addEventListener('fullscreenchange', handleFullscreenChange);
     document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
     document.addEventListener('mozfullscreenchange', handleFullscreenChange);
     document.addEventListener('MSFullscreenChange', handleFullscreenChange);

     function handleFullscreenChange() {
         var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
         
         if (fullscreenElement) {
            //  fullscreenStateDiv.textContent = '当前是全屏状态';
            for (let index = 0; index < videos.length; index++) {
              let ele = videos[index];
              ele.classList.add("full-screen")
            }
         } else {
            //  fullscreenStateDiv.textContent = '当前不是全屏状态';
            for (let index = 0; index < videos.length; index++) {
              let ele = videos[index];
              ele.classList.remove("full-screen")
            }
         }
     }
  },

  Init: () => {
    console.log("初始化界面");
    AfterProcess.ResetCodeStyle();
    AfterProcess.ResetTitle();
    AfterProcess.InitVideo();
    setTimeout(() => {
      AfterProcess.ResetList();
    }, 1);
  },
};

// window.onload = function(){
//     AfterProcess.Init();
// }
