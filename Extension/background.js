chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var data = request.msg.split('@');
        if (data[0] == 'voyageStart') {
            start(data[1]);
        }
        if (data[0] == 'voyageNext') {
            next(data[1]);
        }
    }
);

const start = (url) => {
    getSong(url).then((video) => {
        chrome.tabs.create({ url: 'https://www.youtube.com/watch?v=' + video }, (tab) => {
            chrome.tabs.onUpdated.addListener((updateTabId, changeInfo) => {
                if (updateTabId == tab.id && changeInfo.status == "complete") {

                    chrome.action.setBadgeText({
                        tabId: tab.id,
                        text: 'ON',
                    });

                    inject(tab.id, url);
                }
            });
        });
    });
}

const next = (url) => {
    getSong(url).then((video) => {
        chrome.tabs.update(undefined, { url: 'https://www.youtube.com/watch?v=' + video }, (tab) => {
            chrome.tabs.onUpdated.addListener((updateTabId, changeInfo) => {
                if (updateTabId == tab.id && changeInfo.status == "complete") {
                    inject(tab.id, url);
                }
            });
        });
    });
}

const getSong = async (url) => {
    const response = await fetch(url + 'api/player/sync/');
    const data = await response.text();
    return data;
}

const inject = (tabId, url) => {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['player.js']
    }).then(() => {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: sendUrl,
            args: [url]
        });
    });
}

const sendUrl = (url) => {
    var div = document.getElementById('voyageURL');
    div.innerText = url;
}
