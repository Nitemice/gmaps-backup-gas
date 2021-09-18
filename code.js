const mapUrl = "https://www.google.com/maps/d/kml?forcekml=1&mid=";

function downloadMap(backupDir, mapId, mapName)
{
    // Append Map ID to URL
    var url = mapUrl + mapId;

    // Get the map file
    var response = UrlFetchApp.fetch(url);
    //Logger.log(response);

    // Save the map file in the indicated Google Drive folder
    var file = common.updateOrCreateFile(backupDir, mapName + ".kml",
        response.getContentText());
}

function main()
{
    // Iterate over all maps
    for (map of config.mapList)
    {
        downloadMap(config.backupDir, map.id, map.name);
    }
}