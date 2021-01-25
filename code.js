var mapUrl = "https://www.google.com/maps/d/kml?forcekml=1&mid=";


function main() {
    // Iterate over all maps
    for (map of mapList) {
        downloadMap(map.title, map.id);
        Logger.log("X");
    }
}


function downloadMap(name, id) {
    // Append Map ID to URL
    var url = mapUrl + id;

    // Get the map file
    var response = UrlFetchApp.fetch(url);
//    var response = UrlFetchApp.fetch(url, {
//        headers: {
//            Authorization: "Bearer " + ScriptApp.getOAuthToken()
//        }
//    });
    //Logger.log(response);

    // Save the map file in the indicated Google Drive folder
    var file = findOrCreateFile(name, response.getBlob());
}

function findOrCreateFile(name, content) {
    var filename = name + ".kml";
    var file;

    // See if there's already a map file in the indicated Google Drive folder
    var backupFolder = DriveApp.getFolderById(backupDir);
    var files = backupFolder.getFilesByName(filename);
    if (files.hasNext()) {
        Logger.log("Reset existing file: " + filename);
        file = files.next();
        file.setContent(content.getDataAsString());
    }
    else {
        Logger.log("Created new file: " + filename);
        // Set the file contents
        file = backupFolder.createFile(content);
        // Set the file name
        file.setName(filename);
    }
}