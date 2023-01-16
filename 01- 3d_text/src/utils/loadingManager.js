import { LoadingManager } from 'three';

const manager = new LoadingManager(
  () => {
    console.log('Loading Complete!');
  },
  (url, loaded, total) => {
    console.log(`Loading file: ${url}
    Load ${loaded} out of ${total} files!`);
  },
  url => {
    console.log(`There was a problem uploading file: ${url}`);
  }
);
manager.onStart = (url, loaded, total) => {
  `Start loading file: ${url}
    Load ${loaded} out of ${total} files!`;
};

export default manager;
