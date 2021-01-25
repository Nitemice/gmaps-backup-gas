const mapUrl = "https://www.google.com/maps/d/kml?forcekml=1&mid=";


function findOrCreateFile(parentDir, filename, content)
{
    var file;

    // See if there's already a file in the indicated Google Drive folder
    var backupFolder = DriveApp.getFolderById(parentDir);
    var files = backupFolder.getFilesByName(filename);
    if (files.hasNext())
    {
        file = files.next();
        // Set the file contents
        file.setContent(content);
        Logger.log("Updated existing file: " + filename);
    }
    else
    {
        // Create a new file with content
        file = backupFolder.createFile(filename, content);
        Logger.log("Created new file: " + filename);
    }
    return file;
}

function downloadMap(backupDir, mapId, mapName)
{
    // Append Map ID to URL
    var url = mapUrl + mapId;

    // Get the map file
    var response = UrlFetchApp.fetch(url);
    //Logger.log(response);

    // Save the map file in the indicated Google Drive folder
    var file = findOrCreateFile(backupDir, mapName + ".kml", response.getContentText());
}

function main()
{
    // Iterate over all maps
    for (map of config.mapList)
    {
        downloadMap(config.backupDir, map.id, map.name);
    }
}