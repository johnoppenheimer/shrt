var gulp = require("gulp");
var path = require("path");
var pump = require("pump");
var del = require("del");
var babel = require("gulp-babel");
var eslint = require("gulp-eslint");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("clean", () => {
    return del([
        "dist/*"
    ], { dot: true });
});

gulp.task("build", ["clean"], (cb) => {
    pump([
        gulp.src(["src/**/*.js"]),
        sourcemaps.init(),
        babel(),
        sourcemaps.write({
            includeContent: false,
            sourceRoot: function (file) {
                return path.relative(file.relative, path.join(file.cwd, "src"));
            }
        }),
        gulp.dest("dist")
    ],
        cb
    );
});

gulp.task("lint", () => {
    return gulp.src(["src/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("default", ["build"]);