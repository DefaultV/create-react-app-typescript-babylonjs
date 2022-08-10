import React, { useState, useRef, Suspense } from "react";

import "@babylonjs/core/Physics/physicsEngineComponent"; // side-effect adds scene.enablePhysics function

import { CannonJSPlugin } from "@babylonjs/core/Physics/Plugins";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Nullable } from "@babylonjs/core/types";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { PhysicsImpostor } from "@babylonjs/core/Physics/physicsImpostor";

import { Scene, Engine, Model } from "react-babylonjs";
import "./App.css";

import * as CANNON from "cannon";
window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

const App: React.FC = () => {
  let sphereRef = useRef<Nullable<Mesh>>();

  const onButtonClicked = () => {
    if (sphereRef.current) {
      sphereRef.current.physicsImpostor!.applyImpulse(
        Vector3.Up().scale(10),
        sphereRef.current.getAbsolutePosition()
      );
    }
  };

  const [fontsReady, setFontsReady] = useState(false);
  const adtRef = useRef<AdvancedDynamicTexture | null>(null);
  const faLoaded = useRef(false);
  if (document.fonts.check("16px FontAwesome") === false) {
    document.fonts.load("16px FontAwesome").then(() => {
      if (faLoaded.current !== true && adtRef.current !== null) {
        faLoaded.current = true;

        setFontsReady(true);
        adtRef.current!.markAsDirty();
      }
    });
  } else if (faLoaded.current !== true) {
    faLoaded.current = true;
    setFontsReady(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>@babylonjs + `react-babylonjs`</p>
        <Engine
          antialias={true}
          adaptToDeviceRatio={true}
          canvasId="sample-canvas"
        >
          <Scene enablePhysics={[gravityVector, new CannonJSPlugin()]}>
            <arcRotateCamera
              name="arc"
              target={new Vector3(0, 1, 0)}
              alpha={-Math.PI / 2}
              beta={0.5 + Math.PI / 4}
              radius={4}
              minZ={0.001}
              wheelPrecision={50}
              lowerRadiusLimit={8}
              upperRadiusLimit={20}
              upperBetaLimit={Math.PI / 2}
            />
            <hemisphericLight
              name="hemi"
              direction={new Vector3(0, -1, 0)}
              intensity={0.8}
            />
            <directionalLight
              name="shadow-light"
              setDirectionToTarget={[Vector3.Zero()]}
              direction={Vector3.Zero()}
              position={new Vector3(-40, 30, -40)}
              intensity={0.4}
              shadowMinZ={1}
              shadowMaxZ={2500}
            ></directionalLight>

            <Suspense
              fallback={<transformNode name="fallback_node"></transformNode>}
            >
              <Model
                rootUrl={"https://defaultv.github.io/"}
                sceneFilename={"inverted_cube.glb"}
                name={"model"}
              ></Model>
            </Suspense>

            <ground
              name="ground1"
              width={10}
              height={10}
              subdivisions={2}
              receiveShadows={true}
            >
              <physicsImpostor
                type={PhysicsImpostor.BoxImpostor}
                _options={{ mass: 0, restitution: 0.9 }}
              />
            </ground>
            <vrExperienceHelper
              webVROptions={{ createDeviceOrientationCamera: false }}
              enableInteractions={true}
            />
          </Scene>
        </Engine>
      </header>
    </div>
  );
};
export default App;
