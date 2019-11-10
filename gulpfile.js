"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

// BrowserSync reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean vendor
function clean() {
    return del(["./vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {

    // Bootstrap
    let knockout = gulp.src('./node_modules/knockout/build/output/**/*')
        .pipe(gulp.dest('./vendor/knockout'));

    let codemirror = gulp.src('./node_modules/codemirror/lib/**/*')
        .pipe(gulp.dest('./vendor/codemirror'));

    let codemirrorModes = gulp.src('./node_modules/codemirror/mode/**/*')
        .pipe(gulp.dest('./vendor/codemirror/mode/'));
    // Bootstrap
    let bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
        .pipe(gulp.dest('./vendor/bootstrap'));
    // jQuery
    let jquery = gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest('./vendor/jquery'));
    return merge(bootstrap, jquery, knockout, codemirror, codemirrorModes);
}

// Watch files
function watchFiles() {
    gulp.watch("./vendor/**/*.css", browserSyncReload);
    gulp.watch("./vendor/**/*.html", browserSyncReload);
    gulp.watch("./vendor/**/*.js", browserSyncReload);
    gulp.watch("./main.js", browserSyncReload);
    gulp.watch("./peterson.js", browserSyncReload);
    gulp.watch("./worker.js", browserSyncReload);
    gulp.watch("./index.html", browserSyncReload);

}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
