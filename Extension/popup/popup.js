document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start').onclick = function () {
        chrome.runtime.sendMessage({ msg: 'voyageStart@' + document.getElementById('url').value });
    };
});
