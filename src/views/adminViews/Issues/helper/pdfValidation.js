export const pdfValidation = (ext, msg) => {
    switch (ext.toLowerCase()) {
        case 'pdf':
            break;
        default:
            alert(msg);
            return;
    }
};