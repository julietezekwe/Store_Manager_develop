import path from 'path';

export default{
  customValidators: {
    isImage(imageName) {
      const imageExtension = (path.extname(imageName)).toLowerCase();
      switch (imageExtension) {
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case '.png':
          return '.png';
        default:
          return false;
      }
    },
  },
};
