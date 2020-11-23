'use strict'

var autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    del = require('del'),
    gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    // runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    // clean = require('gulp-clean'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create(),
    imagemin = require("gulp-imagemin"),
    newer = require("gulp-newer");

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// To prevent rewriting the source and build folder locations
const paths = {
    source: './src',
    build: './dist'
};
// Erases the dist folder
function cleanup() {
    // Simply execute del with the build folder path
    return del([paths.build]);
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        /* proxy: `http://${siteName}.test`,*/
        open: 'local',
        port: 8000,
    })
}

function watch() {
    //Watched files paths
    gulp.watch(`${paths.source}/**/**/*.php`).on('change', browserSync.reload);
    gulp.watch(`${paths.source}/**/**/*.html`, gulp.series(copyHtml)).on('change', browserSync.reload);
    gulp.watch(`${paths.source}/**/**/*.js`, gulp.series(js)).on('change', browserSync.reload);
    gulp.watch(`${paths.source}/**/**/*.scss`, gulp.series(gulpSass)).on('change', browserSync.reload);
    gulp.watch(`${paths.source}/**/**/*.sass`, gulp.series(gulpSass)).on('change', browserSync.reload);

}

//task
function js() {
    // Start by calling browserify with our entry pointing to our main javascript file
    return (
        browserify({
            entries: [`${paths.source}/scripts/main.js`, 'node_modules/jquery/dist/jquery.min.js'],
            transform: [babelify.configure({ presets: ['@babel/preset-env'] })]
        })
            .bundle()
            .pipe(source('bundle.js'))
            // Turn it into a buffer!
            .pipe(buffer())
            // And uglify
            .pipe(uglify())
            .pipe(gulp.dest(`${paths.build}/js`))
    );
}

gulp.task(js);

function copyHtml() {
    // Gulp task to minify HTML files
    return gulp.src([`${paths.source}/*.html`])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(paths.build));
}

gulp.task(copyHtml);

function gulpSass() {
    return gulp.src([`${paths.source}/**/**/*.scss`, `${paths.source}/**/**/*.sass`])
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(`${paths.build}/css`))
        .pipe(browserSync.stream())
}

gulp.task(gulpSass);

// Optimize Images
function images() {
    return gulp
        .src(`${paths.source}/img/**/*`)
        .pipe(newer(`${paths.build}/img/`))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(gulp.dest(`${paths.build}/img/`));
}

gulp.task(images);
gulp.task('default', gulp.series(cleanup, gulp.parallel(server, watch, js, gulpSass,images, copyHtml)));
