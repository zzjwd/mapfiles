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
          punctuation: 'var htmls=[%];',
          separator: ','
        }),config=grunt.config.data.pkg.viewsWay,
        _gObject=function(f){
          var temp={},content;
          f.src.forEach(function(key){
            console.log(key.replace(/\/(.+?)\./g,"$1"));
            temp[key.replace(/.*\/(.+?)\..*/g,"$1")]=grunt.file.read(key);
          });
          content = options.punctuation.replace("%",JSON.stringify(temp));
          grunt.file.write(f.dest, content);
        },
        _gArray=function(f){
          var src = f.src.filter(function(filepath) {
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
          }).map(function(filepath) {
            return filepath.replace(/[^\/]*\/(.*)\.[^\.]*/ig,function(m,s){
              return '"'+s+'"';
            });
          });
          src = options.punctuation.replace("%",src);
          grunt.file.write(f.dest, src);
        };

    this.files.forEach(function(f) {
      config?_gArray(f):_gObject(f);
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
