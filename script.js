function addChat() {
    var toReturn = '<p>'
    var i = 0;
    oldData.forEach(msg => { toReturn += `<a href="//wasteof.money/users/${msg.username}"> <img src="//api.wasteof.money/users/${msg.username}/picture" width="20px" onload="window.scrollTo(0, document.body.scrollHeight);">@${msg.username}</a>: <span class="content" id="${i}"></span> <br>`; i++ })
    toReturn += '</p>'
    return toReturn
  }
  
  function generate() {
    const msg = document.getElementsByClassName("content");
    fetch('/data').then(function(response) {
      return response.json();
    }).then(function(oldd) {
      window.oldData = oldd;
      document.getElementById('chat').innerHTML = addChat();
      console.log(oldData);
      setInterval(() => {
        fetch('/data').then(function(response) {
          return response.json();
        }).then(function(d) {
          if (d.length > oldData.length) generate();
        })
      }, 1000);
      for (var i = 0; i < msg.length; i++) {
        msg[i].innerText = oldData[i].content;
      }
    });
  }
  
  generate();