var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var strip = require('gulp-strip-debug');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');

var devMode = process.env.NODE_ENV== 'development';

var folder = {
    src:'src/',
    dist:'dist/'
}

gulp.task('html',function(){
    var page = gulp.src(folder.src + 'html/*')        
    if(!devMode){
        page = page.pipe(htmlclean())
    }        
        page.pipe(gulp.dest(folder.dist + 'html/')).pipe(connect.reload())
})

gulp.task('img',function(){
    gulp.src(folder.src + 'img/*')        
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + 'img/')).pipe(connect.reload())
})

gulp.task('js',function(){
    var page = gulp.src(folder.src + 'js/*')
        if(!devMode){
            page = page.pipe(strip())
                .pipe(concat('index.js'))
                .pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + 'js/')).pipe(connect.reload())
})

gulp.task('css',function(){
    var options = [autoprefixer(),cssnano()];
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less())
    if(!devMode){        
        page = page.pipe(postcss(options))  
    }      
    page.pipe(gulp.dest(folder.dist + 'css/')).pipe(connect.reload())
})

gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*',['html']);
    gulp.watch(folder.src + 'css/*',['css']);
    gulp.watch(folder.src + 'js/*',['js']);
    gulp.watch(folder.src + 'img/*',['img']);
})

gulp.task('server',function(){
    connect.server({
        port:'8090',
        livereload:true
    });
})

gulp.task('default',['img','html','css','js','watch','server']);