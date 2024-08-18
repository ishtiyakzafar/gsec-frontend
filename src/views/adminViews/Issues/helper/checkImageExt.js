export const checkImageExt = (ext) => {
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'jp2':
        case 'jpe':
        case 'jif':
        case 'jfif':
        case 'jfi':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'tif':
        case 'tiff':
        case 'bmp':
        case 'dib':
        case 'heif':
        case 'heic':
        case 'svg':
        case 'svgz':
        case 'j2k':
        case 'jpf':
        case 'jpx':
        case 'jpm':
        case 'mj2':
            break;
        default:
            alert('Logo File Type Not allowed');
            return;
    }
};