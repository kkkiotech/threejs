import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CameraControls, Environment, Float, MeshReflectorMaterial, OrbitControls, RenderTexture, Text, useFont } from '@react-three/drei';
import { Camping } from './Camping';
import { degToRad } from 'three/src/math/MathUtils';

// Preload the font outside the component
useFont.preload('Roboto-Black.ttf');

const Experience = ({ enter }) => {
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCamera = useRef();
  const textRef = useRef();

  const fitCamera = async () => {
    if (enter) {
      controls.current.setPosition(0, 0, 8, true);
      controls.current.fitToBox(meshFitCamera.current, true);
      let p = controls.current.getPosition()
      controls.current.setPosition(p.x, p.y + 2, p.z, true);
      gsap.to(textRef.current, { opacity: 0, duration: 3 });
    } else {
      controls.current.setPosition(0, 0, 8, true);
      controls.current.fitToBox(meshFitCameraHome.current, true)
      gsap.to(textRef.current, { opacity: 1, duration: 3 });
    }
  };

  useEffect(() => {
    fitCamera();
  }, [enter, fitCamera]);

  useEffect(() => {
    window.addEventListener('resize', fitCamera);

    return () => {
      window.removeEventListener('resize', fitCamera);
    };
  }, [fitCamera]);

  useEffect(() => {
    intro();
  }, []);

  const intro = async () => {
    controls.current.dolly(-10);
    controls.current.smoothTime = 1;
    controls.current?.dolly(10, true);
  };


  return (
    <>
      <CameraControls enabled={true} ref={controls} />
      <Environment preset='sunset' />
      <mesh ref={meshFitCameraHome} visible={false}>
        <boxGeometry args={[12, 2, 2]}></boxGeometry>
        <meshBasicMaterial color={"orange"} transparent opacity={0.5}></meshBasicMaterial>
      </mesh>


      <Text rotation={[0, degToRad(30), 0]} anchorY={"bottom"} font='Roboto-Black.ttf' position={[-2, -0.5, 1]} lineHeight={1} textAlign='center'>
        MY LITTLE{"\n"}CAMPING
        <meshBasicMaterial side={2} color={"white"} ref={textRef}>
          <RenderTexture attach={"map"}>
            <color attach={"background"} args={["#fff"]} ></color>
            <Environment preset='sunset' />
            <Float floatIntensity={4} rotationIntensity={5}>
              <Camping castShadow={false} scale={1.6} ></Camping>
            </Float>
          </RenderTexture>
        </meshBasicMaterial>

      </Text>
      <group rotation={[0, degToRad(-25), 0]} position={[3, 0, 0]}>
        <Camping enter={enter} html scale={0.6} />
        <mesh ref={meshFitCamera} position={[0, 0.5, 0]} visible={false}>
          <boxGeometry args={[5, 2, 2]}></boxGeometry>
          <meshBasicMaterial color={"orange"} transparent opacity={0.5}></meshBasicMaterial>
        </mesh>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} >
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial

          resolution={1000}
          mixBlur={1}
          mixStrength={130}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.1}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </>
  )
}

export default Experience