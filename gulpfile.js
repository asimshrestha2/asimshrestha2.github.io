var gulp = require('gulp');
var ts = require("gulp-typescript");
var sass = require('gulp-sass');
var pug = require('gulp-pug');
// var htmlmin = require('gulp-htmlmin');
var tsProject = ts.createProject("tsconfig.json");
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: "./public/"
    })
})

gulp.task('views', function buildHTML() {
    return gulp.src('src/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('sass', function(){
    return gulp.src('src/**/*.sass')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Using gulp-sass
      .pipe(gulp.dest('public'))
      .pipe(browserSync.stream());
});

gulp.task('copy-other', function() {
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
    gulp.watch('src/**/*.ts', ['typescript']); 
    gulp.watch('src/**/*.sass', [ 'sass' ]); 
    gulp.watch('src/**/*.pug', ['views']); 
    gulp.watch(["src/**/*", "!src/**/*.ts", "!src/**/*.sass", "!src/**/*.pug"], ['copy-other']); 
    // Other watchers
})

gulp.task('public', function() {
    var exportLoc = 'D:/github/asimshrestha2.github.io-master/asimshrestha2.github.io';
    gulp.src("src/**/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest(exportLoc))

    gulp.src(["src/**/*", "!src/**/*.ts", "!src/**/*.sass", "!src/**/*.pug"])
        .pipe(gulp.dest(exportLoc))

    gulp.src('src/**/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Using gulp-sass
        .pipe(gulp.dest(exportLoc))
    
    gulp.src('src/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(exportLoc))
});