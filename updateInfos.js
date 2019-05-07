setInterval(updateInfos, 3000);


function updateInfos() {
    const primaryDisplayId = window.electron.screen.getPrimaryDisplay().id;
    const primaryDisplayIdDom = document.getElementById('primaryDisplayId');
    primaryDisplayIdDom.innerHTML = primaryDisplayId;

    const displays = window.electron.screen.getAllDisplays();
    const displaysDom = document.getElementById('displays');
    displaysDom.innerHTML = JSON.stringify(displays, null, 2);

    const thumbnailsDom = document.getElementById('thumbnails');
    window.electron.desktopCapturer.getSources({ types: ['screen'] }, (err, sources) => {
        if (err)
            return;
        thumbnailsDom.innerHTML = sources.reduce((acc, cur) => {
            return acc + `
                <div class="thumb">
                    ID: ${cur.id}
                    D_ID: ${cur.display_id}
                    <img src="${cur.thumbnail.toDataURL()}"/>
                </div>
            `;
        }, "");
    });
}