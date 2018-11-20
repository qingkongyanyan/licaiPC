/**
 * Created by zhaoxiaoyang on 2016/10/13.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    rimraf = require('gulp-rimraf'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    stripDebug = require('gulp-strip-debug'),
    minifyHtml = require('gulp-minify-html'),
    sequence = require('gulp-sequence'),
    env = gutil.env.env || 'dev',
    fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    Buffer = require('buffer').Buffer,
    PluginError = gutil.PluginError,
    map = require('event-stream').map;

function appendHash(options) {
    options = Object.assign({
        algorithm: 'sha1',
        hashLength: 8,
        reg: /(href|src)\s*=\s*['"]?([^"'>\s]+)['"]?/gi
    }, options);
    return map(function(file, cb) {
        if (!file) {
            throw new PluginError('addHash', 'Missing file option for addHash.');
        }

        if (!file.contents) {
            throw new PluginError('addHash', 'Missing file.contents required for modifying files using addHash.');
        }

        var newContents, contents = file.contents.toString();
        newContents = contents.replace(options.reg, function(m, propName, splitter, urls) {
            try {
                urls = JSON.parse(urls);
            } catch (ex) {

            }
            if (Array.isArray(urls)) {
                urls = urls.map(getHashUrl.bind(urls, file.base, options));
            } else {
                urls = getHashUrl(file.base, options, urls);
            }
            return propName + splitter + JSON.stringify(urls);
        });

        file.contents = new Buffer(newContents);
        cb(null, file);
    });
}

function getHashUrl(base, options, url) {
    var hashHex,
        hash = crypto.createHash(options.algorithm),
        normPath = path.normalize(url.split('?')[0]),
        dependencyPath = path.join(base, normPath);
    try {
        hashHex = hash.update(fs.readFileSync(dependencyPath).toString(), 'utf8').digest('hex');
    } catch (ex) {

    }
    return hashHex ? normPath.split(path.sep).join('/') + '?' + (options.hashLength === null ? hashHex : hashHex.slice(0, options.hashLength)) : url;
}

gutil.log(`======= ENV : ${env} =======`);

gulp.task('clean', function() {
    return gulp.src('dist').pipe(rimraf());
});

gulp.task('minify', function() {
    return gulp.src(['app/**/*.js', 'app/**/*.css', 'app/**/*.{png,jpg,gif,ico}', 'app/**/*.{html,htm}', '!app/index.html'])
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS({ keepSpecialComments: 0 })))
        .pipe(gulpif('*.html', minifyHtml()))
        // .pipe(gulpif(/\.(gif|svg|png|jpg|jpeg|ico)$/, imagemin()))
        .pipe(gulp.dest('dist'));
});

gulp.task('indexUseRef', function() {
    return gulp.src('app/index.html')
        .pipe(useref({}))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS({ keepSpecialComments: 0 })))
        .pipe(gulpif('*.html', minifyHtml()))
        .pipe(gulp.dest('dist'));
});

gulp.task('appendHashDepFiles', function() {
    return gulp.src('app/app.js', {
            cwd: 'dist',
            base: 'dist'
        })
        .pipe(appendHash({
            reg: /(files)\s*(:)\s*(\[\s*['"][^"']+['"](?:\s*,\s*['"][^"']+['"])*,?\s*\])/gi
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('appendHashTmplUrls', function() {
    return gulp.src('app/app.js', {
            cwd: 'dist',
            base: 'dist'
        })
        .pipe(appendHash({
            reg: /(templateUrl)\s*(:)\s*['"]([^"']+)['"]/gi
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('appendHashIndex', function() {
    return gulp.src('dist/index.html')
        .pipe(appendHash({
            reg: /(href|src)\s*(=)\s*['"]?([^"'>\s]+)['"]?/gi
        }))
        .pipe(gulp.dest('dist'));
});

var jshint = require('gulp-jshint');

gulp.task('lint', function() {
    return gulp.src(['./app/**/*.js', '!**/jquery.qrcode.min.js', '!**/mobiscroll.custom-3.0.0-beta5.min.js', '!**/TouchSlide.1.1.js'])
        .pipe(jshint())
        // .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('gulp-jshint-html-reporter', {
            filename: __dirname + '/jshint-output.html',
            createMissingFolders: false
        }))
        // .pipe(jshint.reporter('fail'));
});

gulp.task('build', sequence(['clean'], ['indexUseRef'], ['minify'], ['appendHashDepFiles'], ['appendHashTmplUrls'], ['appendHashIndex']));
gulp.task('default', ['build']);
