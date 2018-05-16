
# *nix is required (on windows use: bash on ubuntu for window)
TODO: better instructions on how to convert BMP to SVG.

# convert bmp to svg
./bmp-to-svg.sh input.bmp output.svg

# cleanup svg
svgo input.svg output.svg --enable=mergePaths --enable=collapseGroups --pretty
