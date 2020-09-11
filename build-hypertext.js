const fs = require('fs');

const libraryPath = './library';
const entryNames = fs.readdirSync(libraryPath, {withFileTypes: true}).filter(entry => !entry.isDirectory()).map(entry => entry.name);

const htmlString =
`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no">
        <title>plaintext-library</title>
    </head>
    <body>
        <section>${entryNames ? entryNames.map(entryName => `<figure><a href="../${libraryPath}/${entryName}">${entryName}</figure>`).join('') : ''}</section>
    </body>
</html>
`;

const writeHTMLToFile = (writePath, fileName, pageData) => {
    const datedFileName = `${Date.now()}-${fileName}`;

    fs.writeFile(`${writePath}/${datedFileName}`, pageData, error => {
        if (error) {
            throw error;
        }

        console.log(`File created succesfully at ${writePath}/${datedFileName}`);
    });
};

writeHTMLToFile('./build', 'index.html', htmlString);
