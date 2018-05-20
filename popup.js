function goAgain(list){
	var use = list[Math.floor(Math.random() * list.length)];
	console.log(use);
	if (use['protocol'].startsWith('elite')){
		var config = {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: 'https',
            host: use['ipAddress'],
			port: parseFloat(use['port'])
          }
        }
      };
	}
	else {
	 var config = {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: use['protocol'],
            host: use['ipAddress'],
			port: parseFloat(use['port'])
          }
        }
      };
	}
      chrome.proxy.settings.set(
          {value: config, scope: 'regular'},
          function() {
			 $.ajax({
    timeout: 12000,
          url: "https://google.com",
          success: function(result){
             $('#results').html('<b>Connected!</b> <br></br>' + use['country'] + ' ' + use['protocol'] + ' ' + use['ipAddress'] + ' ' + use['port']);
          },     
          error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.readyState == 4) {
			console.log(4);
            // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
        }
        else if (XMLHttpRequest.readyState == 0) {
			console.log(0);
            // Network error (i.e. connection refused, access denied due to CORS, etc.)
        }
        else {
			console.log("?");
            // something weird is happening
        }
		goAgain(list);
    }
       });
		  });
}
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
	  console.log('test');
	  var config = {
        mode: "direct",
        
      };
      chrome.proxy.settings.set(
          {value: config, scope: 'regular'},
          function() {
$.getJSON('http://24.89.210.42:3000', function(data){
			  var list = [];
			  for (var d in data){
						list.push(data[d]);
			  }
	goAgain(list);
});});
	
  }, false);
}, false);