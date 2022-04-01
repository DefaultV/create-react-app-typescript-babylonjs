import { Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";
import React from "react";
import { FunctionComponent, useState } from "react";
import { useScene } from "react-babylonjs";

const Boxed: FunctionComponent = () => {
  const scene = useScene();

  const [points, setPoints] = useState([Vector3.Zero(), Vector3.One()]);

  const handleOnCreate = (mesh: Mesh) => {
    setInterval(() => {
      setPoints((prev) => [Vector3.Zero(), prev[1].scale(1.01)]);
    }, 100);
  };

  console.log(points[1]);

  return (
    <>
      <dashedLines
        name="line"
        points={points}
        dashSize={1}
        gapSize={1}
        dashNb={10}
        onCreated={handleOnCreate}
      ></dashedLines>
    </>
  );
};

export { Boxed };
