var gulp = require('gulp');
var ts = require("gulp-typescript");
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var tsProject = ts.createProject("tsconfig.json");
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: "./public/"
    })
})

gulp.task('views', function buildHTML() {
    return gulp.src('src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('public'))
});

gulp.task('sass', function(){
    return gulp.src('src/**/*.sass')
      .pipe(sass()) // Using gulp-sass
      .pipe(gulp.dest('public'))
});

gulp.task('copy-other', function() {
    // place code for your default task here
    return gulp.src(["src/**/*", "!src/**/*.ts", "!src/**/*.sass", "!src/**/*.pug"])
        .pipe(gulp.dest("public"))
});

gulp.task('typescript', function(){
    return gulp.src("src/**/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("public"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['typescript', 'sass', 'views', 'copy-other', 'browserSync'], function(){
    gulp.watch('src/**/*', ['typescript', 'sass', 'views', 'copy-other']); 
    // Other watchers
})

gulp.task('default', function() {
  // place code for your default task here
});