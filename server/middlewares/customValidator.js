import path from 'path';

export default{
  customValidators: {
    isImage(imageName) {
      if (imageName) {
        const imageExtension = (path.extname(imageName)).toLowerCase();
        switch (imageExtension) {
          case '.jpg':
            return '.jpg';
          case '.jpeg':
            return '.jpeg';
          case '.png':
            return '.png';
          case '.gif':
            return '.png';
          default:
            return false;
        }
      }
      return false;
    },
  },
};
