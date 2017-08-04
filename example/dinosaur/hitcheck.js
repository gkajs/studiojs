/* 描绘更大分辨率像素图的伪代码 */  
function checkHit( canvas, rect, target_canvas, target_rect, resolution ) {
    if (!rect || !target_rect) {
        return;
    };

    var _width = rect.width,
        _height = rect.height,
        _x = rect.x,
        _y = rect.y;

    var _target_width = target_rect.width,
        _target_height = target_rect.height,
        _target_x = target_rect.x,
        _target_y = target_rect.y;

    if (_width * _height < _target_width * _target_height) {
        width = rect.width;
        _height = rect.height;
        _x = _target_x;
        _y = _target_y;
    }

    var pixelMap = [];  

    for( var y = 0; y < rect.height; y=y+resolution ) {  
        for( var x = 0; x < rect.width; x=x+resolution ) {  
            // 获取当前位置的像素群  
            var pixel = canvas.ctx.getImageData( x + _x, y + _y, resolution, resolution );  
   
            // 判断像素群的透明度不为0  
            if( pixel.data[3] != 0 ) {
                // console.log( x + _x, y + _y)
                var target_pixel = target_canvas.ctx.getImageData( x + _x, y + _y, resolution, resolution ); 
                if (target_pixel.data[3] != 0 ) {
                    return true;
                }
            }  
        }  
    }  

}
