'use strict';

const {src,dest,watch,parallel,series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const cache = require('gulp-cache')
const cleanCSS = require('gulp-clean-css')
const notify = require('gulp-notify')
const imagemin = require('gulp-imagemin')
function styles() {
    return src('app/scss/main.scss')
        .pipe(sass()).on("error", notify.onError())
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: false,
                },
                2: {
                    removeDuplicateMediaBlocks:true,
                    restructureRules: true
                }
            }
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function js(){
    return src('app/js/common.js')
        .pipe(concat('common.min.js'))
        .pipe(terser())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());

}
function scripts() {
    return src([
        'app/libs/swiper/swiper-bundle.min.js',
        'app/libs/fancybox/fancybox.umd.js',
        'app/libs/panzoom/panzoom.min.js'
    ])
        .pipe(concat('scripts.min.js'))
        // .pipe(terser()) //minimize js if needed
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}
//https://stackoverflow.com/questions/57979847/gulp4-migration-invalid-glob-argument
function html(){
    return src('app/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function watching () {
    watch('app/scss/**/*.scss',styles)
    watch(['app/js/common.js'],js)
    watch(['app/pages/*.html','app/blocks/*.html'], html)

}

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app"
        },
        notify: false,
    });
}
function imageMin() {
    return src('app/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(dest('dist/img'))

}

function cleanDist() {
    return src('dist/*')
        .pipe(clean())
}

function building(){
    return src([
        'app/css/main.min.css',
        'app/js/common.min.js',
        'app/js/scripts.min.js',
        "app/js/localization.ru.js",
        "app/js/tui-calendar.min.js",
        "app/js/flatpickr.min.js",
        'app/fonts/**/*',
        'app/*.html',

    ],{base:'app'})
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.js = js;
exports.html = html;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = series(cleanDist,parallel(imageMin,styles,js,scripts,html),building)
exports.default = parallel(styles,js,scripts,html,browsersync,watching)
