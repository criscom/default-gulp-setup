var gulp = require('gulp');
  sassLint = require('gulp-sass-lint');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var exec = require('child_process').exec;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
  .pipe(sassLint({
       // options: {
       //   formatter: 'stylish',
       //   'merge-default-rules': false
       // },
       files: { ignore: [
          'css/style.css.map',
          'css/style.css'          ]
       },
       // rules: {
       //  'no-ids': 1,
       //  'border-zero': 'none',
       // }
       configFile: 'sass-lint.yml'
     }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' })) // compressed
    .pipe(autoprefixer('> 0.5%', 'last 2 versions'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  // gulp.src('./source/js/*.js')
    //.pipe(jshint())
    //.pipe(jshint.reporter('fail'))
    // .pipe(concat('theme.js'))   
    // .pipe(gulp.dest('./assets/js'))
    //.pipe(browserSync.stream());
});

gulp.task('img', function() {
  /*gulp.src('./source/img/*.{png,jpg,gif}')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest('./assets/img'))*/
    //.pipe(browserSync.stream());
});

gulp.task('watch', function() {
  browserSync.init({
    proxy: 'http://schafzahl0.sunlime.it',
    serveStatic: ['../../../']
  });
      
  gulp.watch('./sass/**/*.scss', ['sass', 'deploy']);
  // gulp.watch('./source/js/*.js', ['js', 'deploy']);
  // gulp.watch('./source/img/*.{png,jpg,gif}', ['img', 'deploy']);
  //gulp.watch('theme/**/*.php', ['deploy']);
});


gulp.task('deploy', function() {
});

gulp.task('default', ['deploy', 'watch']);