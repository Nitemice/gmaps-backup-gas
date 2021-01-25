# Google Maps Backup Script

*Export custom Google Maps as KML files, using Google Apps Script.*

This script can be used to automatically bulk-export a collection of public,
user-generated Google Maps maps as KML files. They are stored in a specified
Google Drive directory, where they can be easily downloaded or shared.

**NOTE**: All maps being exported must have "link sharing" enabled.
This option can be found under the "Share" options in the 'My Maps' editor
interface. The "Public: everyone on the internet can find and access" option
does not need to be enabled.

## Usage

This script is designed to be run on-demand via the GAS interface, or
periodically via GAS triggers. For more info on setting up GAS triggers, see
[this Google Apps Script guide](https://developers.google.com/apps-script/guides/triggers).

To execute the script, simply run the `main()` function.

## Setup

There are two basic steps necessary to run this script.

1. [Customize your config file](#1.-Customize-your-config-file)
2. [Load the script into a new Google Apps Script project](#2.-Load-the-script-into-a-new-Google-Apps-Script-project)

### 1. Customize your config file

`config.js` should contain a single JavaScript object, used to specify all
necessary configuration information. Here's where you specify details about
the maps to be backed up, as well as the Google Drive directory to save the KML
files to.

An example version is provided, named `example.config.js`, which can be
renamed or copied to `config.js` before loading into the GAS project.

The basic structure can be seen below.

```js
const config = {
    "mapList": [
        {
            "name": "<map name>",
            "id": "<Google Maps map ID>"
        }
    ],
    "backupDir": "<Google Drive directory ID>"
};
```

- `mapList.name`: An arbitrary map name, used as the exported filename.
- `mapList.id`: The ID of the map, which can be found in the map's sharable
    link, under `mid=XYZ`.
- `backupDir`: The ID of the Google Drive directory, where exported maps
    should be stored. This can be found by navigating to the folder, and
    grabbing the ID from the tail of the URL.

### 2. Load the script into a new Google Apps Script project

You can manually load the script into a
[new GAS project](https://www.google.com/script/start/),
by simply copying and pasting it into the editor.

Or you can use a
[tool like clasp](https://developers.google.com/apps-script/guides/clasp)
to upload it directly. For more information on using clasp, here is a
[guide I found useful](https://github.com/gscharf94/Clasp-Basics-for-Reddit).
