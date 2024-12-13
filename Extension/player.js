// Do we have a Voyage DIV? In other words, already injected?
if (!document.getElementById('voyage')) {

    // We do not. Create a Voyage DIV...
    var div = document.createElement('div');
    div.id = 'voyage';
    div.style.position = 'fixed';
    div.style.zIndex = 9999;
    div.style.top = '50px';
    div.style.left = '50px';
    div.style.padding = '15px';
    div.style.borderRadius = '10px';
    div.style.backgroundColor = 'white';

    // Add it to the page.
    document.body.appendChild(div);

    // Create two lines of text for it and add it.
    var h1 = document.createElement('h1');
    h1.innerText = 'Voyage is running!';
    var h2 = document.createElement('h2');
    h2.innerText = 'Keep this tab in the foreground.';
    div.appendChild(h1);
    div.appendChild(h2);

    // Now also add the URL on which we are running.
    var p = document.createElement('p');
    p.id = 'voyageURL';
    p.innerText = 'Loading...';
    p.style.fontSize = '12px';
    p.style.marginTop = '5px';
    div.appendChild(p);


    // Get the video player of YouTube...
    var video = document.getElementsByTagName('video')[0];

    // Attach an event to it for when the video stops which reruns the functions in background.js.
    video.addEventListener('ended', function (e) {
        chrome.runtime.sendMessage({ msg: 'voyageNext@' + document.getElementById('voyageURL').innerText });
    });
}

