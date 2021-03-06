module.exports = function (grunt) {
  grunt.config.set('copy', {
    release: {
      files: [
        {
          expand: true,
          cwd: 'public',
          src: [
            'pre-build.html'
          ],
          dest: 'public/',
          rename: function (dest, src) {
            return dest + 'index.html';
          }
        },
        {
          expand: true,
          cwd: 'public/bower_components/font-awesome/',
          src: ['fonts/*'],
          dest: 'public/build/',
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: 'public/bower_components/fileapi/dist/',
          src: ['FileAPI.min.js', 'FileAPI.flash.swf'],
          dest: 'public/polyfills/',
          filter: 'isFile'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
