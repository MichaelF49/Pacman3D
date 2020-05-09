import { globals } from '../global';

const handleWindowResize = () => {
  const { innerHeight, innerWidth } = window;
  globals.camera.aspect = innerWidth / innerHeight;
  globals.camera.updateProjectionMatrix();
  globals.renderer.setSize(innerWidth, innerHeight);
};

export default handleWindowResize;
