// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

var app = new kendo.mobile.Application(document.body, { layout: 'voyage', skin: 'nova' }),
    searchInput = document.getElementById('search'),
    captionCurrent = 0,
    captionLength = 0,
    captionRun = 0,
    captions = {};

document.addEventListener('DOMContentLoaded', () => {
    captions = ['Train - Shake it Up', 'Longest Johns - Llandroger', 'Disturbed - Sound of Silence'];
    if (searchInput && captionRun == 0) {
        captionRun = setTimeout(startType, 600);
    }
});

var searchDatasource = new kendo.data.DataSource({
    transport: {
        read: function (operation) {
            if (!searchInput.value) {
                operation.success([]);
                return;
            }

            $.ajax({
                url: '/api/search/' + searchInput.value,
                type: 'get',
                success: function (results) {
                    operation.success(results);
                }
            });
        }
    }
});

var searchViewModel = kendo.observable({
    searchTerm: '',
    source: searchDatasource,
    onSearch: function (e) {
        if (this.get('searchTerm')) {
            searchDatasource.read();
        }

        e.preventDefault();
    },
    onAdd: function (e) {

        fetch('/api/search/add/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.data)
        })
            .then(() => {
                alert('Liedje is toegevoegd aan de afspeellijst!');
                searchInput.value = null;
                searchDatasource.read();
            })
            .catch(error => alert('Unable to add item.\n' + error));

        e.preventDefault();
    }
});

// Ticker code from external sources below...

var startType = function () {
    if (captionCurrent >= captions.length) {
        captionCurrent = 0;
    }

    caption = captions[captionCurrent];
    captionCurrent++;
    captionLength = 1;

    captionRun = setInterval(doType, 50);
};

var doType = function () {
    searchInput.placeholder = caption.substring(0, captionLength++);

    if (captionLength === caption.length + 1) {
        clearInterval(captionRun);
        captionRun = setTimeout(startErase, 1000);
    }
};

var startErase = function () {
    clearTimeout(captionRun);
    captionLength = caption.length;
    captionRun = setInterval(doErase, 50);
};

var doErase = function () {
    searchInput.placeholder = caption.substring(0, captionLength--);

    if (captionLength < 0) {
        clearInterval(captionRun);
        captionRun = setTimeout(startType, 1000);
    }
};