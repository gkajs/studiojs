function loadImage(images, callback, images_prefix){
    for (var i = 0, len = images.length, img, n = 0, sources=[]; i < len; i++) {
        ((index) => {
            var img = new Image();
            img.onload = () => {
                sources[index] = img;
                if(++n === len) {
                    callback && callback('complete', sources);
                }
            };
            img.src = images_prefix? (images_prefix + images[i]): images[i];
        })(i);
    }
};

export default loadImage