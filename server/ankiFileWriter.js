const fs = require('fs');
const path = require('path');

const links = {
    anglais_francais: "eng-fra/fra.txt",
    francais_lingala: "fra-ling/ling.txt",
}

/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 *
 * @see http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir
 * @param {Function} done
 */
function ankiFileWriter(path, source, target, metadata, done) {

    const data_path =  links[path] ? "./data/anki/" + links[path] : "./data/anki/unknown.txt";



    let data = "";
    let results = [];
    let content = source + '\t' + target + '\t' + metadata;

    try {
        const data = fs.readFileSync(data_path, 'utf8')

        if(data) {

            const lines     = data.split("\n");

            for (let i = 0; i < lines.length; i++) {
                let line    = lines[i];
                let lineArr = line.split("\t");             

                if(lineArr) {
                    let input_text = lineArr[0] 

                    if(input_text.length > source.length) {
                        lines.splice(i, 0, content); //insert ne translated data
                        break;
                    } else {
                        lines.push(content);
                        break;
                    }
                }
            }

            console.log("lines.join()", lines.join())
            fs.writeFile(data_path, lines.join('\n'), 'utf8', function (err) {

                if(err)
                    console.error(err)

                console.log('everything done');
                done(null, 'results')
                
            })
            return done(null, 'results')

        } 
        else {
            console.log(data_path, content, data);
            fs.writeFile(data_path, content, 'utf8', function (err) {

                if(err)
                    console.error(err)

                console.log('everything done');
                done(null, 'results')
                
            })
        }
    } catch (err) {
      // Here you get the error when the file was not found,
      // but you also get any other error
        if (err.code === 'ENOENT') {
            console.log('File not found!');
        } else {
            throw err;
        }
    }
};

export default ankiFileWriter