import React, { useState, useRef, FunctionComponent } from 'react';

import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Scene, Engine } from 'react-babylonjs';
import './App.css';

import { PlaneShader } from './planeShader';

const App: FunctionComponent = () => {



  return (
    <div className="App">
      <header className="App-header">
        <p>@babylonjs + `react-babylonjs`</p>
        <Engine canvasId="sample-canvas">
          <Scene >
            <arcRotateCamera name="arc" target={ new Vector3(0, 1, 0) }
                  alpha={-Math.PI / 2} beta={(0.5 + (Math.PI / 4))}
                  radius={4} minZ={0.001} wheelPrecision={50} 
                  lowerRadiusLimit={8} upperRadiusLimit={20} upperBetaLimit={Math.PI / 2} />
            <hemisphericLight name='hemi' direction={new Vector3(0, -1, 0)} intensity={0.8} />
            <directionalLight name="shadow-light" setDirectionToTarget={[Vector3.Zero()]} direction={Vector3.Zero()} position = {new Vector3(-40, 30, -40)}
              intensity={0.4} shadowMinZ={1} shadowMaxZ={2500}>
              
            </directionalLight>
            <PlaneShader/>

          </Scene>
        </Engine>
      </header>
    </div>
  );
}
export default App;
