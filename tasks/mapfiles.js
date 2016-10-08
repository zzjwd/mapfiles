/*
 * mapfiles
 * zzjwd,qq:550703900
 *
 * Copyright (c) 2016 zzjwd
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('mapfiles', 'mapfiles', function() {
        var options = this.options({
            punctuation: 'var htmls=%;',
            separator: ','
        });
        this.files.forEach(function(f) {
            var temp={},content;
            f.src.forEach(function(key){
                console.log(key.replace(/\/(.+?)\./g,"$1"));
                temp[key.replace(/.*\/(.+?)\..*/g,"$1")]=grunt.file.read(key);
            });

            content = options.punctuation.replace("%",JSON.stringify(temp));
            grunt.file.write(f.dest, content);
            grunt.log.writeln('File "' + f.dest + '" created.');

        });
    });

};
