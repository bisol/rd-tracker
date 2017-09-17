var Fingerprint2 = require('fingerprintjs2')

// controll initial page submit
document.___rdTrackerStatus = 'init';

// create browser fingerprint & start tracker
new Fingerprint2().get(startSession);

function startSession(fingerprint) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        document.rdTrackerUser = JSON.parse(this.responseText);

        if (document.___rdTrackerStatus === 'documentReady') {
          console.log('tracker: init ses', window.location.href)
          postUserActivity(window.location.href);
          document.___rdTrackerStatus = 'ready';
        } else {
          document.___rdTrackerStatus = 'sessionReady';
        }
      } else {
        console.log('tracker: init error: http status=' + this.status + ' messaage=' + this.responseText);
      }
    }
  };

  xhttp.open('GET', 'https://fierce-plains-91052.herokuapp.com/?fp=' + fingerprint, true);
  xhttp.withCredentials = true; // cors cookies
  xhttp.send();
}

function postUserActivity(path) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log('tracker: new path', this.responseText);
      } else {
        console.log('tracker: new path error', this.responseText, this.status);
      }
    }
  };

  var timestamp = new Date().valueOf() / 1000
  xhttp.open('GET', 'https://fierce-plains-91052.herokuapp.com/user_visits/new?p=' + path + '&ts=' + timestamp, true);
  xhttp.withCredentials = true; // cors cookies
  xhttp.send();
}

window.onload = function () {
  var a = document.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++ ) {
    a[i].onclick = function (e) {
      postUserActivity(this.href);
    };
  }

  if (document.___rdTrackerStatus == 'sessionReady') {
    console.log('tracker: init win', window.location.href)
    postUserActivity(window.location.href);
    document.___rdTrackerStatus = 'ready';
  } else {
    document.___rdTrackerStatus = 'documentReady';
  }
};
